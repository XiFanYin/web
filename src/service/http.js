import services from './service'
import axioscopy from 'axios'

//做一些全局配置
let axios = axioscopy.create({
    // baseURL: "http://192.168.1.136:8088/weixin"
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
        return Promise.reject(error)
    }
)


//响应拦截器
axios.interceptors.response.use(
    // 请求成功
    res => {
        console.log("响应成功")
        return res
    },
    // 请求失败
    error => {
        console.log("响应失败")
        return Promise.reject(error.response.data)
    }
)




//请求格式和参数的统一
Object.keys(services).forEach(service => {
    service = services[service]
    //请求格式和参数的统一
    for (let key in service) {
        let api = service[key] //url 和methed
        http[key] = async function (params, isFormData = false, config = {}) {
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
                    return Promise.reject(err)
                }
            } else if (api.method === "delete" || api.method === "get") {
                config.params = newParams
                try {
                    response = await axios[api.method](api.url, config)
                } catch (err) {
                    return Promise.reject(err.data)
                }
            }
            return response
        }

    }

})







export default http