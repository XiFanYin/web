import services from './service'
import axioscopy from 'axios'
import {
    Message
} from 'element-ui'
//做一些全局配置
let axios = axioscopy.create({
    baseURL: "http://timemeetyou.com:8889/api/private/v1"
})

//所有的请求方法封装
const http = {}

//请求拦截器
axios.interceptors.request.use(
    // 发起请求前
    config => {
        console.log("开始请求")
        return config
    },
    // 请求失败
    error => {
        console.log("发起请求失败")
        return Promise.reject("发起请求失败，请稍后再试~")
    }
)


//响应拦截器
axios.interceptors.response.use(
    res => {
        if (res.data.meta.status != 200) {
            //系统自定义失败
            return Promise.reject(res.data.meta.msg)
        } else {
            // 请求成功
            return res
        }
    },
    // 请求失败
    error => {
        // TODO
        //http错误,一会看看里边的内容
        return Promise.reject(error.response.data)
    }
)




//请求格式和参数的统一
Object.keys(services).forEach(service => {
    service = services[service]
    //请求格式和参数的统一
    for (let key in service) {
        let api = service[key] //url 和methed
        http[key] = async function (params, isFormData = false, nextCatchHandle = false, config = {}) {
            let newParams = {}
            //如果是FormData，把数据放到FormData对象中去
            if (params && isFormData) {
                newParams = new FormData()
                Object.keys(params).forEach(element => {
                    newParams.append(element, params[element])
                });
            } else {
                //如果不是
                newParams = params
            }
            //开始不同请求的判断
            let response = {} //请求的返回值
            if (api.method === "post" || api.method === "put" || api.method === "patch") {
                try {
                    response = await axios[api.method](api.url, newParams, config)
                } catch (err) {
                    if (nextCatchHandle) {
                        return Promise.reject(err)
                    } else {
                        //统一ui处理
                        return Message({
                            showClose: true,
                            message: err,
                            type: 'error'
                          })
                    }
                }
            } else if (api.method === "delete" || api.method === "get") {
                config.params = newParams
                try {
                    response = await axios[api.method](api.url, config)
                } catch (err) {
                    if (nextCatchHandle) {
                        return Promise.reject(err)
                    } else {
                        //统一ui处理
                        return Message({
                            showClose: true,
                            message: err,
                            type: 'error'
                          })
                    }
                }
            }
            return response
        }

    }

})







export default http