import { createHash } from 'crypto';

type GetHashedBufferIndex = (
  str: string,
  buffer_filtering_length: number,
) => number;
// 文字列からハッシュ化されたUint32Arrayのインデックスを取得する
export const getHashedBufferIndex: GetHashedBufferIndex = (
  str,
  buffer_filtering_length,
) => getHashNumber(str) % (buffer_filtering_length * 32);

type GetHashNumber = (str: string) => number;
const getHashNumber: GetHashNumber = (str) => {
  const hashHex = hashBySha256(str);
  const maxHex = 'f'.repeat(64);
  // NOTE: 2の累乗を掛けた方が処理は速いかも？
  return Math.floor((parseInt(hashHex, 16) / parseInt(maxHex, 16)) * 10000);
};

type HashBySha256 = (str: string) => string;
const hashBySha256: HashBySha256 = (str) =>
  createHash('sha256').update(str).digest('hex');
