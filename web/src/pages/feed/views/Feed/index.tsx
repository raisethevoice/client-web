import { Card, Skeleton } from "antd";
import { useGetPostsQuery } from "store/api/feed";
import { PostT } from "types/feed";
import Post from "./Post";

export default function Feed() {
	const { data, isLoading } = useGetPostsQuery("");

	return (
		<>
			{!isLoading ? (
				data.map((post: PostT) => <Post key={post.id} {...post} />)
			) : (
				<FeedSkeleton />
			)}
		</>
	);
}

const FeedSkeleton = () => {
	return (
		<div className="flex flex-col gap-3">
			{Array.from({ length: 3 }).map((_, idx) => (
				<Card key={idx}>
					<Skeleton />
				</Card>
			))}
		</div>
	);
};
