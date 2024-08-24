import { Image, Upload } from 'antd';
import { Button, Input, Modal, TextArea } from 'lib';
import { useState } from 'react';
import { FcGallery } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { useCreatePostMutation } from 'store/api/feed';
import { handlePostModal } from 'store/prompt';
import type { UploadProps, UploadFile, GetProp } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function PostModal() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { postModal } = useSelector((state: RootState) => state.prompt);
  const dispatch = useDispatch();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const handlePost = async () => {
    try {
      await createPost({ title, content, tag: '##' }).unwrap();
      resetStates();
      handleClose();
    } catch (e) {
      // console.error(e);
    }
  };

  const resetStates = () => {
    setTitle('');
    setContent('');
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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  console.log(fileList);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  return (
    <div>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
      <div className="flex items-center justify-between border rounded-lg px-3 py-2 shadow-sm">
        <h6 className="font-medium text-md">Add to your post</h6>
        <div className="flex items-center gap-2">
          <div className="cursor-pointer hover:bg-gray-100 rounded-full p-1">
            <Upload
              action="https://api.imgbb.com/1/upload?key=1247551acbf4ac043b423aac9f901d0a"
              // listType="picture-card"
              // fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              <FcGallery className="text-2xl" />
            </Upload>
          </div>
          {/* <div className="cursor-pointer hover:bg-gray-100 rounded-full p-1">
					<BiPoll className="text-2xl" />
				</div> */}
        </div>
      </div>
    </div>
  );
};
