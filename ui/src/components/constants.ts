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
  totalPages: number | null;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
}

export const DEFAULT_PAGES: PagesState = {
  totalPages: null,
  currentPage: 1,
  nextPage: null,
  prevPage: null
}