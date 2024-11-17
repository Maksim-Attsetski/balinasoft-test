export interface ITask {
  id: number;
  name: string;
  description: string;
  is_done: boolean;
  is_pinned: boolean;
  created_at: string;
  user_id: string;
}
