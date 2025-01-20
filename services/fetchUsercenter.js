import { genUsercenter } from '../models/usercenter';

export function fetchUserCenter(){
  return new Promise(resolve => {
    resolve(genUsercenter());
  })
}