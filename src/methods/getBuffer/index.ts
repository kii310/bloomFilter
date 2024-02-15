import type { Buffers } from '~/src/types';

// buffer_keyに紐づくUint32Arrayを返す
type GetBufferIF = (buffers: Buffers, buffer_key: string) => GetBuffer;
export type GetBuffer = () => Uint32Array | undefined;
export const getBufferIF: GetBufferIF = (buffers, buffer_key) => () =>
  buffers[buffer_key];
