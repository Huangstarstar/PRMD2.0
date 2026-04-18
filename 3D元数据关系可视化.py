# 3d_metadata_visualization.py
import plotly.graph_objects as go
import networkx as nx
import numpy as np

class Metadata3DVisualization:
    def __init__(self, db_connection):
        self.conn = db_connection

    def create_3d_network(self):
        """创建3D网络图展示元数据关系"""
        # 获取数据
        query = """
        SELECT
            m.sra_id, m.species, m.tissue, m.treatment,
            p.experiment_id, p.pairing_confidence,
            COUNT(pk.peak_id) as peak_count
        FROM plant_rna_modifications m
        LEFT JOIN merip_pairing p ON m.sra_id = p.ip_sra_id OR m.sra_id = p.input_sra_id
        LEFT JOIN peaks pk ON m.sra_id = pk.sra_id
        GROUP BY m.sra_id
        """

        df = pd.read_sql(query, self.conn)

        # 创建3D图
        fig = go.Figure()

        # 为每个物种分配颜色
        species_colors = {
            '拟南芥': '#2E7D32',
            '水稻': '#FFA726',
            '玉米': '#4CAF50',
            '小麦': '#2196F3',
            '番茄': '#F44336'
        }

        # 创建3D散点图
        for species in df['species'].unique():
            species_data = df[df['species'] == species]

            # 使用t-SNE或PCA降维到3D（这里简化处理）
            x = np.random.randn(len(species_data)) * 10
            y = np.random.randn(len(species_data)) * 10
            z = np.random.randn(len(species_data)) * 10

            fig.add_trace(go.Scatter3d(
                x=x, y=y, z=z,
                mode='markers',
                name=species,
                marker=dict(
                    size=species_data['peak_count'] / 100,  # 根据peaks数量调整大小
                    color=species_colors.get(species, '#95a5a6'),
                    opacity=0.7,
                    line=dict(width=1, color='white')
                ),
                text=species_data.apply(lambda row:
                    f"SRA: {row['sra_id']}<br>"
                    f"组织: {row['tissue']}<br>"
                    f"处理: {row['treatment']}<br>"
                    f"Peaks: {row['peak_count']}<br>"
                    f"配对置信度: {row['pairing_confidence']:.2f}", axis=1),
                hoverinfo='text'
            ))

        # 更新布局
        fig.update_layout(
            title="植物RNA修饰元数据3D关系图",
            scene=dict(
                xaxis_title='维度1',
                yaxis_title='维度2',
                zaxis_title='维度3',
                camera=dict(
                    eye=dict(x=1.5, y=1.5, z=1.5)
                )
            ),
            height=800,
            showlegend=True
        )

        return fig
