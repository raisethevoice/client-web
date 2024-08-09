import { Button, Input, Modal, TextArea } from "lib";
import { useState } from "react";
import { FcGallery } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useCreatePostMutation } from "store/api/feed";
import { handlePostModal } from "store/prompt";

export default function PostModal() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const { postModal } = useSelector((state: RootState) => state.prompt);
	const dispatch = useDispatch();
	const [createPost, { isLoading }] = useCreatePostMutation();

	const handlePost = async () => {
		try {
			await createPost({ title, content, tag: "##" }).unwrap();
			resetStates();
			handleClose();
		} catch (e) {
			// console.error(e);
		}
	};

	const resetStates = () => {
		setTitle("");
		setContent("");
	};

	const handleClose = () => {
		dispatch(handlePostModal({ open: false }));
	};

	return (
		<Modal
			title="Write a post"
			okText="Post"
			onCancel={handleClose}
			width={600}
			footer={false}
			{...postModal}
		>
			<div className="flex flex-col gap-5 pt-5">
				<Input value={title} onChange={(e) => setTitle(e.target.value)} />
				<TextArea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					rows={8}
				/>
				<PostType />
				<Button onClick={handlePost} loading={isLoading}>
					Post
				</Button>
			</div>
		</Modal>
	);
}

const PostType = () => {
	return (
		<div className="flex items-center justify-between border rounded-lg px-3 py-2 shadow-sm">
			<h6 className="font-medium text-md">Add to your post</h6>
			<div className="flex items-center gap-2">
				<div className="cursor-pointer hover:bg-gray-100 rounded-full p-1">
					<FcGallery className="text-2xl" />
				</div>
				{/* <div className="cursor-pointer hover:bg-gray-100 rounded-full p-1">
					<BiPoll className="text-2xl" />
				</div> */}
			</div>
		</div>
	);
};
