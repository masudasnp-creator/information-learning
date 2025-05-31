export type Question = {
  id: string;
  topicId: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export const questions: Question[] = [
  {
    id: 'q1',
    topicId: 'strategy',
    text: 'ポーターの競争戦略における5つの競争要因に含まれないものはどれか。',
    options: [
      '売り手の交渉力',
      '買い手の交渉力',
      '新規参入の脅威',
      '経営者の能力',
    ],
    correctAnswer: 3,
    explanation: 'ポーターの5つの競争要因は、「売り手の交渉力」「買い手の交渉力」「新規参入の脅威」「代替品の脅威」「既存競争業者間の敵対関係」です。「経営者の能力」は含まれません。',
    difficulty: 'medium',
  },
  {
    id: 'q2',
    topicId: 'management',
    text: 'ソフトウェア開発工程のうち、要件定義の説明として、最も適切なものはどれか。',
    options: [
      'システムの外部仕様を定義する工程',
      'プログラムの内部構造を設計する工程',
      'プログラムをコーディングする工程',
      'システムのテストを行う工程',
    ],
    correctAnswer: 0,
    explanation: '要件定義は、システムの外部仕様（何ができるべきか）を定義する工程です。内部構造の設計はシステム設計、コーディングは実装、テストはテスト工程に該当します。',
    difficulty: 'easy',
  },
  {
    id: 'q3',
    topicId: 'technology',
    text: '計算量がO(n log n)のソートアルゴリズムはどれか。',
    options: [
      'バブルソート',
      'クイックソート',
      '挿入ソート',
      '選択ソート',
    ],
    correctAnswer: 1,
    explanation: 'クイックソートの平均的な計算量はO(n log n)です。バブルソート、挿入ソート、選択ソートはいずれもO(n²)の計算量を持ちます。',
    difficulty: 'medium',
  },
  {
    id: 'q4',
    topicId: 'network',
    text: 'TCP/IPプロトコルスタックにおいて、IPアドレスを扱う層はどれか。',
    options: [
      'アプリケーション層',
      'トランスポート層',
      'インターネット層',
      'ネットワークインタフェース層',
    ],
    correctAnswer: 2,
    explanation: 'IPアドレスはインターネット層で扱われます。インターネット層ではIPプロトコルが使用され、IPアドレスによるルーティングが行われます。',
    difficulty: 'easy',
  },
  {
    id: 'q5',
    topicId: 'database',
    text: 'リレーショナルデータベースの正規化において、第一正規形の定義として正しいものはどれか。',
    options: [
      '主キーに対する部分関数従属性がない',
      '主キーに対する推移的関数従属性がない',
      'すべての属性が原子値である',
      '非キー属性同士の関数従属性がない',
    ],
    correctAnswer: 2,
    explanation: '第一正規形（1NF）は、すべての属性が原子値（それ以上分解できない値）であることを要求します。第二正規形は部分関数従属性の除去、第三正規形は推移的関数従属性の除去に関するものです。',
    difficulty: 'medium',
  },
  {
    id: 'q6',
    topicId: 'security',
    text: '公開鍵暗号方式の特徴として、正しいものはどれか。',
    options: [
      '暗号化と復号に同じ鍵を使用する',
      '暗号化には公開鍵、復号には秘密鍵を使用する',
      '処理速度が共通鍵暗号方式より高速である',
      '鍵の長さは共通鍵暗号方式より短い',
    ],
    correctAnswer: 1,
    explanation: '公開鍵暗号方式では、暗号化には公開鍵を使用し、復号には秘密鍵を使用します。共通鍵暗号方式と比較して処理速度は遅く、鍵の長さは長くなります。',
    difficulty: 'medium',
  },
  {
    id: 'q7',
    topicId: 'strategy',
    text: 'SWOT分析における「S」が表すものとして、正しいものはどれか。',
    options: [
      'Strategy（戦略）',
      'Strength（強み）',
      'Service（サービス）',
      'Solution（解決策）',
    ],
    correctAnswer: 1,
    explanation: 'SWOT分析におけるSはStrength（強み）を表します。他の要素はWeakness（弱み）、Opportunity（機会）、Threat（脅威）です。',
    difficulty: 'easy',
  },
  {
    id: 'q8',
    topicId: 'management',
    text: 'ソフトウェア開発における「ウォーターフォールモデル」の特徴として、最も適切なものはどれか。',
    options: [
      '各工程を反復的に繰り返しながら開発を進める',
      '要件が明確でない場合に適している',
      '各工程を順次進め、前工程に戻ることは想定していない',
      '顧客との頻繁なフィードバックを重視する',
    ],
    correctAnswer: 2,
    explanation: 'ウォーターフォールモデルは、要件定義→設計→実装→テスト→運用という工程を順次進めるモデルで、基本的に前工程に戻ることは想定していません。反復的な開発や頻繁なフィードバックはアジャイル開発の特徴です。',
    difficulty: 'medium',
  },
  {
    id: 'q9',
    topicId: 'technology',
    text: '2進数の「1010」を10進数に変換した値はいくつか。',
    options: [
      '8',
      '10',
      '12',
      '20',
    ],
    correctAnswer: 1,
    explanation: '2進数の「1010」は、1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 8 + 0 + 2 + 0 = 10（10進数）となります。',
    difficulty: 'easy',
  },
  {
    id: 'q10',
    topicId: 'network',
    text: 'HTTPSプロトコルが使用するポート番号として、標準的なものはどれか。',
    options: [
      '80',
      '443',
      '8080',
      '25',
    ],
    correctAnswer: 1,
    explanation: 'HTTPSの標準ポート番号は443です。HTTP（80）、代替HTTP（8080）、SMTP（25）ではありません。',
    difficulty: 'easy',
  },
];