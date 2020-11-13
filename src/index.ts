import Axios, { AxiosInstance, AxiosRequestConfig, AxiosStatic } from 'axios';
export { Axios };
interface IHttpClient {
  request<P, D extends any = any>(apiConfig): (params: P) => Promise<D>;
}

export class AxiosClient implements IHttpClient {
  private _factory: () => AxiosInstance;
  private _axios: AxiosStatic;
  constructor(Axios: AxiosStatic) {
    this._axios = Axios;
    this._factory = () => this._axios.create();
  }
  /**
   *
   * @param factory
   */
  public setFactory(factory: () => AxiosInstance) {
    this._factory = factory;
  }
  public request<P, D extends any = any>(apiConfig: AxiosRequestConfig) {
    return (params: P, config?: AxiosRequestConfig): Promise<D> => {
      return this._factory().request({
        ...apiConfig,
        ...config,
        params: params,
      });
    };
  }
}

// const api1 = new AxiosClient().request<string, number>({});

// export class FetchClient extends IHttpClient {}

export class MixHttpClient {
  constructor(factory) {}
  public request() {}

  public chagneClient() {}
  public getClient() {}
}

// export const dingTalkClient = new AxiosClient();

// export const getUserName = dingTalkClient.request<string, string>({
//   url: '/api/v2/username',
// });
// export const postInfo = dingTalkClient.request<string, string>({
//   url: '/api/v2/username',
// });

// dingTalkClient.setFactory(() => {
//   const ins = Axios.create();
//   ins.interceptors.request.use
//   return ins
// })

// //内部
// const xxx = <M, N>(config, httpFactory) => {
//   return (params) => {
//     httpFactory().request('');
//   };
// };

// //内部
// // const getUserName = xxx<string, any>('/path', httpFactory);

// //外部
// const httpFactory = () => Axios.create({});

// //外部(可选,用来配置全局 api)
// const yyy = (config) => {
//   return xxx(config, httpFactory);
// };

// //yong 全局的 api
// const yx = yyy('xx');

// //外部预定义的重写配置
// const xxx2 = xxx('/asd', () =>
//   Axios.create({
//     // 你的个性化配置
//   })
// );

//外部
// getUserName({ name: 'sss' });
