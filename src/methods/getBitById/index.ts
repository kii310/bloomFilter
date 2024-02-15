import type { Buffers } from '~/src/types';
import { getHashedBufferIndex } from '~/src/libs/hash';
import { getBitByIndexIF } from '~/src/methods/getBitByIndex';

// buffer_keyに紐づくUint32Arrayに関して、
// idに対応したビットの値を返す
type GetBitByIdIF = (buffers: Buffers, buffer_key: string) => GetBitById;
export type GetBitById = (str_id: string) => number;
export const getBitByIdIF: GetBitByIdIF = (buffers, buffer_key) => (str_id) => {
  const buffer_length_by_32 = buffers[buffer_key].length - 1;
  const hashed_buffer_index = getHashedBufferIndex(str_id, buffer_length_by_32);
  return getBitByIndexIF(buffers, buffer_key)(hashed_buffer_index);
};
