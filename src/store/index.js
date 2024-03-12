import Vue from 'vue'
import Vuex from 'vuex'


export default new Vuex.Store({
    state: {
        id: sessionStorage.getItem('id') , 
        username: sessionStorage.getItem('username') ,
        name: sessionStorage.getItem('name') ,
        age: sessionStorage.getItem('age') , 
        job: sessionStorage.getItem('job') , 


    },
    getters: {
        id: (state) => state.id,
        username: (state) => state.username,
        name: (state) => state.name,
        age: (state) => state.age,
        job: (state) => state.job,
    },
    mutations: {
        setId: (state, id) => {
            state.id = id;
            sessionStorage.setItem('id', id);
        },
        setUsername: (state, username) => {
            state.username = username;
            sessionStorage.setItem('username', username);
        },
        setName: (state, name) => {
            state.name = name;
            sessionStorage.setItem('name', name);
        },
        setAge: (state, age) => {
            state.age = age;
            sessionStorage.setItem('age', age);
        },
        setJob: (state, job) => {
            state.job = job;
            sessionStorage.setItem('job', job);
        },
    },
})


