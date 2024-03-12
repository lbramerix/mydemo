import Mock from 'mockjs' //导入mockjs
import store from '../store/index.js';

const userList = {  //定义用户数据
    data: {
        total: 6,
        //前两个用户数据分别固定设为管理员和普通用户，为后续权限设置做准备，其他用户随机生成
        userinfo: [{
            username: 'admin',
            password: '123456',
            roles: 'admin',
            name: '张三',
            age: 23,
            job: '管理员',
            token: '000111222333444555666',
            id: '100',
        }, {
            username: 'editor',
            password: '123456',
            roles: 'editor',
            name: '白冰',
            'age|20-30': 23,
            job: '数学老师',
            token: '145145145123123123111',
            id: '101',
        }, {
            username: '@word(3, 5)',
            password: '123456',
            roles: 'editor',
            name: '@cname',
            'age|20-30': 23,
            'job|1': ['数学老师', '语文老师', '英语老师', '物理老师'],
            token: '@guid()',
            id: '102',
        }, ],
        meta: {
            status: 200,
            message: 'success',
        }
    },
};

Mock.mock('/user', 'post', req => { //路径与请求方式
    const { username, password } = JSON.parse(req.body); //将传递进来的数据保存
    for (let i = 0; i < userList.data.userinfo.length; i++) {
        //判断userList中是否存在该用户并且用户密码是否正确
        if (username === userList.data.userinfo[i].username && password === userList.data.userinfo[i].password) {
            return {
                meta: {
                    msg: 'success',
                    status: 200
                },
                user: {
                    username: userList.data.userinfo[i].username,
                    roles: userList.data.userinfo[i].roles,
                    name: userList.data.userinfo[i].name,
                    job: userList.data.userinfo[i].job,
                    age: userList.data.userinfo[i].age
                }
            }
        }
    }
    return {
        meta: {
            msg: 'error',
            status: 201
        }
    }
})
Mock.mock('/updateUserInfo', 'post', req => {
    const { username, name, age, job } = JSON.parse(req.body); // 获取请求中的要更新的用户信息
    console.log(username);

    for (let i = 0; i < userList.data.userinfo.length; i++) {
        if (username === userList.data.userinfo[i].username) {
            userList.data.userinfo[i].name = name;
            userList.data.userinfo[i].age = age;
            userList.data.userinfo[i].job = job;
            store.commit('setName', userList.data.userinfo[i].name);
            store.commit('setAge', userList.data.userinfo[i].age);
            store.commit('setJob', userList.data.userinfo[i].job);
            return {
                meta: {
                    msg: 'success',
                    status: 200,
                }
            }; 
        }
    }
    console.log("nihao");
    return {
        meta: {
            msg: 'error',
            status: 201
        }
    };
});
//定义请求方法与路径
export default {
    'get|/user': userList,
}
