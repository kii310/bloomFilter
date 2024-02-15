import type { Buffers } from '~/src/types';
import { bloomFilterClientIF, BloomFilterClient } from '~/src/methods';

type NewBloomFilter = () => Constructor;
type Constructor = (
  buffer_key: string,
  buffer_filtering_length: number,
) => BloomFilterClient;

export const newBloomFilter: NewBloomFilter = () => {
  let buffers: Buffers = {};
  return (buffer_key, buffer_filtering_length) => {
    if (buffers[buffer_key] === undefined)
      buffers[buffer_key] = newBuffer(buffer_filtering_length + 1);
    return bloomFilterClientIF(buffers, buffer_key);
  };
};

// BLOOM FILTER
type NewBuffer = (buffer_length: number) => Uint32Array;
const newBuffer: NewBuffer = (buffer_length) => new Uint32Array(buffer_length);
