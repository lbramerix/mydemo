const Mock = require('mockjs')

export default [
    // 用户登录
    {
        // 请求地址
        url: "/api/user/login",
        // 请求方法
        method: "post",
        // 响应数据
        response: () => {
            return {
                code: 0,
                message: 'success',
                data: {
                    token: "Token",
                    username: "Kathy",
                    account: "admin",
                    password: "12345"
                }
            }
        }
    }
]

// Mock.mock('/api/user/login', 'get', {
//     code: 200,
//     data: {
//         token: "Token",
//         username: "Kathy",
//         account: "admin",
//         password: "12345"
//     },
//   });