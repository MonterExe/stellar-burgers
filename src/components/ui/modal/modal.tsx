import React, { FC, memo } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { ModalOverlayUI } from '../modal-overlay';

export const ModalUI: FC<{
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
}> = memo(({ title, onClose, children }) => (
  <>
    <ModalOverlayUI onClick={onClose} />
    <div data-testid='modal' className={styles.modal}>
      <div className={styles.header}>
        <h3 className='text text_type_main-large'>{title}</h3>
        <button
          data-testid='modal-close'
          className={styles.button}
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  </>
));
