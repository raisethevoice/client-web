import { Skeleton } from "antd";
import _ from "lodash";
import { FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useGetTrendingPostsQuery } from "store/api/feed";
import { PostT } from "types/feed";

export default function RightSidebar() {
	const { data } = useGetTrendingPostsQuery("");

	return (
		<div>
			<div>
				<div className="flex items-center">
					<h1 className="text-xl font-bold">Trending</h1>
					<FiTrendingUp className="ml-2 text-lg" />
				</div>

				{data ? (
					<div className="flex flex-col gap-1.5 mt-2">
						{data.map((post: PostT) => (
							<Link key={post.id} to={`/post/${post.id}/`}>
								<p className="text-md font-normal">
									{_.truncate(post.title, { length: 75 })}
								</p>
							</Link>
						))}
					</div>
				) : (
					<Skeleton className="mt-5" />
				)}
			</div>
		</div>
	);
}
