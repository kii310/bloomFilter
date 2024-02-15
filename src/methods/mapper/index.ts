import type { Buffers } from '~/src/types';
import { setTrueIF } from '~/src/methods/setTrue';
import { setMappedIF } from '~/src/methods/setMapped';

// buffer_keyに紐づくUint32Arrayに関して、
// マッピングされた状態にする
type MapperIF = (buffers: Buffers, buffer_key: string) => Mapper;
export type Mapper = (str_ids: string[]) => void;
export const mapperIF: MapperIF = (buffers, buffer_key) => (str_ids) => {
  const setTrue = setTrueIF(buffers, buffer_key);
  str_ids.forEach((str_id) => setTrue(str_id));
  setMappedIF(buffers, buffer_key)();
  return;
};
