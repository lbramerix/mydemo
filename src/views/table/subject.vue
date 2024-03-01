<template>
    <el-table :data="tableData" style="width: 100%"
        :header-cell-style="{ background: '#eef1f6', color: '#000000', 'text-align': 'center' }" :header-border="true" border>
        <el-table-column prop="name" label="题目名称" width="140" align="left"></el-table-column>
        <el-table-column prop="score" label="分值" width="90" align="center"></el-table-column>
        <el-table-column label="整体：已阅量/阅读量" align="center">
            <template v-slot="{ row }">
                <span><span :style="{ color: getTextColor(row.all1, row.all2) }">{{ row.all1 }}</span> / {{ row.all2
                }}</span>
            </template>
        </el-table-column>
        <el-table-column label="个人：已阅量/阅读量" align="center">
            <template v-slot="{ row }">
                <span><span :style="{ color: getTextColor(row.per1, row.per2) }">{{ row.per1 }}</span> / {{ row.per2
                }}</span>
            </template>
        </el-table-column>
        <el-table-column label="抽查被打回(待阅)" align="center">
            <template v-slot="{ row }">
                <span v-if="row.returned === 0">--</span>
                <span v-else @click="redirectToNewPage(row)" :style="{ color: '#1c8bf0', cursor: 'pointer' }">重新给分（<span
                        :style="{ color: 'red' }">{{ row.returned }}</span>）</span>
            </template>
        </el-table-column>
        <el-table-column label="复查" align="center">
            <template v-slot="{ row }">
                <span v-if="row.per1 === 0 || row.all1 == row.all2">--</span>
                <span v-else :style="{ color: '#1c8bf0', cursor: 'pointer' }">复查已阅（{{ row.per1 }}）</span>
            </template>
        </el-table-column>
        <el-table-column label="阅卷" width="180" align="center">
            <template v-slot="{ row }">
                <span v-if="row.per1 === 0" @click="redirectToNewPage(row)">
                    <span :style="{ color: '#1c8bf0', cursor: 'pointer' }">开始阅卷</span>
                </span>
                <span v-else-if="row.all1 === row.all2">
                    <span style="color: black">学校已完成</span>
                </span>
                <span v-else @click="toMark(row)">
                    <span :style="{ color: '#1c8bf0', cursor: 'pointer' }">继续阅卷</span>
                </span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props: {
        tableData: {
            type: Array,
            required: true
        }
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
        },
        toMark(row){
            // const name = decodeURIComponent(row.name); // 解码参数值
            this.$router.push({ path: '/marking/mark' ,query: { name: row.name } });
            console.log('Name1:', row.name);
        }
    },
    computed: {
        isNum1Smaller() {
            return this.num1 < this.num2;
        }
    }
};
</script>

<style scoped>/* 样式 */</style>