import type { Buffers } from '~/src/types';
import { getHashedBufferIndex } from '~/src/libs/hash';
import {
  getBufferFilteringLength,
  getArrayAndBitIndex,
} from '~/src/libs/bitArray';
import { getBitByIndexIF } from '~/src/methods/getBitByIndex';

// buffer_keyに紐づくUint32Arrayに関して、
// idに対応したビットを1にする
type SetTrueIF = (buffers: Buffers, buffer_key: string) => SetTrue;
export type SetTrue = (str_id: string) => number;
export const setTrueIF: SetTrueIF = (buffers, buffer_key) => (str_id) => {
  const buffer_filtering_length = getBufferFilteringLength(buffers, buffer_key);
  const hashed_buffer_index = getHashedBufferIndex(
    str_id,
    buffer_filtering_length,
  );
  console.log('hashed_buffer_index', hashed_buffer_index);
  const { uint32array_index } = getArrayAndBitIndex(hashed_buffer_index);
  console.log('uint32array_index', uint32array_index);
  if (uint32array_index === buffer_filtering_length) {
    // FIXME
    // bufferの最後の配列にはマッピングされているかなどの最大32種類の情報を保管
    throw new Error();
  }
  buffers[buffer_key][buffer_filtering_length] += 1; // filling_sum
  // NOTE: 0 <= filling_sum <= (2 ** 31) - 1
  if (getBitByIndexIF(buffers, buffer_key)(hashed_buffer_index) === 1) return 1;
  buffers[buffer_key][uint32array_index] += 2 ** (hashed_buffer_index % 32);
  return 1;
};
