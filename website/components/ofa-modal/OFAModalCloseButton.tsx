/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource @emotion/react */

import { AiOutlineClose } from 'react-icons/ai';
import { mq } from '../../styles/mq';

export const OFAModalCloseButton: React.FC<{ onClose: VoidFunction }> = ({
  onClose,
}) => {
  return (
    <button
      css={mq({
        color: 'white',
        top: ['24px', '36px', '48px'],
        right: ['24px', '36px', '48px'],
        position: 'fixed',
        cursor: 'pointer',
        outline: 'none',
        background: 'none',
        border: 'none',
      })}
      onClick={onClose}
    >
      <AiOutlineClose size={24} />
    </button>
  );
};
