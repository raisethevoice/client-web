import { Card, Skeleton } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { FaRegCommentAlt } from 'react-icons/fa';
import { PiShareFat } from 'react-icons/pi';
import { useGetSinglePostQuery } from "store/api/feed";
import { PostT } from "types/feed";
import { createMarkup } from "utils/misc";

export default function PostPage() {
	const { id } = useParams();
	const { data } = useGetSinglePostQuery(Number(id));

	return data ? (
		<div>
			<div>
				<div className="flex items-center justify-between w-full mb-4">
					<Author {...data} />
					{/* <ActionButtons /> */}
				</div>
			</div>

			<div className="mt-5">
				<h1 className="text-2xl font-semibold"> {data?.title}</h1>
				<div
					dangerouslySetInnerHTML={createMarkup(data?.content)}
					className="pt-2 pb-5"
				/>
				<hr className="mb-5" />

				{/* 
				<p>
					Tag:{" "}
					<span className="bg-gray-100 rounded-2xl px-2 py-1">#{data?.tag}</span>
				</p> */}

				<div className="flex items-center gap-2.5 mt-4">
					<div className="flex items-center justify-center h-8 bg-gray-100 rounded-full overflow-hidden">
						<div className="hover:bg-gray-200 cursor-pointer h-8 px-2.5 flex gap-1.5 items-center justify-center">
							<BiUpArrow className="text-lg" />
							{data.comments !== undefined ? <p>{29}</p> : null}
						</div>
						<div className="w-[1px] h-full bg-gray-200" />
						<div className="hover:bg-gray-200 cursor-pointer h-8 px-2.5 flex gap-1.5 items-center justify-center">
							<BiDownArrow className="text-lg" />
							{data.comments !== undefined ? <p>{12}</p> : null}
						</div>
					</div>

					<div className="bg-gray-100 hover:bg-gray-200 cursor-pointer h-8 px-2.5 rounded-full flex gap-1.5 items-center justify-center">
						<FaRegCommentAlt className="text-[15px] translate-y-[1px]" />
						{data.comments !== undefined ? <p>{data.comments || 10}</p> : null}
					</div>
					<div className="bg-gray-100 hover:bg-gray-200 cursor-pointer h-8 px-2.5 rounded-full flex gap-1.5 items-center justify-center">
						<PiShareFat className="text-[19px]" />
						21
					</div>
				</div>
			</div>
		</div>
	) : (
		<Card>
			<Skeleton />
		</Card>
	);
}

const Author = ({ author, created_at }: PostT) => {
	return (
		<div className="flex items-center">
			<div className="h-8 w-8">
				<img
					className="w-full h-full rounded-full object-cover"
					src="/default-avatar.webp"
					alt="avatar"
				/>
			</div>
			<div className="ml-2.5">
				<h1 className="text-md font-semibold m-0">
					{author?.first_name + " " + author?.last_name}
				</h1>
				<p className="font-light text-xs m-0">
					{dayjs(created_at).format("MMM D, YYYY")}
				</p>
			</div>
		</div>
	);
};

// const ActionButtons = () => {
// 	return false ? (
// 		<div className="flex gap-2">
// 			<button
// 				className="block bg-gray-900 rounded-full px-4 text-white font-normal py-1.5"
// 				onClick={() => {}}
// 			>
// 				Edit
// 			</button>
// 			<button
// 				className="block bg-gray-900 rounded-full px-4 text-white font-normal py-1.5"
// 				onClick={() => {}}
// 			>
// 				Delete
// 			</button>
// 		</div>
// 	) : (
// 		<button className="block bg-gray-900 rounded-full px-4 text-white font-normal py-1.5">
// 			Follow
// 		</button>
// 	);
// };
