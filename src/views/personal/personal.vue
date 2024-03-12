<template>
  <div class="container">
    <el-form :model="userInfo" label-width="100px" class="form-container">
      <el-form-item label="用户名">
        <el-input v-model="userInfo.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="userInfo.name" placeholder="请输入姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="userInfo.age" placeholder="请输入年龄" clearable></el-input>
      </el-form-item>
      <el-form-item label="工作">
        <el-input v-model="userInfo.job" placeholder="请输入工作" clearable></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="saveUserInfoToServer(userInfo)" class="save-btn">保存</el-button>
  </div>
</template>

<script setup>
import { computed, ref, watch, reactive } from 'vue';
import store from '../../store/index.js';
import axios from 'axios';
import { ElMessage } from 'element-plus'

let userInfo = reactive({
  username: '',
  name: '', 
  age: '', 
  job: '' 
})
userInfo.username = store.state.username;
userInfo.name = store.state.name;
userInfo.age = store.state.age;
userInfo.job = store.state.job;
// 监听 store.state 中的用户信息变化
watch(() => store.state, (newState) => {
  userInfo.username = newState.username;
  userInfo.name = newState.name;
});

function saveUserInfoToServer(userInfo) {
  return axios.post('/updateUserInfo', userInfo)
    .then(response => {
      console.log(response)
      if (response.data.meta.status == 200) {
      ElMessage({
        message: '保存成功',
        type: 'success',
      })
    } else {
      ElMessage.error('保存失败')
    }
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  display: flex;
}

.form-container {
  width: 300px;
}

.save-btn {
  margin-top: 20px;
}
</style>
