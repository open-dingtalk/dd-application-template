import { SuitOpenApi, SuitSetterApi } from '../common/types';

let sdk: SuitOpenApi = {} as SuitOpenApi;
export function setSdk(sdkObj: any) {
  sdk = sdkObj;
}
export function getSdk() {
  return sdk;
}

let lifecycleSdk = {};
export function setLifecycleSdk(sdkObj: any) {
  lifecycleSdk = sdkObj;
}

export function getLifecycleSdk() {
  return lifecycleSdk;
}

let setterSdk = {} as SuitSetterApi;
export function setSetterSdk(sdkObj: any) {
  setterSdk = sdkObj;
}
export function getSetterSdk() {
  return setterSdk;
}
