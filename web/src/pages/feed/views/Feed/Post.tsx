import dayjs from "dayjs";
import { PostT } from "types/feed";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import { createMarkup } from "utils/misc";
import _ from "lodash";

dayjs.extend(relativeTime);

export default function PostPrompt({
	author,
	created_at,
	id,
	title,
	content,
}: PostT) {
	return (
		<div className="flex w-full items-center justify-center mb-3">
			<div className="w-full rounded-xl border p-5 shadow-sm bg-white">
				<div className="flex w-full items-center justify-between border-b pb-3">
					<div className="flex items-center space-x-3">
						<img
							src="default-avatar.webp"
							className="h-8 w-8 rounded-full object-cover"
						/>
						<div className="text-lg font-bold text-slate-700">
							{author.first_name + " " + author.last_name}
						</div>
					</div>
					<div className="flex items-center space-x-4">
						<button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-medium">
							##
						</button>
						<div className="text-xs text-neutral-500">
							{dayjs(`${created_at?.slice(0, 10)}`).fromNow(true)} ago
						</div>
					</div>
				</div>

				<div className="mt-4 mb-2">
					<Link to={`/post/${id}`} className="">
						{title ? (
							<div className="mb-3 text-xl font-semibold">{title}</div>
						) : null}
						<div className="text-sm text-neutral-600">
							<div
								dangerouslySetInnerHTML={createMarkup(
									_.truncate(content, { length: 300 })
								)}
							/>
						</div>
					</Link>
				</div>

				<div>
					<div className="flex items-center justify-between text-slate-500">
						<div className="flex space-x-4 md:space-x-4">
							{/* <Button shape="round">
								<div
									onClick={handleForm}
									className="flex items-center transition hover:text-slate-600"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="mr-1.5 h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
										/>
									</svg>
									<span>{total_comments}</span>
								</div>
							</Button>
							<Button shape="round">
								<div
									className="flex cursor-pointer items-center transition hover:text-slate-600"
									onClick={() => likeHandler(article?.id)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="mr-1.5 h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
										/>
									</svg>
									<span>{like}</span>
								</div>
							</Button> */}
						</div>
					</div>
					{/* <div
						className={`${show ? "block" : "hidden"} transition duration-300`}
					>
						{comments?.map((item: any) => (
							<SingleComment key={item.id} comment={item} />
						))}
					</div> */}
					<div
					// className={`${show ? "block" : "hidden"} transition duration-300`}
					>
						{/* <CommentForm handleForm={handleForm} article={id} /> */}
					</div>
				</div>
			</div>
		</div>
	);
}
