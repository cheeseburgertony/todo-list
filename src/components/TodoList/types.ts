export interface IStep {
  id: number;
  title: string;
  completed: boolean;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  important?: boolean;
  createdAt: number;
  steps?: IStep[];
}

export type SortOrderType = "createdAt" | "important" | "title";
