# http-schema

http-schema 的目的是为了更好的定义接口的静态配置. 它的实现和具体的请求库(比如用 axios 或者 fetch)无关, 借助 typescript 的类型推导和一点点函数式思想,为开发提供良好的类型提示

## 造这个轮子的目的?

前端经常需要和不同的后端服务对接,每个服务都会给前端暴露一些 API,这些 api 都有不同的路径,并且约定好了前端需要传哪些参数以及正常情况下 api 的返回类型. 这一部分信息是每个 api 的静态信息,一旦确定后基本不会在变更.

另外不同的服务(比如不同的 host),他们的授权形式可能不同(有的需要在 requestHeader 里面带 token,有的需要在 url 上面带 token).这部分信息和业务以及代码的上下文关系更大,因此一般不建议作为配置.另外我们可能会用到 axios 的拦截器之类的功能对 不同的 api 做统一的拦截,这部分也是偏业务的逻辑,也不适合静态配置.

http-schema 的作用就是把 api 的静态信息提前定义好, 并且提供一个 setFactory 方法方便设置附加的额外业务动态信息.

## 基本使用方式

安装:

```
yarn add @tomyail/http-schema
```

```typescript

import { HttpSchema } from '@tomyail/http-schema'
// 假设我们有两个不同的服务A 和 B, A 服务主要关注用户信息,B 服务主要关注内容信息

//////////////以下代码先定义 api 的静态信息////////////////////////////////////////////////////
// api 定义层
const serviceA = new HttpSchema();

//获取用户信息
const getUser = serviceA.define<
  { id: string },
  { name: string },
  AxiosRequestConfig
>({ url: '/api/user/{id}' });

const updateUser = serviceA.define<
  { id: string; data: { avatar: FormData; name: string } },
  { success: boolean },
  AxiosRequestConfig
>({ url: '/api/user/{id}', method: 'POST' });

const serviceB = new HttpSchema();

const getBook = serviceA.define<
  { id: string },
  { title: string },
  AxiosRequestConfig
>({ url: '/api/book/{id}' });

//在订好了数据接口后,前端就可以基于 ts 定义的返回类型先 mock 数据了...

//////////////以下代码配置 api 的公共信息////////////////////////////////////////////////////
serviceB.setFactory((input) => {
  const ins = Axios.create();

  const config: AxiosRequestConfig = {
    ...input.config,
    params: input.params,
    baseURL: 'https://serverB-domain.com',
    //设置 b 复制的 token
    headers: {
      token: 'xxx',
    },
  };
  //加各种插件
  ins.interceptors.response.use((resp) => {
    return resp.data;
  });
  return ins.request(config);
});

serviceA.setFactory((input) => {
  const ins = Axios.create();

  const config: AxiosRequestConfig = {
    ...input.config,
    //设置 a 复制的 token
    params: { ...input.params, token: 'xxx' },
    baseURL: 'https://serverA-domain.com',
  };
  //加各种插件
  ins.interceptors.response.use((resp) => {
    return resp.data;
  });
  return ins.request(config);
});

//////////////以下代码是业务,组件的调用形式////////////////////////////////////////////////////

getUser({ user: '1' }).then((res) => res.type);

const avatar = new FormData();
avatar.append('foo', 'bar');
updateUser({ name: '2', user: '1', data: { avatar } }).then(
  (res) => res.success
);
```
