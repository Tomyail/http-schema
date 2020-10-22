const { AxiosClient } = require('./dist');

// x.getUserName()
// x.postInfo()

// x.dingTalkClient.setFactory(() => {

// })

it('', () => {
  //you api lib
  const serviceA = new AxiosClient();
  const getUserById = serviceA.request({ url: '/v1' });

  // you business logic
  getUserById({ id: '1' }).then((x) => x + 2);

  //change factory to pemty, this will case api throw error
  serviceA.setFactory(() => {
    return null;
  });

  expect(()=>getUserById({ id: '1' }).then((x) => x + 2)).toThrow()
  
});
