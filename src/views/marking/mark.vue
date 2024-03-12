<template>
    <div>
        <div style="height: 50px;background-color: #2C3E50;border-radius: 0;display: flex; align-items: center;">
            <el-icon style="color: white;margin-left: 20px;font-weight: bold;" @click="goBack">
                <Back />
            </el-icon>
            <el-breadcrumb separator="/" style="margin-left: 10px;">
                <el-breadcrumb-item :to="{ path: '/yuejuan/teacher' }"
                    class="breadcrumb-item">上林县中学&城关中学联考</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/yuejuan/teacher' }" class="breadcrumb-item">语文</el-breadcrumb-item>
                <el-breadcrumb-item class="breadcrumb-mark">正在批阅：{{ markName }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div style="display: flex;justify-content: flex-end;margin-right: 10px;margin-left: auto;">
                <el-icon style="color: white;">
                    <Avatar />
                </el-icon>
                <p style="color: white;font-size: 14px;margin-left: 5px;">阅卷教师：{{ teacher }}</p>
            </div>
        </div>
        <div style="height: 50px;background-color: #fafafa;display: flex; align-items: center;">
            <div style="margin-left: 20px; display: flex; align-items: center;">
                <el-icon style="color: #4E91FF; font-weight: bold;">
                    <Tickets />
                </el-icon>
                <span style="margin-left: 5px; line-height: 24px;">标准答案</span>
            </div>

            <div style="margin-left: 20px; display: flex; align-items: center;" @click="changeIcon">
                <el-icon style="color: #4E91FF; font-weight: 1200;">
                    <template v-if="isFlag">
                        <Flag />
                    </template>

                    <template v-else>
                        <CollectionTag />
                    </template>
                </el-icon>
                <span style="margin-left: 5px; line-height: 24px;">{{ flagText.name }}</span>
            </div>

            <div style="margin-left: 20px; display: flex; align-items: center;">
                <div><img src="../../assets/img/icon_alarm.png" style="height: 18px; vertical-align: middle;"></div>
                <span style="margin-left: 5px; line-height: 24px;">异常报警</span>
            </div>

            <div style="margin-left: 20px; display: flex; align-items: center;">
                <div><img src="../../assets/img/icon_returnquestion.png" style="height: 20px; vertical-align: middle;">
                </div>
                <span style="margin-left: 5px; line-height: 24px;">回评</span>
            </div>

            <div @click="enlargeImage"><img src="../../assets/img/icon_large.png"
                    style="height: 24px; vertical-align: middle; margin-left: 20px;"></div>

            <div @click="reduceImage"><img src="../../assets/img/icon_small.png"
                    style="height: 24px; vertical-align: middle; margin-left: 20px;"></div>

            <div style="margin-left: 20px;">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        {{ scaleRatio }}%
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="scaleRatio = 100">100%</el-dropdown-item>
                            <el-dropdown-item @click="scaleRatio = 80">80%</el-dropdown-item>
                            <el-dropdown-item @click="scaleRatio = 60">60%</el-dropdown-item>
                            <el-dropdown-item @click="scaleRatio = 40">40%</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>


        </div>
        <div
            style="background-color: #f2f3f5;height: 100%; min-height: calc(100vh - 100px);margin: 0;padding: 0;overflow: hidden;display: flex;flex-direction: row;position: relative;">
            <div style="display: flex; align-items: flex-start; justify-content: flex-start;margin-top: 0px;">
                <img src="../../assets/img/paper.jpg"
                    :style="{ marginLeft: '50px', transform: 'scale(' + scaleRatio / 100 + ')', transformOrigin: 'top left' }">
            </div>
            <Draggable>
                <div style="margin-left: 20px;margin-top: 10px;">
                    <Mykeyboard></Mykeyboard>
                </div>
            </Draggable>

            <div ref="el" p="x-4 y-2" border="~ gray-800/30 rounded" shadow="~ hover:lg"
                class="fixed bg-$vp-c-bg select-none cursor-move z-31" style="touch-action:none;" :style="style">
                👋 Drag me!
                <div class="text-sm opacity-50">
                    I am at {{ Math.round(x) }}, {{ Math.round(y) }}
                </div>
            </div>

        </div>
        <div class="z-9999 bottom-0 left-0 absolute;" style="background-color: #f2f3f5;">
            <el-affix position="bottom" :offset="0">
                <el-button v-if="!isEditOpen" @click="toggleSidebar">编辑栏</el-button>
                <div :class="{ 'sidebar-open': isOpen }" class="sidebar">

                    <el-card style="width: 480px" shadow="always">
                        <span>T</span>
                        <el-divider direction="vertical" />
                        <span>清空</span>
                        <el-button @click="closeSidebar">收起</el-button>
                    </el-card>
                </div>
            </el-affix>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch, reactive } from 'vue';
import Mykeyboard from '@/views/marking/keyboard.vue';
import { useDraggable } from '@vueuse/core'
import { isClient } from '@vueuse/shared'
import { useRoute } from 'vue-router';
const route = useRoute()
let markName = route.query.name;
let teacher = '11班老师';
let isFlag = ref(false);

let flagText = reactive({ name: '标记试题' })
let scaleRatio = ref(100);
let isOpen = ref(false);
let isEditOpen = ref(false);

const el = ref<HTMLElement | null>(null)
const handle = ref<HTMLElement | null>(null)

const innerWidth = isClient ? window.innerWidth : 200

const disabled = ref(false)
const { x, y, style } = useDraggable(el, {
    initialValue: { x: innerWidth / 4.2, y: 80 },
    preventDefault: true,
    disabled,
})

function goBack() {
    route.go(-1);
}
function changeIcon() {
    isFlag.value = !isFlag.value; // 切换Flag图标状态
    flagText.name = isFlag.value ? '已标记试题' : '标记试题'; // 根据状态切换文字内容
}
function enlargeImage() {
    if (scaleRatio.value < 200) {
        scaleRatio.value += 10;
    }
}
function reduceImage() {
    if (scaleRatio.value > 50) {
        scaleRatio.value -= 10;
    }
}
function toggleSidebar() {
    isOpen.value = !isOpen.value;
    isEditOpen.value = true;
}
function closeSidebar() {
    if (isOpen.value) {
        isOpen.value = false;
        isEditOpen.value = false;
    }
}
</script>


<style>
.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

.breadcrumb-item .el-breadcrumb__inner {
    font-size: 14px !important;
    color: white !important;
}

.breadcrumb-link {
    color: white;
}

.breadcrumb-mark .el-breadcrumb__inner {
    color: #fc9105 !important;
}

.draggable-box {
    background-color: bisque;
    position: relative;
    border: 1px solid #333;
    width: 500px;
    height: 500px;
}

.draggable-item {
    background-color: aqua;
    position: absolute;
    width: 50px;
    height: 50px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 480px;
}

.sidebar {
    width: 0;
    overflow: hidden;
    /* transition: width 0.3s; */
    /* 添加过渡效果 */
}

.sidebar-open {
    width: 200px;
    /* 设置侧边栏的宽度 */
}

.demo-radius .radius {
    height: 40px;
    width: 70%;
    border: 1px solid var(--el-border-color);
    border-radius: 0;
    margin-top: 20px;
}
</style>
