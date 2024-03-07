<template>
	<div class="login-wrap">
		<div class="top">
			<p class="title">学业大数据采集和分析平台</p>
			<el-button type="primary" class="login_button" @click="dialogFormVisible = true">登录</el-button>
		</div>
		<div class="middle">
			<div class="leftmiddle">
				<img src="~@/assets/img/webtext.png" alt=""
					style="padding-left: 27px;zoom: 0.8;display: block;padding-top: 150px;padding-bottom: 10px;">
				<p class="content">让大数据助力教育精细化管理，服务精准教学</p>
				<p class="content">促进区域教育均衡发展，推动教育质量提升</p>
			</div>
			<div class="rightmiddle">
				<img src="~@/assets/img/webimg.png" alt="">
			</div>
			<div class="dialog-container z-999">
				<el-dialog title="" v-model="dialogFormVisible" :close-on-click-modal="false" class="dialog" width="20%"
					:top="'18%'" center :lock-scroll="false">
					<div
						style="text-align: center; display: flex; align-items: center; justify-content: center; margin-top: 20px; margin-bottom: 20px;font-size: 20px;">
						<span style="font-weight: bold;">学业大数据采集与分析平台</span>
					</div>
					<el-form v-model="userData" style="text-align: center;margin-left: 20px;margin-right: 20px;">
						<el-form-item label="账号">
							<el-input v-model="userData.username" placeholder="请输入账号"></el-input>
						</el-form-item>
						<el-form-item label="密码">
							<el-input v-model="userData.password" type="password" placeholder="请输入密码"
								show-password></el-input>
						</el-form-item>
					</el-form>
					<div class="dialog-footer" style="text-align: center;">
						<el-button @click="dialogFormVisible = false;">取 消</el-button>
						<el-button type="primary" @click="onLogin" style="margin-left: 12px;">登 录</el-button>
					</div>
				</el-dialog>
			</div>
		</div>

		<div class="bottom">
			<div class="leftbottom">
				<div class="test-shadow">
					<img src="~@/assets/img/webpic4.png" alt="" style="display: block;height: 150px;width: 210px;">
					<p
						style="font-size: 28px;text-align: center;color: #000000;font-family: start;font-weight: bold;margin-top: 40px;">
						云阅卷</p>
					<p style="font-size: 16px;line-height: 22px;text-align: center;color: #999;margin-top: 10px;">
						学业大数据采集工具
					</p>
				</div>
			</div>
			<div class="middlebottom">
				<div class="test-shadow">
					<img src="~@/assets/img/webpic6.png" alt="" style="display: block;height: 150px;width: 210px;">
					<p
						style="font-size: 28px;text-align: center;color: #000000;font-family: start;font-weight: bold;margin-top: 40px;">
						精准作业</p>
					<p style="font-size: 16px;line-height: 22px;text-align: center;color: #999;margin-top: 10px;">
						作业布置监管平台
					</p>

				</div>
			</div>
			<div class="rightbottom">
				<div class="test-shadow">
					<img src="~@/assets/img/webpic3.png" alt="" style="display: block;height: 150px;width: 210px;">
					<p
						style="font-size: 28px;text-align: center;color: #141414;font-family: start;font-weight: bold;margin-top: 40px;">
						质量平台</p>
					<p style="font-size: 16px;line-height: 22px;text-align: center;color: #999;margin-top: 10px;">
						学业数据分析管理平台
					</p>
				</div>
			</div>
		</div>

	</div>
</template>

<script setup>
import { computed, ref, watch, reactive } from 'vue';
let logining = ref(false);
let dialogFormVisible = ref(false);
import useUserStore from "../store/user"

const userData = reactive({
	username: '',
	password: '',
})

// 实例化 store
const userStore = useUserStore()

const onLogin = async () => {
	// 使用 actions，当作函数一样直接调用
	// login action 定义为了 async 函数，所以它返回一个 Promise
	await userStore.login(userData)
	userData.username = ''
	userData.password = ''
}
const onLogout = () => {
  userStore.logout()
}
function submitForm(form) {
	// 测试通道，不为空直接登录
	if (form.username && form.password) {  }
	else { alert('请输入账号和密码') }
}
</script>

<style scoped>
.dialog-container {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.login-wrap {
	padding-left: 15%;
	padding-right: 15%;
	height: 100%;
	background-image: url(~@/assets/img/bg.png);
}

.top {
	margin: 0px auto;
	height: 75px;
	text-align: left;
	display: flex;
	justify-content: space-between;
	padding: 15px 35px 10px 35px;
	align-items: center;
}

.middle {
	display: flex;
	/* 使用 Flex 布局 */
}

.title {
	float: left;
	font-size: 20px;
	font-weight: bold;
	color: #1c8bf0;
}

.content {
	float: left;
	margin-left: 25px;
	font-size: 20px;
	font-weight: bold;
	color: #1c8bf0;
	margin-top: 10px;
	/* 设置上边距 */
	margin-bottom: 10px;
	/* 设置下边距 */
	white-space: nowrap;
}

.login_button {
	float: right;
	width: 100px;
}

.leftmiddle {
	display: flex;
	text-align: left;
	margin: 0px auto;
	padding: 15px 35px 10px 35px;
	height: 300px;
	padding-left: 15px;
	display: inline-block;
	flex: 1;
}

.rightmiddle {
	height: 300px;
	display: inline-block;
	flex: 1;
}

.bottom {
	padding-top: 50px;
	padding-left: 200px;
	padding-right: 200px;
	justify-content: center;
	display: inline-block;
	display: flex;
}

.leftbottom,
.middlebottom,
.rightbottom {
	flex: 1;
	justify-content: center;
	align-items: center;
	display: flex;
	/* 让三个子元素平分父容器的宽度 */
}

.test-shadow {
	background-color: rgb(255, 255, 255);
	width: 210px;
	height: 300px;
	margin-top: 30px;
	justify-content: center;
	align-items: center;
}

.test-shadow:hover {
	margin-top: 30px;
	/*和hover的margin-top有对比，原无30,现在0，相当于上移了,30px*/
	box-shadow: 0 0 20px 1px #918f8f;
	/*盒子阴影*/
	transition: all 0.5s;
	/*持续时间*/
}

.container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}

.dialog {
	width: 200px;
	text-align: center;
}
</style>