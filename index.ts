interface IHttpClient {
  request<P, D extends any = any>(apiConfig): (params: P) => Promise<D>;
}

class AxiosClient implements IHttpClient {
  static defaultFactory = () => Axios.create();
  private _factory: () => AxiosInstance;
  constructor() {
    this._factory = AxiosClient.defaultFactory;
  }
  /**
   * 
   * @param factory  
   */
  public setFactory(factory: () => AxiosInstance) {
    this._factory = factory;
  }
  public request<P, D extends any = any>(apiConfig: AxiosRequestConfig) {
    return (params: P): Promise<D> => {
      return this._factory().request({ ...apiConfig, params: params });
    };
  }
}

const api1 = new AxiosClient().request<string, number>({});

// class FetchClient extends IHttpClient {}

class MixHttpClient {
  constructor(factory) {}
  public request() {}

  public chagneClient() {}
  public getClient() {}
}

export const dingTalkClient = new AxiosClient();

export const getUserName = dingTalkClient.request<string, string>({
  url: '/api/v2/username',
});
export const postInfo = dingTalkClient.request<string, string>({
  url: '/api/v2/username',
});


dingTalkClient.setFactory(()=>{
  const ins = Axios.create();
  ins.interceptors.request.use
  return ins
})

//内部
const xxx = <M, N>(config, httpFactory) => {
  return (params) => {
    httpFactory().request('');
  };
};

//内部
// const getUserName = xxx<string, any>('/path', httpFactory);

//外部
const httpFactory = () => Axios.create({});

//外部(可选,用来配置全局 api)
const yyy = (config) => {
  return xxx(config, httpFactory);
};

//yong 全局的 api
const yx = yyy('xx');

//外部预定义的重写配置
const xxx2 = xxx('/asd', () =>
  Axios.create({
    // 你的个性化配置
  })
);

//外部
getUserName({ name: 'sss' });
