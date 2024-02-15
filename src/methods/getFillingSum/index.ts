import type { Buffers } from '~/src/types';
import { isMappedIF } from '~/src/methods/isMapped';
import { getBufferFilteringLength } from '~/src/libs/bitArray';

// buffer_keyに紐づくUint32Arrayに関して、
// 保存してあるDBのレコード数を取得 合計数として扱う
// Uint32Arrayの最後の配列に合計数を保存してある
// ただし、32ビット目はマッピングされたかどうかのフラグ
type GetFillingSumIF = (buffers: Buffers, buffer_key: string) => GetFillingSum;
export type GetFillingSum = () => number;
export const getFillingSumIF: GetFillingSumIF = (buffers, buffer_key) => () =>
  isMappedIF(buffers, buffer_key)()
    ? buffers[buffer_key][getBufferFilteringLength(buffers, buffer_key)] -
      2 ** 31
    : buffers[buffer_key][getBufferFilteringLength(buffers, buffer_key)];
