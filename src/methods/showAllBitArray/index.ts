import type { Buffers } from '~/src/types';
import { getBufferFilteringLength, convertTo32bits } from '~/src/libs/bitArray';
import { isMappedIF } from '~/src/methods/isMapped';

// buffer_keyに紐づくUint32Arrayに関して、
// すべてビット配列形式に変換してログに出力する
type ShowAllBitArrayIF = (
  buffers: Buffers,
  buffer_key: string,
) => ShowAllBitArray;
export type ShowAllBitArray = () => void;
export const showAllBitArrayIF: ShowAllBitArrayIF =
  (buffers, buffer_key) => () => {
    console.log('original', buffers[buffer_key]);
    buffers[buffer_key].forEach((uint32array, uint32array_index) => {
      uint32array_index !== getBufferFilteringLength(buffers, buffer_key)
        ? console.log(
            32 * (uint32array_index + 1) - 1,
            convertTo32bits(uint32array),
            32 * uint32array_index,
          )
        : console.log('isMapped', convertTo32bits(uint32array), 'filling_sum');
    });
    console.log('isMapped', isMappedIF(buffers, buffer_key)());
    return;
  };
