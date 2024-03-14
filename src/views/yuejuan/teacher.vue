<template>
  <div style="background-color: #f2f3f5;height: 100%; min-height: 100vh;margin: 0;padding: 0;">

    <el-collapse @change="handleChange" v-model="expandedCollapse">
      <el-collapse-item style="padding-top: 30px;margin-left: 300px;margin-right: 300px;" v-for="(school,index) in schools" :key="index" :name="getCollapseItemName(school)">
        <template v-slot:title>
          <div style="margin-left: 30px;">
            <div :class="getClassByTab(school.tab)">{{ school.tab }}</div>
            <span style="display: inline-block;margin-left: 10px;font-size: 16px;font-weight: 700;">{{ school.school }}</span>
          </div>
        </template>
        <el-collapse style="margin-left: 30px;margin-right: 30px;" v-for="(tag, tagIndex) in filteredTags(school.school)" :key="tagIndex" v-model="expandedSubjectCollapse">
          <el-collapse-item :name="getCollapseSubjectName(school,tag)">
            <template v-slot:title>
              <div>
                <span
                    style="display: inline-block;margin-left: 10px;font-size: 15px;font-weight: 700;display: inline-block;">{{ tag.subject }}</span>
                <div :class="getTagClass(label)" style="margin-left: 10px;" v-for="label in tag.tag.split(' ')">{{ label }}</div>

                <div style="margin-left: 10px;color: #a8a8a8;display: inline-block;">有效卡/考生数：</div>
                <div style="display: inline-block;">
                  <span :style="{ color: isNum1Smaller ? 'red' : 'black' }">{{ tag.participantsNumber }}</span>/<span>{{ tag.allNumber }}</span>人
                </div>
              </div>
            </template>
            <MyTable :table-data="getTableData(school.school, tag.subject)"></MyTable>
          </el-collapse-item>
        </el-collapse>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import MyTable from '@/views/table/subject.vue';
import '@/assets/css/styles.css';
import { computed, ref, watch, reactive, onBeforeMount  } from 'vue';

import axios from 'axios';
let schools = ref([]);
let subjects = ref([]);
let tags =  ref([]);
let expandedCollapse = ref([]);
let expandedSubjectCollapse = ref([]);
onBeforeMount(async () => {
  try {
    const responseSchool = await axios.post('/school');
    schools.value = responseSchool.data.data.map(item => item);
    const subjectPromise = axios.get('/subject');
    const tagPromise = axios.get('/tag');
    const responses = await Promise.all([subjectPromise, tagPromise]);
    const [subjectResponse, tagResponse] = responses;
    tags.value = tagResponse.data.data.taginfo.map(item => item);
    subjects.value = subjectResponse.data.data.subjectinfo.map(item => item);
    // 将所有 el-collapse 的名称添加到 expandedSubjectCollapse 数组中
    for (const subject of subjects.value) {
      expandedSubjectCollapse.value.push(subject.school + '-' + subject.subject);
    }
    for(const school of schools.value){
      expandedCollapse.value.push(school.school);
    }
    console.log(expandedCollapse)
  } catch (error) {
    console.error(error);
  }

});

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
const getClassByTab = (tab) => {
  return tab === '统考' ? 'label' : tab === '学校' ? 'label2' : '';
};
const filteredTags = (schoolName) => {
  const filtered = [];
  for (let i = 0; i < tags.value.length; i++) {

    if (tags.value[i].school === schoolName) {
      filtered.push(tags.value[i]);
    }
  }
  return filtered;
};
const getTagClass = (tag) => {
  if (tag === '3评') {
    return 'label_green ';
  } else if (tag === '仲裁') {
    return 'label_red ';
  }else  {
    return 'label_grey ';
  }
};
const getTableData = (school, subject) => {
  const filtered = [];
  for (let i = 0; i < subjects.value.length; i++) {
    if (subjects.value[i].school === school && subjects.value[i].subject === subject) {
      filtered.push(subjects.value[i]);
    }
  }
  return filtered;
};
function getCollapseItemName(school) {
  return `${school.school}`; // 拼接唯一的名称
}
function getCollapseSubjectName(school,tag) {
  return `${school.school}-${tag.subject}`; // 拼接唯一的名称
}
</script>

<style scoped>
.el-collapse {
  border: none;
}
</style>
