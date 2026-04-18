<?php
declare(strict_types=1);

// analyze_sequence.php - Enhanced Gene Editor Backend Processing

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 生产环境建议关闭 display_errors
error_reporting(E_ALL);
ini_set('display_errors', '0');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

class GeneEditorAnalyzer
{
    private array $cas_proteins = [
        'cas9' => [
            'name' => 'SpCas9',
            'pam' => 'NGG',
            'grna_length' => 20,
            'description' => 'Streptococcus pyogenes Cas9'
        ],
        'cas12a' => [
            'name' => 'Cas12a (Cpf1)',
            'pam' => 'TTTV',
            'grna_length' => 20,
            'description' => 'Prevotella/Francisella Cas12a'
        ],
        'cas13' => [
            'name' => 'Cas13',
            'pam' => '',
            'grna_length' => 22,
            'description' => 'RNA-targeting Cas13 (current backend uses DNA-only demo mode)'
        ],
        'base_editor' => [
            'name' => 'Base Editor',
            'pam' => 'NGG',
            'grna_length' => 20,
            'description' => 'CBE/ABE Base Editor'
        ],
        'prime_editor' => [
            'name' => 'Prime Editor',
            'pam' => 'NGG',
            'grna_length' => 20,
            'description' => 'Prime Editor'
        ]
    ];

    private array $reference_genomes = [
        'arabidopsis_thaliana' => [
            'name' => 'Arabidopsis thaliana',
            'version' => 'TAIR10',
            'size' => '135 Mb',
            'gc_content' => 36.5
        ],
        'oryza_sativa' => [
            'name' => 'Oryza sativa',
            'version' => 'MSU7',
            'size' => '430 Mb',
            'gc_content' => 43.6
        ],
        'zea_mays' => [
            'name' => 'Zea mays',
            'version' => 'Zm-B73-REFERENCE-GRAMENE-4.0',
            'size' => '2.3 Gb',
            'gc_content' => 46.8
        ],
        'glycine_max' => [
            'name' => 'Glycine max',
            'version' => 'Wm82.a2.v1',
            'size' => '1.1 Gb',
            'gc_content' => 35.2
        ],
        'solanum_tuberosum' => [
            'name' => 'Solanum tuberosum',
            'version' => 'ITAG3.2',
            'size' => '844 Mb',
            'gc_content' => 38.4
        ],
        'vitis_vinifera' => [
            'name' => 'Vitis vinifera',
            'version' => 'PN40024',
            'size' => '487 Mb',
            'gc_content' => 34.8
        ]
    ];

    private string $reference_genome;
    private string $target_sequence;
    private string $cas_protein;
    private string $pam_sequence;
    private int $preferred_gc_content;
    private string $off_target_tolerance;
    private int $max_results;

    public function __construct(array $data)
    {
        $this->validateInput($data);

        $this->reference_genome = trim((string)$data['referenceGenome']);
        $this->target_sequence = $this->normalizeSequence((string)$data['targetSequence']);
        $this->cas_protein = trim((string)$data['casProtein']);
        $this->pam_sequence = isset($data['pamSequence']) ? strtoupper(trim((string)$data['pamSequence'])) : '';
        $this->preferred_gc_content = isset($data['gcContent']) ? (int)$data['gcContent'] : 40;
        $this->off_target_tolerance = isset($data['offTargetTolerance']) ? trim((string)$data['offTargetTolerance']) : 'moderate';
        $this->max_results = isset($data['maxResults']) ? (int)$data['maxResults'] : 10;

        $this->preferred_gc_content = max(20, min(80, $this->preferred_gc_content));
        $this->max_results = max(1, min(100, $this->max_results));
    }

    private function validateInput(array $data): void
    {
        $required = ['referenceGenome', 'targetSequence', 'casProtein'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || trim((string)$data[$field]) === '') {
                throw new Exception("Missing required field: {$field}");
            }
        }

        $referenceGenome = trim((string)$data['referenceGenome']);
        if (!array_key_exists($referenceGenome, $this->reference_genomes)) {
            throw new Exception("Invalid reference genome selected.");
        }

        $casProtein = trim((string)$data['casProtein']);
        if (!array_key_exists($casProtein, $this->cas_proteins)) {
            throw new Exception("Invalid Cas protein selected.");
        }

        $sequence = $this->normalizeSequence((string)$data['targetSequence']);
        if ($sequence === '') {
            throw new Exception("Target sequence is empty after normalization.");
        }

        if (!preg_match('/^[ATGC]+$/', $sequence)) {
            throw new Exception("Invalid DNA sequence. Only A, T, G, C are allowed.");
        }

        $length = strlen($sequence);
        if ($length < 20 || $length > 200) {
            throw new Exception("Sequence length must be between 20 and 200 bp.");
        }

        if ($casProtein === 'cas13') {
            throw new Exception("Cas13 is typically RNA-targeting, but the current backend accepts DNA sequences only. Please choose another Cas system or extend backend logic for RNA input.");
        }

        if (isset($data['pamSequence']) && trim((string)$data['pamSequence']) !== '') {
            $pam = strtoupper(trim((string)$data['pamSequence']));
            if (!preg_match('/^[ATGCNVHDBKMSWYR]+$/', $pam)) {
                throw new Exception("Invalid PAM sequence. Allowed symbols: A, T, G, C, N, V, H, D, B, K, M, S, W, Y, R.");
            }
            if (strlen($pam) < 2 || strlen($pam) > 12) {
                throw new Exception("PAM sequence length must be between 2 and 12.");
            }
        }

        if (isset($data['gcContent'])) {
            $gc = (int)$data['gcContent'];
            if ($gc < 20 || $gc > 80) {
                throw new Exception("Preferred GC content must be between 20 and 80.");
            }
        }

        if (isset($data['offTargetTolerance'])) {
            $allowed = ['strict', 'moderate', 'relaxed'];
            if (!in_array($data['offTargetTolerance'], $allowed, true)) {
                throw new Exception("Invalid off-target tolerance. Allowed values: strict, moderate, relaxed.");
            }
        }

        if (isset($data['maxResults'])) {
            $maxResults = (int)$data['maxResults'];
            if ($maxResults < 1 || $maxResults > 100) {
                throw new Exception("maxResults must be between 1 and 100.");
            }
        }
    }

    private function normalizeSequence(string $sequence): string
    {
        $sequence = strtoupper(trim($sequence));
        return preg_replace('/[^ATGC]/', '', $sequence) ?? '';
    }

    public function analyze(): array
    {
        $results = [
            'summary' => '',
            'grnas' => [],
            'statistics' => [],
            'best_grna' => null,
            'reference_genome_info' => $this->reference_genomes[$this->reference_genome] ?? null,
            'cas_info' => $this->cas_proteins[$this->cas_protein] ?? null,
            'input' => [
                'referenceGenome' => $this->reference_genome,
                'casProtein' => $this->cas_protein,
                'pamSequence' => $this->getPAMSequence(),
                'sequenceLength' => strlen($this->target_sequence),
                'preferredGcContent' => $this->preferred_gc_content,
                'offTargetTolerance' => $this->off_target_tolerance,
                'maxResults' => $this->max_results
            ]
        ];

        try {
            $pam = $this->getPAMSequence();
            $potential_sites = $this->findPAMSites($pam);

            if (empty($potential_sites)) {
                throw new Exception("No valid PAM sites found in the target sequence.");
            }

            $grnas = $this->designGRNAs($potential_sites);

            if (empty($grnas)) {
                throw new Exception("PAM sites were found, but no valid gRNAs passed quality filters.");
            }

            $scored_grnas = $this->scoreGRNAs($grnas);
            $grnas_with_offtargets = $this->predictOffTargets($scored_grnas);

            usort($grnas_with_offtargets, function ($a, $b) {
                $scoreCompare = ($b['score'] <=> $a['score']);
                if ($scoreCompare !== 0) {
                    return $scoreCompare;
                }

                $specificityCompare = ($b['specificity'] <=> $a['specificity']);
                if ($specificityCompare !== 0) {
                    return $specificityCompare;
                }

                return $a['offtarget_count'] <=> $b['offtarget_count'];
            });

            $grnas_with_offtargets = array_slice($grnas_with_offtargets, 0, $this->max_results);

            $results['grnas'] = $grnas_with_offtargets;
            $results['best_grna'] = $grnas_with_offtargets[0] ?? null;
            $results['statistics'] = $this->calculateStatistics($grnas_with_offtargets);
            $results['summary'] = $this->generateSummary($grnas_with_offtargets);

            return [
                'success' => true,
                'data' => $results
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    private function getPAMSequence(): string
    {
        if ($this->pam_sequence !== '') {
            return $this->pam_sequence;
        }

        $casInfo = $this->cas_proteins[$this->cas_protein] ?? null;
        if (!$casInfo) {
            throw new Exception("Invalid Cas protein selected.");
        }

        return (string)$casInfo['pam'];
    }

    private function convertPAMToRegex(string $pam): string
    {
        $mapping = [
            'A' => 'A',
            'T' => 'T',
            'G' => 'G',
            'C' => 'C',
            'N' => '[ATGC]',
            'V' => '[ACG]',
            'H' => '[ACT]',
            'D' => '[AGT]',
            'B' => '[CGT]',
            'K' => '[GT]',
            'M' => '[AC]',
            'S' => '[GC]',
            'W' => '[AT]',
            'Y' => '[CT]',
            'R' => '[AG]'
        ];

        $pam = strtoupper($pam);
        $regex = '';

        for ($i = 0, $len = strlen($pam); $i < $len; $i++) {
            $char = $pam[$i];
            if (!isset($mapping[$char])) {
                throw new Exception("Unsupported PAM symbol encountered: {$char}");
            }
            $regex .= $mapping[$char];
        }

        return $regex;
    }

    private function findPAMSites(string $pam): array
    {
        $sequence = $this->target_sequence;
        $sites = [];
        $pamRegex = $this->convertPAMToRegex($pam);
        $grnaLength = (int)$this->cas_proteins[$this->cas_protein]['grna_length'];
        $pamLength = strlen($pam);

        if ($pamRegex === '') {
            throw new Exception("No PAM regex available for the selected Cas protein.");
        }

        if (preg_match_all('/(?=(' . $pamRegex . '))/', $sequence, $matches, PREG_OFFSET_CAPTURE)) {
            foreach ($matches[1] as $match) {
                $pamSequence = $match[0];
                $pamPosition = $match[1];

                $grnaStart = $pamPosition - $grnaLength;
                $grnaEnd = $pamPosition - 1;

                if ($grnaStart < 0) {
                    continue;
                }

                $grnaSequence = substr($sequence, $grnaStart, $grnaLength);
                if ($grnaSequence === false || strlen($grnaSequence) !== $grnaLength) {
                    continue;
                }

                $sites[] = [
                    'position' => $pamPosition,
                    'pam_sequence' => $pamSequence,
                    'pam_end' => $pamPosition + $pamLength - 1,
                    'grna_start' => $grnaStart,
                    'grna_sequence' => $grnaSequence,
                    'grna_end' => $grnaEnd
                ];
            }
        }

        return $sites;
    }

    private function designGRNAs(array $sites): array
    {
        $grnas = [];
        $grnaId = 1;

        foreach ($sites as $site) {
            $sequence = $site['grna_sequence'];

            if (!$this->isValidGRNA($sequence)) {
                continue;
            }

            $grnas[] = [
                'id' => 'gRNA_' . $grnaId++,
                'sequence' => $sequence,
                'position' => ($site['grna_start'] + 1) . '-' . ($site['grna_end'] + 1),
                'pam_position' => $site['position'] + 1,
                'pam_sequence' => $site['pam_sequence'],
                'gc_content' => round($this->calculateGCContent($sequence), 1),
                'start' => $site['grna_start'],
                'end' => $site['grna_end'],
                'strand' => '+',
                'warnings' => $this->collectWarnings($sequence)
            ];
        }

        return $grnas;
    }

    private function isValidGRNA(string $sequence): bool
    {
        $length = strlen($sequence);
        if ($length < 18 || $length > 25) {
            return false;
        }

        if (!preg_match('/^[ATGC]+$/', $sequence)) {
            return false;
        }

        $gc = $this->calculateGCContent($sequence);
        if ($gc < 20 || $gc > 80) {
            return false;
        }

        if (strpos($sequence, 'TTTT') !== false) {
            return false;
        }

        return true;
    }

    private function collectWarnings(string $sequence): array
    {
        $warnings = [];

        if (strpos($sequence, 'TTTT') !== false) {
            $warnings[] = 'Contains poly-T motif';
        }

        if (preg_match('/(.)\1{3,}/', $sequence)) {
            $warnings[] = 'Contains homopolymer stretch';
        }

        if ($this->cas_protein === 'cas9' && $sequence[0] !== 'G') {
            $warnings[] = "5' base is not G";
        }

        if ($this->hasSecondaryStructure($sequence)) {
            $warnings[] = 'Potential secondary structure';
        }

        return $warnings;
    }

    private function calculateGCContent(string $sequence): float
    {
        $length = strlen($sequence);
        if ($length === 0) {
            return 0.0;
        }

        $gcCount = substr_count($sequence, 'G') + substr_count($sequence, 'C');
        return ($gcCount / $length) * 100;
    }

    private function scoreGRNAs(array $grnas): array
    {
        foreach ($grnas as &$grna) {
            $score = 60.0;
            $sequence = $grna['sequence'];
            $gc = (float)$grna['gc_content'];

            // 1. GC 偏好评分
            $distanceFromPreferred = abs($gc - $this->preferred_gc_content);
            if ($distanceFromPreferred <= 5) {
                $score += 18;
            } elseif ($distanceFromPreferred <= 10) {
                $score += 12;
            } elseif ($distanceFromPreferred <= 20) {
                $score += 6;
            } else {
                $score -= 8;
            }

            // 2. 通用较优区间奖励
            if ($gc >= 40 && $gc <= 60) {
                $score += 8;
            } elseif ($gc < 25 || $gc > 75) {
                $score -= 8;
            }

            // 3. 避免长同聚碱基
            if (preg_match('/(.)\1{3,}/', $sequence)) {
                $score -= 12;
            }

            // 4. Cas9 的 5' G 小奖励
            if ($this->cas_protein === 'cas9' && $sequence[0] === 'G') {
                $score += 4;
            }

            // 5. Cas12a 起始偏好
            if ($this->cas_protein === 'cas12a' && substr($sequence, 0, 2) === 'TT') {
                $score += 4;
            }

            // 6. 二级结构惩罚
            if ($this->hasSecondaryStructure($sequence)) {
                $score -= 10;
            }

            // 7. 唯一性评分
            $score += $this->calculateUniqueness($sequence);

            // 8. 末端复杂度
            $score += $this->calculateTerminalComplexityBonus($sequence);

            $grna['score'] = round(max(0, min(100, $score)), 1);
        }

        unset($grna);
        return $grnas;
    }

    private function calculateTerminalComplexityBonus(string $sequence): float
    {
        $left = substr($sequence, 0, 4);
        $right = substr($sequence, -4);

        $leftUnique = count(array_unique(str_split($left)));
        $rightUnique = count(array_unique(str_split($right)));

        $bonus = 0.0;
        $bonus += ($leftUnique >= 3) ? 2.0 : 0.0;
        $bonus += ($rightUnique >= 3) ? 2.0 : 0.0;

        return $bonus;
    }

    private function hasSecondaryStructure(string $sequence): bool
    {
        $length = strlen($sequence);

        for ($i = 0; $i < $length - 5; $i++) {
            $sub = substr($sequence, $i, 6);
            $revComp = $this->reverseComplement($sub);
            $pos = strpos($sequence, $revComp);

            if ($pos !== false && $pos !== $i) {
                return true;
            }
        }

        return false;
    }

    private function reverseComplement(string $sequence): string
    {
        $complement = [
            'A' => 'T',
            'T' => 'A',
            'C' => 'G',
            'G' => 'C'
        ];

        $revComp = '';
        for ($i = strlen($sequence) - 1; $i >= 0; $i--) {
            $base = $sequence[$i];
            $revComp .= $complement[$base] ?? $base;
        }

        return $revComp;
    }

    private function calculateUniqueness(string $sequence): float
    {
        $length = strlen($sequence);
        if ($length === 0) {
            return 0.0;
        }

        $score = 0.0;
        $counts = count_chars($sequence, 1);

        foreach (str_split($sequence) as $base) {
            $ord = ord($base);
            $count = $counts[$ord] ?? 0;
            if ($count === 1) {
                $score += 0.8;
            } elseif ($count === 2) {
                $score += 0.3;
            }
        }

        return min(12.0, round($score, 1));
    }

    private function predictOffTargets(array $grnas): array
    {
        $maxMismatches = $this->getMaxMismatches();

        foreach ($grnas as &$grna) {
            $offtargets = $this->simulateOffTargets($grna['sequence'], $maxMismatches);

            usort($offtargets, function ($a, $b) {
                return $b['score'] <=> $a['score'];
            });

            $grna['offtargets'] = $offtargets;
            $grna['offtarget_count'] = count($offtargets);
            $grna['specificity'] = $this->calculateSpecificity($offtargets);

            if ($grna['offtarget_count'] >= 8) {
                $grna['score'] = max(0, round($grna['score'] - 18, 1));
            } elseif ($grna['offtarget_count'] >= 5) {
                $grna['score'] = max(0, round($grna['score'] - 10, 1));
            } elseif ($grna['offtarget_count'] >= 3) {
                $grna['score'] = max(0, round($grna['score'] - 4, 1));
            }
        }

        unset($grna);
        return $grnas;
    }

    private function getMaxMismatches(): int
    {
        return match ($this->off_target_tolerance) {
            'strict' => 1,
            'moderate' => 3,
            'relaxed' => 5,
            default => 3
        };
    }

    private function simulateOffTargets(string $grnaSequence, int $maxMismatches): array
    {
        $offtargets = [];
        $grnaLength = strlen($grnaSequence);

        $numOfftargets = match ($this->off_target_tolerance) {
            'strict' => random_int(0, 3),
            'moderate' => random_int(1, 6),
            'relaxed' => random_int(3, 10),
            default => random_int(1, 6)
        };

        for ($i = 0; $i < $numOfftargets; $i++) {
            $mismatches = random_int(0, max(0, $maxMismatches));

            $mismatchPositions = [];
            if ($mismatches > 0) {
                $allPositions = range(0, $grnaLength - 1);
                shuffle($allPositions);
                $mismatchPositions = array_slice($allPositions, 0, $mismatches);
                sort($mismatchPositions);
            }

            $score = $this->calculateOffTargetScore($mismatches, $mismatchPositions);

            $offtargets[] = [
                'chromosome' => 'Chr' . random_int(1, 10),
                'position' => random_int(100000, 50000000),
                'mismatches' => $mismatches,
                'mismatch_positions' => $mismatchPositions,
                'score' => $score,
                'sequence' => $this->generateMutatedSequence($grnaSequence, $mismatchPositions)
            ];
        }

        return $offtargets;
    }

    private function calculateOffTargetScore(int $mismatches, array $mismatchPositions): float
    {
        $baseScore = 100.0;
        $penalty = $mismatches * 18.0;
        $pamNearPenalty = 0.0;

        foreach ($mismatchPositions as $pos) {
            if ($pos >= 16) {
                $pamNearPenalty += 6.0;
            }
        }

        return round(max(0, $baseScore - $penalty - $pamNearPenalty), 1);
    }

    private function generateMutatedSequence(string $original, array $mismatchPositions): string
    {
        $mutated = str_split($original);
        $bases = ['A', 'T', 'G', 'C'];

        foreach ($mismatchPositions as $pos) {
            if (!isset($mutated[$pos])) {
                continue;
            }

            $originalBase = $mutated[$pos];
            do {
                $newBase = $bases[array_rand($bases)];
            } while ($newBase === $originalBase);

            $mutated[$pos] = $newBase;
        }

        return implode('', $mutated);
    }

    private function calculateSpecificity(array $offtargets): float
    {
        if (empty($offtargets)) {
            return 100.0;
        }

        $risk = 0.0;
        foreach ($offtargets as $offtarget) {
            $risk += (100 - (float)$offtarget['score']);
        }

        $avgRisk = $risk / count($offtargets);
        $specificity = 100 - $avgRisk;

        return round(max(0, min(100, $specificity)), 1);
    }

    private function calculateStatistics(array $grnas): array
    {
        if (empty($grnas)) {
            return [];
        }

        $scores = array_column($grnas, 'score');
        $gcContents = array_column($grnas, 'gc_content');
        $offtargetCounts = array_column($grnas, 'offtarget_count');
        $specificities = array_column($grnas, 'specificity');

        return [
            'total_guides' => count($grnas),
            'average_score' => round(array_sum($scores) / count($scores), 1),
            'max_score' => max($scores),
            'min_score' => min($scores),
            'average_gc' => round(array_sum($gcContents) / count($gcContents), 1),
            'average_offtargets' => round(array_sum($offtargetCounts) / count($offtargetCounts), 1),
            'average_specificity' => round(array_sum($specificities) / count($specificities), 1),
            'high_quality_guides' => count(array_filter($grnas, function ($g) {
                return $g['score'] >= 80 && $g['offtarget_count'] <= 3;
            }))
        ];
    }

    private function generateSummary(array $grnas): string
    {
        $stats = $this->calculateStatistics($grnas);
        $best = $grnas[0] ?? null;
        $pam = $this->getPAMSequence();
        $casName = $this->cas_proteins[$this->cas_protein]['name'] ?? $this->cas_protein;

        $summary = "Analysis complete. Found {$stats['total_guides']} candidate guide RNAs.\n";
        $summary .= "Cas system: {$casName}\n";
        $summary .= "PAM used: {$pam}\n";
        $summary .= "Target sequence length: " . strlen($this->target_sequence) . " bp\n";
        $summary .= "Average score: {$stats['average_score']}/100\n";
        $summary .= "Average specificity: {$stats['average_specificity']}/100\n";
        $summary .= "High-quality guides (score ≥80, ≤3 off-targets): {$stats['high_quality_guides']}\n";

        if ($best) {
            $summary .= "\nBest guide: {$best['id']} (Score: {$best['score']})\n";
            $summary .= "Sequence: {$best['sequence']}\n";
            $summary .= "Position: {$best['position']}\n";
            $summary .= "PAM: {$best['pam_sequence']} @ {$best['pam_position']}\n";
            $summary .= "GC content: " . round((float)$best['gc_content'], 1) . "%\n";
            $summary .= "Specificity: {$best['specificity']}\n";
            $summary .= "Predicted off-targets: {$best['offtarget_count']}";
        }

        return $summary;
    }
}

function send_json(array $data, int $statusCode = 200): void
{
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json([
        'success' => false,
        'error' => 'Method not allowed. Use POST.'
    ], 405);
}

try {
    $rawInput = file_get_contents('php://input');
    if ($rawInput === false || trim($rawInput) === '') {
        throw new Exception('Empty request body.');
    }

    $input = json_decode($rawInput, true);
    if (!is_array($input)) {
        throw new Exception('Invalid JSON input.');
    }

    $analyzer = new GeneEditorAnalyzer($input);
    $result = $analyzer->analyze();

    if (($result['success'] ?? false) === true) {
        send_json($result, 200);
    }

    send_json($result, 400);
} catch (Exception $e) {
    send_json([
        'success' => false,
        'error' => $e->getMessage()
    ], 400);
} catch (Throwable $e) {
    send_json([
        'success' => false,
        'error' => 'Internal server error.'
    ], 500);
}
?>