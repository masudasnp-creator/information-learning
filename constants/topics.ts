export type Topic = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalQuestions: number;
};

export const topics: Topic[] = [
  {
    id: 'strategy',
    title: '企業と法務',
    description: '経営戦略、技術戦略、企業活動、法務など',
    icon: 'briefcase',
    color: '#4A90E2',
    totalQuestions: 25,
  },
  {
    id: 'management',
    title: 'システム開発',
    description: 'システム開発技術、ソフトウェア開発管理技術など',
    icon: 'settings',
    color: '#50C878',
    totalQuestions: 30,
  },
  {
    id: 'technology',
    title: '基礎理論',
    description: '基礎理論、アルゴリズムとプログラミングなど',
    icon: 'code',
    color: '#FF6B6B',
    totalQuestions: 35,
  },
  {
    id: 'network',
    title: 'ネットワーク',
    description: 'ネットワーク技術、セキュリティなど',
    icon: 'wifi',
    color: '#FFC107',
    totalQuestions: 28,
  },
  {
    id: 'database',
    title: 'データベース',
    description: 'データベース技術、データ構造など',
    icon: 'database',
    color: '#9C27B0',
    totalQuestions: 22,
  },
  {
    id: 'security',
    title: 'セキュリティ',
    description: '情報セキュリティ、暗号化技術など',
    icon: 'shield',
    color: '#F44336',
    totalQuestions: 20,
  },
];