import { Modal } from 'antd';
import { Button, Input, TextArea } from 'lib';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { useGetSinglePostQuery } from 'store/api/feed';
import { handleEditPostModal } from 'store/prompt';

const EditPostModal = () => {
  const { editPostModal } = useSelector((state: RootState) => state.prompt);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data: SinglePostData, isFetching: SinglePostDataFetching } =
    useGetSinglePostQuery(editPostModal?.id, {
      skip: !editPostModal?.open || !editPostModal?.id,
    });

  useEffect(() => {
    if (SinglePostData) {
      setTitle(SinglePostData?.title);
      setContent(SinglePostData?.content);
    }
  }, [SinglePostData]);

  const handleClose = () => {
    dispatch(handleEditPostModal({ open: false, id: null }));
  };

  const handleEditPost = () => {
    console.log(title, content);
  };
  return (
    <Modal
      title="Edit Post"
      footer={false}
      centered
      onCancel={handleClose}
      destroyOnClose
      open={editPostModal?.open}
      loading={SinglePostDataFetching}
    >
      <div className="flex flex-col gap-5 pt-5">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
        />
        <Button onClick={handleEditPost} loading={false}>
          Edit Post
        </Button>
      </div>
    </Modal>
  );
};

export default EditPostModal;
