<template>
  <div style="background-color: #f2f3f5;height: 100%; min-height: 100vh;margin: 0;padding: 0;">
    <el-collapse v-model="activeNames" @change="handleChange">
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
            <my-table :table-data="shangchinese"></my-table>
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
            <my-table :table-data="shangenglish"></my-table>
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
            <my-table :table-data="shangwen"></my-table>
          </el-collapse-item>
        </el-collapse>
      </el-collapse-item>
    </el-collapse>

    <el-collapse v-model="activeNames3" @change="handleChange">
      <el-collapse-item style="padding-top: 30px;margin-left: 300px;margin-right: 300px;" name="1">
        <template v-slot:title>
          <div style="margin-left: 30px;">
            <div class="label2">学校</div>
            <span style="display: inline-block;margin-left: 10px;font-size: 16px;font-weight: 700;">长春市普通高中2023级高一质量监测</span>
          </div>
        </template>
        <el-collapse v-model="activeNames2" style="margin-left: 30px;margin-right: 30px;">
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
            <my-table :table-data="schoolchinese"></my-table>
          </el-collapse-item>
        </el-collapse>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import MyTable from '@/views/table/subject.vue';
import '@/assets/css/styles.css'; 
export default {
  components: {
    'my-table': MyTable
  },
  data() {
    return {
      shangchinese: [{
        name: "主观题 第6题",
        score: 6,
        all1: 900,
        all2: 1000,
        per1: 60,
        per2: 210,
        returned: 2,
      }, {
        name: "主观题 第8题",
        score: 6,
        all1: 1000,
        all2: 1000,
        per1: 60,
        per2: 60,
        returned: 0,
      }, {
        name: "主观题 第8题",
        score: 6,
        all1: 400,
        all2: 700,
        per1: 0,
        per2: 70,
        returned: 0,
      }],
      shangenglish: [{
        name: "主观题 短文改错",
        score: 10,
        all1: 800,
        all2: 1000,
        per1: 60,
        per2: 100,
        returned: 0,
      }],
      shangwen: [{
        name: "选做题1 43",
        score: 10,
        all1: 500,
        all2: 500,
        per1: 70,
        per2: 70,
        returned: 0,
      },{
        name: "选做题1 44",
        score: 10,
        all1: 400,
        all2: 500,
        per1: 60,
        per2: 70,
        returned: 0,
      }],
      schoolchinese:[{
        name: "主观题13-16",
        score: 10,
        all1: 400,
        all2: 500,
        per1: 60,
        per2: 70,
        returned: 0,
      }],
      activeNames: ['1'],
      activeNames2: ['1', '2','3'],
      activeNames3: ['1'],
      num1: 10,
      num2: 20,
      num3: 900,
      num4: 1000
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    getTextColor(num1, num2) {
      if (num1 < num2) {
        return 'red';
      }
      return 'black'; // 默认颜色 
    }
  },
  computed: {
    isNum1Smaller() {
      return this.num1 < this.num2;
    }
  }
}
</script>

<style scoped>

.el-collapse {
    border: none;
}

</style>
