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
        top: ['16px', '36px', '48px'],
        right: ['16px', '36px', '48px'],
        position: 'fixed',
        cursor: 'pointer',
        outline: 'none',
        border: 'none',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '4px',
        background: 'white',
        color: 'black',
        borderRadius: '4px',
        padding: '10px 14px',
        fontSize: '18px',
        zIndex: 100,
      })}
      onClick={onClose}
    >
      CLOSE <AiOutlineClose size={18} strokeWidth={60} />
    </button>
  );
};
