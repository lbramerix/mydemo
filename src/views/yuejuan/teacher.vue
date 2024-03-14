<template>
  <div style="background-color: #f2f3f5;height: 100%; min-height: 100vh;margin: 0;padding: 0;">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="Consistency" name="1" v-for="(info, index) in schools" :key="index">
        <div>
          {{info.tag}}
        </div>
      </el-collapse-item>
    </el-collapse>



    <!-- <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item style="padding-top: 30px;margin-left: 300px;margin-right: 300px;" name="1">
        <template v-slot:title>
          <div style="margin-left: 30px;">
            <div class="label">统考</div>
            <span style="display: inline-block;margin-left: 10px;font-size: 16px;font-weight: 700;">上林县中学&城关中学联考</span>
          </div>
        </template>
        <el-collapse v-model="activeNames2" style="margin-left: 30px;margin-right: 30px;">
          <el-collapse-item name="1">
            <template v-slot:title>
              <div>
                <span
                  style="display: inline-block;margin-left: 10px;font-size: 15px;font-weight: 700;display: inline-block;">语文</span>
                <div class="label_grey" style="margin-left: 10px;">试评</div>
                <div style="margin-left: 10px;color: #a8a8a8;display: inline-block;">有效卡/考生数：</div>
                <div style="display: inline-block;">
                  <span :style="{ color: isNum1Smaller ? 'red' : 'black' }">{{ num1 }}</span>/<span>{{ num2 }}</span>人
                </div>
              </div>
            </template>
            <MyTable :table-data="shangchinese"></MyTable>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template v-slot:title>
              <div>
                <span
                  style="display: inline-block;margin-left: 10px;font-size: 15px;font-weight: 700;display: inline-block;">英语</span>
                <div class="label_green" style="margin-left: 10px;">3评</div>
                <div class="label_grey" style="margin-left: 10px;">试评</div>
                <div style="margin-left: 10px;color: #a8a8a8;display: inline-block;">有效卡/考生数：</div>
                <div style="display: inline-block;">
                  <span :style="{ color: isNum1Smaller ? 'red' : 'black' }">{{ num3 }}</span>/<span>{{ num4 }}</span>人
                </div>
              </div>
            </template>
            <MyTable :table-data="shangenglish"></MyTable>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template v-slot:title>
              <div>
                <span
                  style="display: inline-block;margin-left: 10px;font-size: 15px;font-weight: 700;display: inline-block;">文综合</span>
                <div class="label_red" style="margin-left: 10px;">仲裁</div>
                <div class="label_grey" style="margin-left: 10px;">试评</div>
                <div style="margin-left: 10px;color: #a8a8a8;display: inline-block;">有效卡/考生数：</div>
                <div style="display: inline-block;">
                  <span :style="{ color: isNum1Smaller ? 'red' : 'black' }">{{ num3 }}</span>/<span>{{ num4 }}</span>人
                </div>
              </div>
            </template>
            <MyTable :table-data="shangwen"></MyTable>
          </el-collapse-item>
        </el-collapse>
      </el-collapse-item>
    </el-collapse>

    <el-collapse v-model="activeNames3" @change="handleChange">
      <el-collapse-item style="padding-top: 30px;margin-left: 300px;margin-right: 300px;" name="1">
        <template v-slot:title>
          <div style="margin-left: 30px;">
            <div class="label2">学校</div>
            <span
              style="display: inline-block;margin-left: 10px;font-size: 16px;font-weight: 700;">长春市普通高中2023级高一质量监测</span>
          </div>
        </template>
        <el-collapse v-model="activeNames4" style="margin-left: 30px;margin-right: 30px;">
          <el-collapse-item name="1">
            <template v-slot:title>
              <div>
                <span
                  style="display: inline-block;margin-left: 10px;font-size: 15px;font-weight: 700;display: inline-block;">语文</span>
                <div class="label_grey" style="margin-left: 10px;">按班批阅</div>
                <div style="margin-left: 10px;color: #a8a8a8;display: inline-block;">有效卡/考生数：</div>
                <div style="display: inline-block;">
                  <span :style="{ color: isNum1Smaller ? 'red' : 'black' }">{{ num1 }}</span>/<span>{{ num2 }}</span>人
                </div>
              </div>
            </template>
            <MyTable :table-data="schoolchinese"></MyTable>
          </el-collapse-item>
        </el-collapse>
      </el-collapse-item>
    </el-collapse> -->
    <div v-if="schools.length > 0">数据已加载</div>
    <div v-else>暂无数据</div>
  </div>
</template>

<script setup>
import MyTable from '@/views/table/subject.vue';
import '@/assets/css/styles.css';
import { computed, ref, watch, reactive, beforeMounted  } from 'vue';

import axios from 'axios';
let schools = reactive([]);
let subjects = [];
let tags = [];
const displayedNumbers = ref([9, 8, 7, 6, 5, 4, 3, 2, 1]);

beforeMounted(() =>{
  axios.post('/school')
  .then(response => {
    schools = response.data.data.map(item => item);
    console.log(schools)
    const subjectPromises = schools.map(school => axios.post('/subject', { school: school.school }));
    const tagPromise = axios.get('/tag');
    let subjectIndex = 0;
    Promise.all([...subjectPromises, tagPromise])
      .then(responses => {
        /* 获取科目信息的响应*/
        const subjectResponses = responses.slice(0, -1);
        /* 获取标签信息的响应*/
        const tagResponse = responses[responses.length - 1];
        tags = tagResponse.data.data.taginfo;
        subjectResponses.forEach(response => {
          subjects[subjectIndex] = response.data.data;
          subjectIndex++;
        });
      })
      .catch(error => {
        console.error(error);
      });
  })
  .catch(error => {
    console.error(error);
  });})



function handleChange(val) {
  console.log(val);
}
function getTextColor(num1, num2) {
  if (num1 < num2) {
    return 'red';
  }
  return 'black'; // 默认颜色 
}
function isNum1Smaller() {
  return this.num1 < this.num2;
}
</script>

<style scoped>
.el-collapse {
  border: none;
}
</style>
