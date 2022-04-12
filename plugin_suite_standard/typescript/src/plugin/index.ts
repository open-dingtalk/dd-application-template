import { setSdk, setLifecycleSdk, setSetterSdk } from './api/sdk';

import config from './components/config.json';

export function registerToEngine(obj: any) {
  obj.sdk && setSdk(obj.sdk);
  obj.setterSdk && setSetterSdk(obj.setterSdk);
  obj.lifecycle && setLifecycleSdk(obj.lifecycle);
}

export function getConfig() {
  return config;
}

