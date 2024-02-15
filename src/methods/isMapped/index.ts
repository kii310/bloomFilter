import type { Buffers } from '~/src/types';
import { getBufferFilteringLength, convertTo32bits } from '~/src/libs/bitArray';

// buffer_keyに紐づくUint32Arrayに関して、
// マッピングされていればtrueを返す
type IsMappedIF = (buffers: Buffers, buffer_key: string) => IsMapped;
export type IsMapped = () => boolean;
export const isMappedIF: IsMappedIF = (buffers, buffer_key) => () =>
  Number(
    convertTo32bits(
      buffers[buffer_key][getBufferFilteringLength(buffers, buffer_key)],
    )[0],
  ) === 1;
