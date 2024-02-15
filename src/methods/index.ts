import type { Buffers } from '~/src/types';
import { getBufferIF, GetBuffer } from './getBuffer';
import { showAllBitArrayIF, ShowAllBitArray } from './showAllBitArray';
import { getBitByIdIF, GetBitById } from './getBitById';
import { getBitByIndexIF, GetBitByIndex } from './getBitByIndex';
import { setTrueIF, SetTrue } from './setTrue';
import { decSumByOneIF, DecSumByOne } from './decSumByOne';
import { isMappedIF, IsMapped } from './isMapped';
import { mapperIF, Mapper } from './mapper';
import { setMappedIF, SetMapped } from './setMapped';
import { getFillingNumIF, GetFillingNum } from './getFillingNum';
import { getFillingSumIF, GetFillingSum } from './getFillingSum';
import { getFillingRateIF, GetFillingRate } from './getFillingRate';

type BloomFilterClientIF = (
  buffers: Buffers,
  buffer_key: string,
) => BloomFilterClient;
export type BloomFilterClient = {
  getBuffer: GetBuffer;
  showAllBitArray: ShowAllBitArray;
  getBitById: GetBitById;
  getBitByIndex: GetBitByIndex;
  setTrue: SetTrue;
  decSumByOne: DecSumByOne;
  isMapped: IsMapped;
  mapper: Mapper;
  setMapped: SetMapped;
  getFillingNum: GetFillingNum;
  getFillingSum: GetFillingSum;
  getFillingRate: GetFillingRate;
};

// TODO: 遅延評価で速度が上がるのか調べる
//
// export const bloomFilterClientIF: BloomFilterClientIF = (
//   buffers,
//   buffer_key,
// ) => {
//   const bloomFilterClient: BloomFilterClient = {
//     getBuffer: getBufferIF(buffers, buffer_key),
//     showAllBitArray: showAllBitArrayIF(buffers, buffer_key),
//     getBitById: getBitByIdIF(buffers, buffer_key),
//     getBitByIndex: getBitByIndexIF(buffers, buffer_key),
//     setTrue: setTrueIF(buffers, buffer_key),
//     decSumByOne: decSumByOneIF(buffers, buffer_key),
//     isMapped: isMappedIF(buffers, buffer_key),
//     mapper: mapperIF(buffers, buffer_key),
//     setMapped: setMappedIF(buffers, buffer_key),
//     getFillingNum: getFillingNumIF(buffers, buffer_key),
//     getFillingSum: getFillingSumIF(buffers, buffer_key),
//     getFillingRate: getFillingRateIF(buffers, buffer_key),
//   };
//   return bloomFilterClient;
// };

export const bloomFilterClientIF: BloomFilterClientIF = (
  buffers,
  buffer_key,
) => {
  const bloomFilterClient: BloomFilterClient = {
    getBuffer: () => getBufferIF(buffers, buffer_key)(),
    showAllBitArray: () => showAllBitArrayIF(buffers, buffer_key)(),
    getBitById: (str_id) => getBitByIdIF(buffers, buffer_key)(str_id),
    getBitByIndex: (hashed_buffer_index) =>
      getBitByIndexIF(buffers, buffer_key)(hashed_buffer_index),
    setTrue: (str_id) => setTrueIF(buffers, buffer_key)(str_id),
    decSumByOne: () => decSumByOneIF(buffers, buffer_key)(),
    isMapped: () => isMappedIF(buffers, buffer_key)(),
    mapper: (str_ids) => mapperIF(buffers, buffer_key)(str_ids),
    setMapped: () => setMappedIF(buffers, buffer_key)(),
    getFillingNum: () => getFillingNumIF(buffers, buffer_key)(),
    getFillingSum: () => getFillingSumIF(buffers, buffer_key)(),
    getFillingRate: () => getFillingRateIF(buffers, buffer_key)(),
  };
  return bloomFilterClient;
};
