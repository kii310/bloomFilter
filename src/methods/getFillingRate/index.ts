import type { Buffers } from '~/src/types';
import { getFillingNumIF } from '~/src/methods/getFillingNum';
import { getBufferFilteringLength } from '~/src/libs/bitArray';

// buffer_keyに紐づくUint32Arrayに関して、
// Uint32Arrayの充填率を取得する
type GetFillingRateIF = (
  buffers: Buffers,
  buffer_key: string,
) => GetFillingRate;
export type GetFillingRate = () => number;
export const getFillingRateIF: GetFillingRateIF = (buffers, buffer_key) => () =>
  getFillingNumIF(buffers, buffer_key)() /
  (getBufferFilteringLength(buffers, buffer_key) * 32);
