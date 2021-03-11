import {Context} from '../common/types';

let sdk = {} as Context['sdk'];
export function setSdk(sdkObj: Context['sdk']): void {
  sdk = sdkObj;
  console.log(sdkObj);
}
export function getSdk(): Context['sdk'] {
  return sdk;
}

let lifecycleSdk = {} as Context['lifecycle'];
export function setLifecycleSdk(sdkObj: Context['lifecycle']): void {
  lifecycleSdk = sdkObj;
  console.log(lifecycleSdk);
}

export function getLifecycleSdk(): Context['lifecycle'] {
  return lifecycleSdk;
}