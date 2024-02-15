import type { Buffers } from '~/src/types';
import { getBufferFilteringLength, bitCount } from '~/src/libs/bitArray';

// buffer_keyに紐づくUint32Arrayに関して、
// ビットが1になっている要素の個数を取得 充填数として扱う
type GetFillingNumIF = (buffers: Buffers, buffer_key: string) => GetFillingNum;
export type GetFillingNum = () => number;
export const getFillingNumIF: GetFillingNumIF = (buffers, buffer_key) => () =>
  buffers[buffer_key].reduce(
    (acc, cur_buffer, cur_index) =>
      cur_index !== getBufferFilteringLength(buffers, buffer_key)
        ? acc + bitCount(cur_buffer)
        : acc,
    0,
  );
