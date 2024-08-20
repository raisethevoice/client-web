export type AuthorT = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  is_active: number;
};

export type PostT = {
  id: number;
  title: string;
  author: AuthorT;
  created_at: string;
  content: string;
  tag?: any;
  total_comments: number;
  upvote_count: number;
  downvote_count: number;
  share_count: number;
  is_active: boolean;
  is_upvoted: boolean;
  is_downvoted: boolean;
  visits: number;
};
