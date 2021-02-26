import { setSdk, setLifecycleSdk } from './api/sdk';
import {Context} from './common/types';

export function registerWorktab(obj: Context): void {
  setSdk(obj.sdk);
  setLifecycleSdk(obj.lifecycle);
}