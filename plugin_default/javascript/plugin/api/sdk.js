let sdk = {};
export function setSdk(sdkObj) {
  sdk = sdkObj;
  console.log(sdkObj);
}
export function getSdk() {
  return sdk;
}

let lifecycleSdk = {};
export function setLifecycleSdk(sdkObj) {
  lifecycleSdk = sdkObj;
  console.log(lifecycleSdk);
}

export function getLifecycleSdk() {
  return lifecycleSdk;
}