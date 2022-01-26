import { setSdk, setLifecycleSdk } from './api/sdk';

import config from './components/config.json';

export function registerToEngine(obj: any) {
  obj.sdk && setSdk(obj.sdk);
  obj.lifecycle && setLifecycleSdk(obj.lifecycle);
}

export function getConfig() {
  return config;
}

