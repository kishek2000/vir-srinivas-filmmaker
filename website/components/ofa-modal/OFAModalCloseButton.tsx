/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource @emotion/react */

import { AiOutlineClose } from 'react-icons/ai';

export const OFAModalCloseButton: React.FC<{ onClose: VoidFunction }> = ({
  onClose,
}) => {
  return (
    <button
      css={{
        color: 'white',
        top: '48px',
        right: '48px',
        position: 'fixed',
        cursor: 'pointer',
        outline: 'none',
        background: 'none',
        border: 'none',
      }}
      onClick={onClose}
    >
      <AiOutlineClose size={24} />
    </button>
  );
};
