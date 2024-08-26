import { Modal } from 'antd';
import { Button } from 'lib';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { handleDeletePostModal } from 'store/prompt';

const DeletePostModal = () => {
  const { deletePostModal } = useSelector((state: RootState) => state.prompt);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(handleDeletePostModal({ open: false, id: null }));
  };

  const handleOk = () => {
    console.log('ok');
  };
  return (
    <Modal
      title="Delete Post"
      open={deletePostModal?.open}
      onOk={handleOk}
      onCancel={handleClose}
      footer={
        <>
          <Button
            className="bg-transparent border text-black hover:bg-gray-800 duration-300 ease-in-out hover:text-white"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button onClick={handleOk}>Yes</Button>
        </>
      }
    >
      <p>Are you sure you want to delete this post?</p>
    </Modal>
  );
};

export default DeletePostModal;
