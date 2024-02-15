import type { Buffers } from '~/src/types';
import { getBufferFilteringLength } from '~/src/libs/bitArray';

// buffer_keyに紐づくUint32Arrayに関して、
// 総和を一つ減らす
type DecSumByOneIF = (buffers: Buffers, buffer_key: string) => DecSumByOne;
export type DecSumByOne = () => void;
export const decSumByOneIF: DecSumByOneIF = (buffers, buffer_key) => () => {
  const buffer_filtering_length = getBufferFilteringLength(buffers, buffer_key);
  // FIXME: 削除に対応するため、定期的に更新処理を実行する？
  buffers[buffer_key][buffer_filtering_length] -= 1; // filling_sum
  return;
};
