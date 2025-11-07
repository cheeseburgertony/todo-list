export interface ITask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  important?: boolean;
  createdAt: number;
}

export type sortOrderType = "createdAt" | "important" | "title";
