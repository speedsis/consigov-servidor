import { classNames } from 'src/lib/classNames';
import { useModal } from 'src/state/modalState';
import { Modal, type ModalProps } from './Modal';
import { ModalIds } from 'src/@types/modal-ids';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

type Props = Pick<ModalProps, 'title' | 'className'> & {
  id: ModalIds;
  description: React.ReactNode;
  state?: 'error' | 'loading' | null;
  onDeleteClick(): void;
  onClose?(): void;
  forceOpen?: boolean;
  deleteText?: string;
};

export function AlertModal(props: Props) {
  const modalState = useModal();

  function handleClose() {
    props.onClose?.();
    modalState.closeModal(props.id);
  }

  return (
    <Modal
      className={classNames('w-[550px]', props.className)}
      title={props.title}
      onClose={handleClose}
      isOpen={props.forceOpen ?? modalState.isOpen(props.id)}
      isAlert
    >
      <div className="my-3 dark:text-gray-300">{props.description}</div>
      <div className="flex items-center justify-end gap-2 mt-2">
        <Button disabled={props.state === 'loading'} variant="text" onClick={handleClose}>
          {'cancel'}
        </Button>

        {/* <LoadingButton
          disabled={props.state === 'loading'}
          variant="contained"
          color="error"
          className="flex items-center"
          onClick={props.onDeleteClick}
          loading={props.state === 'loading'}
        >
          {props.deleteText ? props.deleteText : 'delete'}
        </LoadingButton> */}
      </div>
    </Modal>
  );
}
