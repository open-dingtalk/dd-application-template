import { setSdk, setLifecycleSdk } from './api/sdk';

export function registerWorktab(obj) {
  setSdk(obj.sdk)
  setLifecycleSdk(obj.lifecycle)
}



