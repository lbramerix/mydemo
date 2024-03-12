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
    <el-button type="primary" @click="saveUserInfo" class="save-btn">保存</el-button>
  </div>
</template>

<script setup>
import store from '../../store/index.js';
let userInfo = reactive({
  username: '', // 假设当前用户的用户名
  name: '', // 假设当前用户的姓名
  age: 30, // 假设当前用户的年龄
  job: '工程师' // 假设当前用户的工作
})
userInfo.username = store.state.username;
userInfo.name = store.state.name;
function saveUserInfo() {
  // 保存用户信息
  saveUserInfoToServer(userInfo).then(response => {
    if (response.status === 200) {
      this.$message.success('保存成功');
      // 如果保存成功，可以进行其他操作，比如更新用户信息到 Vuex 等
    } else {
      this.$message.error('保存失败');
    }
  });
}
function saveUserInfoToServer(userInfo) {
  // 假设这里是向后端提交保存用户信息的异步请求
  // 返回一个 Promise 对象
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
