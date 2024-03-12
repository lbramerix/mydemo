<template>
  <nav>
    <div class="logo"><img src="../assets/img/logo.png" style="zoom: 60%;margin-right: 20px;"></div>
    <div class="el-menu-item" :class="{ 'selected': selectedMenu === '/yuejuan/exam' }"
      @click="handleMenuClick('/yuejuan/exam')">考试管理</div>
    <div class="el-menu-item" :class="{ 'selected': selectedMenu === '/yuejuan/answersheet' }"
      @click="handleMenuClick('/yuejuan/answersheet')">答题卡管理</div>
    <div class="el-menu-item" :class="{ 'selected': selectedMenu === '/yuejuan/teacher' }"
      @click="handleMenuClick('/yuejuan/teacher')">教师阅卷</div>
    <div class="el-menu-item" :class="{ 'selected': selectedMenu === '/yuejuan/analysis' }"
      @click="handleMenuClick('/yuejuan/analysis')">学业分析</div>
    <div class="el-menu-item" :class="{ 'selected': selectedMenu === '/yuejuan/questionbank' }"
      @click="handleMenuClick('/yuejuan/questionbank')">题库组卷</div>
    <div style="margin-left: auto;margin-right: 300px;flex-direction: column; display: flex;justify-content: flex-end;">
      <span style="font-weight: bold;align-self: flex-end;" @click="personal()">
        {{teacherName}}
      </span>
      <el-dropdown :hide-on-click="false" style="margin-top: 5px;" @command="handleCommand">
        <span class="el-dropdown-link" style="font-size: 12px;color: gray;">
          {{ selectedText }}<el-icon class="el-icon--right">
            <CaretBottom />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="1">长春市第一高级中学</el-dropdown-item>
            <el-dropdown-item command="2">鹿岭2高</el-dropdown-item>
            <el-dropdown-item command="3">鹿岭3高</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </nav>
  <div class="highlight"></div> <!-- 在导航栏下面添加一条蓝色线 -->
</template>

<script>
import router from '@/router/index'; // 引入 Vue Router 实例
import { ArrowDown } from '@element-plus/icons-vue'
import store from '../store/index.js';

export default {
  data() {
    return {
      teacherName:'',
      selectedMenu: '',
      selectedText: '长春市第一高级中学'
    };
  },
  created() {
    this.teacherName = store.state.name;
    switch (router.currentRoute.value.path) {
      case '/yuejuan/teacher':
        this.selectedMenu = '/yuejuan/teacher';
        break;
      case '/yuejuan/exam':
      case '/index':
        this.selectedMenu = '/yuejuan/exam';
        router.push({ path: '/yuejuan/exam' });
        break;
      case '/yuejuan/answersheet':
        this.selectedMenu = '/yuejuan/answersheet';
        break;
      case '/yuejuan/analysis':
        this.selectedMenu = '/yuejuan/analysis';
        break;
      case '/yuejuan/questionbank':
        this.selectedMenu = '/yuejuan/questionbank';
        break;
      default:
        break;

    }
  },
  methods: {
    handleMenuClick(menu) {
      this.selectedMenu = menu; // 更新选中的菜单项
      router.push({ path: menu }); // 执行路由跳转

    },
    handleCommand(command) {
      console.log('Selected command:', command); // 添加这行调试输出语句
      if (command === '1') {
        this.selectedText = '长春市第一高级中学';
      } else if (command === '2') {
        this.selectedText = '鹿岭2高';
      } else if (command === '3') {
        this.selectedText = '鹿岭3高';
      }
    },
    personal(){
      router.push({ path: '/personal' }); // 执行路由跳转
    }
  }
};
</script>

<style lang="css">
nav {
  display: flex;
  margin-left: 300px;
  margin-top: 20px;
  align-items: center;
  justify-content: flex-start;
  /* 将内容靠左对齐 */
  position: relative;
  /* 父元素设置为相对定位 */
}

nav .el-menu-item {
  color: #000000;
  padding: 15px;
  font-size: 24px;
  position: relative;
  text-align: center;
  border-bottom: transparent;
  display: flex;
  transition: 0.4s;
  margin-left: 20px;
  margin-right: 20px;
  font-size: smaller;
  /* 改为 smaller 或根据需要调整大小 */
}

nav .el-menu-item.selected {
  background-color: rgb(255, 255, 255);
  border-bottom: solid 3px;
  color: #1c8bf0;
  border-bottom-color: #1c8bf0;
}

nav .el-menu-item:hover {
  background-color: rgb(255, 255, 255);
  border-bottom: solid 3px;
  color: #1c8bf0;
  border-bottom-color: #1c8bf0;
}

.highlight {
  height: 1px;
  background-color: #1c8bf0;
  width: 100%;
}

.example-showcase .el-dropdown+.el-dropdown {
  margin-left: 15px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
