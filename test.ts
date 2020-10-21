import { AxiosClient } from "./dist";

// x.getUserName()
// x.postInfo()

// x.dingTalkClient.setFactory(() => {

// })



//you api lib
const serviceA = new AxiosClient();
const getUserById = serviceA.request<{
    id: string
}, number>({ url: '/v1' })



// you business logic 
getUserById({ id: "1" }).then(x => x + 2)