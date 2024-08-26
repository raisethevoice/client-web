import AuthModal from './AuthModal';
import DeletePostModal from './DeletePostModal';
import EditPostModal from './EditPostModal';
import PostModal from './PostModal';

export default function Prompts() {
  return (
    <>
      <PostModal />
      <AuthModal />
      <EditPostModal />
      <DeletePostModal />
    </>
  );
}
