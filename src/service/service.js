//模块一接口
const service1 = {
    login: {
        method: "post",
        url: "/login"
    },

    getMenus: {
        method: "get",
        url: "/menus"
    },
    getUsers: {
        method: "get",
        url: "/users"
    },
    putUsersState:{
        method: "put",
        url:null   
    },
    addUser:{
        method: "post",
        url: "/users"
    }
   

     

}
//模块二接口
const service2 = {


}


export default {
    service1,
    service2
}