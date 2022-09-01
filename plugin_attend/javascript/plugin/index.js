import { setSdk, setLifecycleSdk } from './api/sdk';

export function registerAttendSdk(obj) {
  setSdk(obj.sdk);
  setLifecycleSdk(obj.lifecycle);
  console.log('sdk', obj)
}



