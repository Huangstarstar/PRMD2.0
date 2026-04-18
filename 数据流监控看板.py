# data_monitor.py
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import pandas as pd
from datetime import datetime, timedelta
import numpy as np

class DatabaseMonitor:
    def __init__(self, db_connection):
        self.conn = db_connection

    def create_dashboard(self):
        """创建综合监控仪表盘"""
        # 获取数据
        species_data = self.get_species_stats()
        timeline_data = self.get_timeline_stats()
        quality_data = self.get_quality_metrics()

        # 创建2x2子图
        fig = make_subplots(
            rows=2, cols=2,
            subplot_titles=('物种数据分布', '数据收集时间线',
                           '数据质量监控', '配对成功率'),
            specs=[[{'type': 'bar'}, {'type': 'scatter'}],
                   [{'type': 'heatmap'}, {'type': 'pie'}]],
            vertical_spacing=0.15,
            horizontal_spacing=0.15
        )

        # 1. 物种数据分布（柱状图）
        fig.add_trace(
            go.Bar(
                x=species_data['species'],
                y=species_data['sample_count'],
                name='样本数',
                marker_color='#2E7D32',
                text=species_data['sample_count'],
                textposition='auto'
            ),
            row=1, col=1
        )

        # 2. 数据收集时间线（折线图）
        fig.add_trace(
            go.Scatter(
                x=timeline_data['date'],
                y=timeline_data['cumulative_samples'],
                mode='lines+markers',
                name='累计样本数',
                line=dict(color='#FFA726', width=3),
                marker=dict(size=8)
            ),
            row=1, col=2
        )

        # 3. 数据质量监控（热图）
        quality_matrix = self.create_quality_matrix()
        fig.add_trace(
            go.Heatmap(
                z=quality_matrix['values'],
                x=quality_matrix['metrics'],
                y=quality_matrix['species'],
                colorscale='Greens',
                showscale=True,
                colorbar=dict(title="质量分数")
            ),
            row=2, col=1
        )

        # 4. 配对成功率（饼图）
        pairing_data = self.get_pairing_stats()
        fig.add_trace(
            go.Pie(
                labels=pairing_data['status'],
                values=pairing_data['count'],
                hole=0.4,
                marker_colors=['#4CAF50', '#FFC107', '#F44336']
            ),
            row=2, col=2
        )

        # 更新布局
        fig.update_layout(
            title_text="植物RNA修饰数据库监控仪表盘",
            title_x=0.5,
            showlegend=True,
            height=800,
            template="plotly_white"
        )

        # 更新坐标轴标签
        fig.update_xaxes(title_text="物种", row=1, col=1)
        fig.update_yaxes(title_text="样本数量", row=1, col=1)

        fig.update_xaxes(title_text="日期", row=1, col=2)
        fig.update_yaxes(title_text="累计样本数", row=1, col=2)

        fig.update_xaxes(title_text="质量指标", row=2, col=1)
        fig.update_yaxes(title_text="物种", row=2, col=1)

        return fig

    def create_quality_matrix(self):
        """创建质量指标矩阵"""
        query = """
        SELECT
            m.species,
            AVG(CASE WHEN q.overall_quality > 0.8 THEN 1 ELSE 0 END) as high_quality,
            AVG(CASE WHEN q.mapping_rate > 0.85 THEN 1 ELSE 0 END) as mapping_rate,
            AVG(CASE WHEN q.duplication_rate < 0.2 THEN 1 ELSE 0 END) as duplication_rate,
            AVG(CASE WHEN q.insert_size_mean BETWEEN 150 AND 300 THEN 1 ELSE 0 END) as insert_size
        FROM plant_rna_modifications m
        LEFT JOIN quality_metrics q ON m.sra_id = q.sra_id
        GROUP BY m.species
        ORDER BY high_quality DESC
        """

        df = pd.read_sql(query, self.conn)

        return {
            'species': df['species'].tolist(),
            'metrics': ['高质量样本', '比对率', '重复率', '插入片段'],
            'values': df[['high_quality', 'mapping_rate',
                         'duplication_rate', 'insert_size']].values.tolist()
        }

    def generate_html_report(self):
        """生成HTML监控报告"""
        fig = self.create_dashboard()

        html_template = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>数据库监控报告</title>
            <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
            <style>
                body {{ font-family: Arial, sans-serif; margin: 20px; }}
                .header {{ text-align: center; margin-bottom: 30px; }}
                .summary {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }}
                .summary-card {{ background: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center; }}
                .chart-container {{ margin-bottom: 30px; }}
                .footer {{ text-align: center; margin-top: 30px; color: #666; }}
            </style>
        </head>
        <body>
            <div class="header">
                <h1>植物RNA修饰数据库监控报告</h1>
                <p>生成时间: {timestamp}</p>
            </div>

            <div class="summary">
                <div class="summary-card">
                    <h3>总样本数</h3>
                    <p style="font-size: 24px; color: #2E7D32;">{total_samples}</p>
                </div>
                <div class="summary-card">
                    <h3>配对实验</h3>
                    <p style="font-size: 24px; color: #FFA726;">{paired_experiments}</p>
                </div>
                <div class="summary-card">
                    <h3>物种数量</h3>
                    <p style="font-size: 24px; color: #4CAF50;">{species_count}</p>
                </div>
                <div class="summary-card">
                    <h3>数据质量</h3>
                    <p style="font-size: 24px; color: #2196F3;">{quality_score}%</p>
                </div>
            </div>

            <div class="chart-container">
                {plot_html}
            </div>

            <div class="footer">
                <p>报告自动生成于 {timestamp} | 数据库版本 v2.1</p>
            </div>
        </body>
        </html>
        """

        # 获取摘要数据
        summary = self.get_summary_stats()

        # 生成Plotly图表HTML
        plot_html = fig.to_html(full_html=False, include_plotlyjs=False)

        # 填充模板
        html_content = html_template.format(
            timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            total_samples=summary['total_samples'],
            paired_experiments=summary['paired_experiments'],
            species_count=summary['species_count'],
            quality_score=summary['quality_score'],
            plot_html=plot_html
        )

        # 保存HTML文件
        filename = f"database_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.html"
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(html_content)

        return filename
