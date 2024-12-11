import { genUsercenter } from '../models/usercenter';

export function fetchUserCenter(){
  return new Promise(resolve => {
    console.log('get');
    console.log(genUsercenter());
    resolve(genUsercenter());
  })
}