import {getSdk, setSdk, setLifecycleSdk, getLifecycleSdk} from '../src/plugin/api/sdk';

describe('should #sdk',()=>{
  it('inject mock sdk', ()=>{
    const sdk = {
      test: 'test'
    };
    // @ts-ignore
    setSdk(sdk);
    
    const injectedSdk = getSdk();
    // @ts-ignore
    expect(injectedSdk['test'] !== undefined);
  });

  it('inject mock lifecycle', ()=>{
    const lifecycle = {
      test: 'test'
    };
    // @ts-ignore
    setLifecycleSdk(lifecycle);
    
    const injectedLifecycle = getLifecycleSdk();
    // @ts-ignore
    expect(injectedLifecycle['test'] !== undefined);
  });
});