/** @jsxImportSource @emotion/react */
import { FC } from 'react';

export interface GapProps {
  times: number;
}

export const GapHorizontal: FC<GapProps> = ({ times }) => {
  return <div css={{ marginRight: `${4 * times}px` }} />;
};
