import Mock from 'mockjs'

let userInfo = null; // 用于存储用户个人信息的变量

// 模拟登录接口
Mock.mock('/login', 'post', (req) => {
    const { username, password } = JSON.parse(req.body)
    // 这里可以根据具体的逻辑进行登录验证
    // 如果验证通过，返回登录成功的数据；如果验证失败，返回登录失败的数据
    if (username === '1' && password === '12345') {
        userInfo = {
            username: username,
            name: '白冰',
            email: 'mockuser@example.com',
            age: 25
        };
        return {
            code: 200,
            message: '登录成功',
            token: 'mocktoken',
            userInfo: userInfo
        }
    } else {
        return {
            code: 400,
            message: '用户名或密码错误'
        }
    }
})

// 模拟修改个人信息接口
Mock.mock('/updateUserInfo', 'post', (req) => {
    const data = JSON.parse(req.body);
    if (userInfo) {
        userInfo.email = data.email;
        userInfo.age = data.age;
        return {
            code: 200,
            message: '个人信息修改成功',
            userInfo: userInfo
        }
    } else {
        return {
            code: 400,
            message: '用户未登录'
        }
    }
})
