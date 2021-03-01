export interface ApiDataSourceClient {
  apiKey: string;
  clientId: string;
  appUuid?: string;
  type: string;
  version: string;
}
  
export interface RequestOptions {
  // if toast when error occured
  hideToast: boolean;
  // datasource url
  url: string;
  // request method
  httpMethod: string;
  // request params
  params: string;
  apiSecret: string;
  apiKey: string;
  system: {
    userid: string;
    corpId: string;
  };
}

export interface PartialSystemInfo {
  windowWidth: number;
  pixelRatio: number;
  platform: string; // e.g iOS | Android
  language: string; // e.g zh_CN 
  screenWidth: number;
  model: string; // e.g iphone7,2
  version: string; // e.g 0.1.0
  system: string; // e.g 0.1.0
  brand: string; // e.g iphone
}

export interface Context {
  sdk: {
    triggerCustomEvent(eventType: string, params: any): void;
    listenCustomEvent(eventType: string, cb: (...arg: any[]) => void): void;
    removeCustomEvent(...arg: any[]): void;
    request(dataSource: ApiDataSourceClient, params: any, opt: Partial<RequestOptions>): void,
    openApp(opt: { url: string }): void;
    openSubPage(formUuid: string): void;
    openLocation: Dingtalk.DD['openLocation'];
    showCallMenu: Dingtalk.DD['showCallMenu'];
    scan: Dingtalk.DD['scan'];
    getSystemInfo(): PartialSystemInfo;
  };
  lifecycle: {
    didMount(name: string): void;
    didUpdate(name: string): void;
    didUnmount(name: string): void;
  };
}