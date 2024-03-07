import axios from 'axios'
import { defineStore } from 'pinia'

// 创建 store
const useUserStore = defineStore('user', {
    // 定义状态：一个函数，返回一个对象
    state: () => ({
        username: '',
        token: ''
    }),

    // 定义 getters
    getters: {
        hello: state => 'Hello!' + state.username
    },

    actions: {
        // 异步 action
        async login(userData) {
            console.log("21");
            const result = await axios.post('/api/user/login', userData)
            console.log(result);
            const { data, code } = result.data
            if (code === 0) {
                // action 中修改状态
                this.username = data.username
                this.token = data.token
            }
        },

        // 同步 action
        logout() {
            this.token = ''
            this.username = ''
        }
    }
})

export default useUserStore