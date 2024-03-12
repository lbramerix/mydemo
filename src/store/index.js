import Vue from 'vue'
import Vuex from 'vuex'


export default new Vuex.Store({
    state: {
        id: localStorage.getItem('id') , // 从localStorage获取ID
        username: localStorage.getItem('username') , // 从localStorage获取用户名
        name: localStorage.getItem('name') , // 从localStorage获取真实姓名

    },
    getters: {
        id: (state) => state.id,
        username: (state) => state.username,
        name: (state) => state.name,
    },
    mutations: {
        setId: (state, id) => {
            state.id = id;
            localStorage.setItem('id', id);
        },
        setUsername: (state, username) => {
            state.username = username;
            localStorage.setItem('username', username);
        },
        setName: (state, name) => {
            state.name = name;
            localStorage.setItem('name', name);
        },
    },
})


