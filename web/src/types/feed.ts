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
	total_likes: number;
	visits: number;
};
