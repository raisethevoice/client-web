import { IoNewspaperOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "store";
import { handlePostModal, requireAuth } from "store/prompt";

export default function Sidebar() {
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.auth);

	const onWritePost = () => {
		if (user) {
			dispatch(handlePostModal({ open: true }));
		} else {
			dispatch(requireAuth());
		}
	};

	return (
		<div className="max-w-xl mx-auto">
			<aside className="w-full" aria-label="Sidebar">
				<div className="pb-4 overflow-y-auto rounded">
					<ul className="space-y-2">
						<li className={`${true ? "block" : "hidden"} `}>
							<Link
								to="/"
								className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 "
							>
								<IoNewspaperOutline className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
								<span className="flex-1 ml-3 whitespace-nowrap">My Feed</span>
							</Link>
						</li>

						<li>
							<Link
								to="/explore"
								className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
							>
								<svg
									className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
								</svg>
								<span className="flex-1 ml-3 whitespace-nowrap">Explore</span>
							</Link>
						</li>
					</ul>
				</div>
				<div>
					<ActionButton onClick={onWritePost}>Write</ActionButton>
				</div>
			</aside>
		</div>
	);
}

const ActionButton = ({ children, ...props }: any) => {
	return (
		<button
			className="bg-gray-900 mt-4 text-white px-3 py-2 w-full rounded-full font-semibold"
			{...props}
		>
			{children}
		</button>
	);
};
