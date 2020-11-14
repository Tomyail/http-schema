type HttpRequest = <HttpConfigType, ParamsType, ReturnType>(input: {
  config: HttpConfigType;
  params: ParamsType;
}) => Promise<ReturnType>;

export class HttpSchema {
  private _factory: HttpRequest;
  constructor() {}
  /**
   *
   * @param factory
   */
  public setFactory(factory: HttpRequest) {
    this._factory = factory;
  }
  public define<
    ParamsType,
    ReturnType extends any = any,
    HttpConfigType extends object = any
  >(apiConfig: HttpConfigType) {
    return (
      params: ParamsType,
      config?: HttpConfigType
    ): Promise<ReturnType> => {
      return this._factory({
        config: { ...apiConfig, ...config },
        params: params,
      });
    };
  }
}

