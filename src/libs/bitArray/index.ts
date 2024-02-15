import type { Buffers } from '~/src/types';

type GetBufferFilteringLength = (
  buffers: Buffers,
  buffer_key: string,
) => number;
export const getBufferFilteringLength: GetBufferFilteringLength = (
  buffers,
  buffer_key,
) => buffers[buffer_key].length - 1;

type ConvertTo32bits = (num: number) => string;
export const convertTo32bits: ConvertTo32bits = (num) =>
  num.toString(2).padStart(32, '0');

type GetStrBitIndex = (index: number) => number;
const getStrBitIndex: GetStrBitIndex = (index) => 31 - index;
// NOTE: ビットは0100001010101の32桁の文字列になっている
//       その文字列のインデックスを取得するため、lengthから引いている
// NOTE: 配列の末端インデックスの32でないのは、初期化チェック用のビットを使用しているため

// HASH LIBS
// TODO: refactoring
type ArrayAndBitIndex = {
  uint32array_index: number;
  bit_index: number;
};

// NOTE: value = ConvertTo32bits(buffers[user_id][uint32array_index])[bit_index]
type GetArrayAndBitIndex = (hashed_buffer_index: number) => ArrayAndBitIndex;
export const getArrayAndBitIndex: GetArrayAndBitIndex = (
  hashed_buffer_index,
) => {
  const uint32array_index = Math.floor(hashed_buffer_index / 32);
  const bit_index = getStrBitIndex(hashed_buffer_index % 32);
  return {
    uint32array_index: uint32array_index,
    bit_index: bit_index,
  };
};

type BitCount = (bits: number) => number;
export const bitCount: BitCount = (bits) => {
  // NOTE: 1になっているビットの個数を求めることをビットカウント
  // これはビットカウントの有名なアルゴリズムで分割統治法をしている
  const by_2bits = bits - ((bits >>> 1) & 0x55555555);
  const by_4bits = (by_2bits & 0x33333333) + ((by_2bits >>> 2) & 0x33333333);
  const by_8bits = (by_4bits + (by_4bits >>> 4)) & 0x0f0f0f0f;
  const by_16bits = (by_8bits * 0x01010101) >>> 24;
  return by_16bits;
};
