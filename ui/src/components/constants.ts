export type Review = {
  appId: string;
  id: string;
  userName: string;
  updatedAt: string;
  rating: number;
  title?: string;
  content?: string;
}

export type SortParams = 'asc' | 'desc'