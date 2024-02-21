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

export type PagesState = {
  total: number;
  current: number;
  next: number | null;
  prev: number | null;
}

export const DEFAULT_PAGES: PagesState = {
  total: 0,
  current: 1,
  next: null,
  prev: null
}