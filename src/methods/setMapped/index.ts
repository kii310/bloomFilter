import type { Buffers } from '~/src/types';
import { isMappedIF } from '~/src/methods/isMapped';
import { showAllBitArrayIF } from '~/src/methods/showAllBitArray';
import { getBufferFilteringLength } from '~/src/libs/bitArray';

// buffer_keyに紐づくUint32Arrayに関して、
// マッピングフラグを立てる
// TODO: move to libs?
type SetMappedIF = (buffers: Buffers, buffer_key: string) => SetMapped;
export type SetMapped = () => void;
export const setMappedIF: SetMappedIF = (buffers, buffer_key) => () => {
  if (isMappedIF(buffers, buffer_key)()) return;
  buffers[buffer_key][getBufferFilteringLength(buffers, buffer_key)] += 2 ** 31;
  showAllBitArrayIF(buffers, buffer_key)();
  return;
};
