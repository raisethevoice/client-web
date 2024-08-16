import Auth from 'components/Auth';
import { Modal } from 'lib';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { handleAuthModal } from 'store/prompt';

export default function AuthModal() {
  const { authModal } = useSelector((state: RootState) => state.prompt);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(handleAuthModal({ open: false }));
  };

  return (
    <Modal
      footer={false}
      centered
      onCancel={handleClose}
      destroyOnClose
      {...authModal}
    >
      <Auth />
    </Modal>
  );
}
