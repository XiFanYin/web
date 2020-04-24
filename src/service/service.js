//模块一接口
const service1 = {
    login: {
        method: "post",
        url: "/admin/auth/loginSubmit"
    },

    getMenus: {
        method: "get",
        url: "/admin/menu/getMenuList"
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