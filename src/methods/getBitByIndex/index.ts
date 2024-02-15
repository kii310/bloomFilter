import type { Buffers } from '~/src/types';
import { getArrayAndBitIndex, convertTo32bits } from '~/src/libs/bitArray';

// buffer_keyに紐づくUint32Arrayに関して、
// indexに対応したビットの値を返す
type GetBitByIndexIF = (buffers: Buffers, buffer_key: string) => GetBitByIndex;
export type GetBitByIndex = (hashed_buffer_index: number) => number;
export const getBitByIndexIF: GetBitByIndexIF =
  (buffers, buffer_key) => (hashed_buffer_index) => {
    const { uint32array_index, bit_index } =
      getArrayAndBitIndex(hashed_buffer_index);
    return Number(
      convertTo32bits(buffers[buffer_key][uint32array_index])[bit_index],
    );
  };
