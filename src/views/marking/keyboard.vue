<template>
    <el-card style="width: 390px;">
        <template #header>
            <div class="card-header">

            </div>
        </template>
        <div class="wrapper">
            <el-input placeholder="请给分" @click="isInputChoose = true" v-model="number" class="box kput"
                :value="score.name"></el-input>

            <div class="numberContainer ">
                <el-button v-for="num in displayedNumbers" :key="num" class="box" :data-id="num">{{ num }}</el-button>
            </div>
            <el-button class="box k0" data-id='0'>0</el-button>
            <el-button class="box kb" style="margin-left: 0px;" data-id='.'>.</el-button>
            <el-button class="box kdelete" style="margin-left: 0px;" data-id='D'>删除</el-button>
            <el-button class="kfill" type="success" plain style="height: auto;margin-left: 0px;">满分</el-button>
            <el-button class="ksubmit" type="primary" style="width: auto;margin-left: 0px;height: auto;"
                data-id='S'>给分</el-button>
        </div>
    </el-card>
</template>

<script setup>
import { computed, ref, watch, reactive } from 'vue';
import { useActiveElement  } from '@vueuse/core'

const activeElement = useActiveElement()
let score = reactive({ name: '' })
const displayedNumbers = ref([9, 8, 7, 6, 5, 4, 3, 2, 1]);

watch(activeElement, (el) => {
    switch (String(el.dataset.id)) {
        case '.':
            _handleDecimalPoint();
            el.blur();
            break;
        case 'D':
            _handleDeleteKey();
            el.blur();
            break;
        case 'S':
            _handleConfirmKey();
            el.blur();
            break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            _handleNumberKey(el.dataset.id);
            el.blur();
            break;
        default:
            break;
    }
})
function _handleDecimalPoint() {
    if (score.name.indexOf('.') > -1) return false;
    if (!score.name.length)
        score.name = '0.';
    else
        score.name = score.name + '.';

}
function _handleDeleteKey() {
    let S = score.name;
    if (!S.length) return false;
    score.name = S.substring(0, S.length - 1);

}
function _handleClearKey() {
    score.name = '';
}
function _handleNumberKey(num) {
    let S = score.name.toString();
    if (S.indexOf('.') > -1 && S.substring(S.indexOf('.') + 1).length < 2)
        score.name = S + num;
    if (!(S.indexOf('.') > -1)) {
        if (num == 0 && S.length == 0)
            score.name = '0.';

        else {
            if (S.length && Number(S.charAt(0)) === 0) return;
            score.name = S + num;
        }

    }
    const inputElement = document.querySelector('.kput input');
    if (inputElement) {
        inputElement.blur();
    }
}
function _handleConfirmKey() {
    let S = score.name;
    if (!S.length) {
        alert('您目前未输入!')
        return false;
    }
    if (S.indexOf('.') > -1 && S.indexOf('.') == (S.length - 1))
        S = Number(S.substring(0, S.length - 1)).toFixed(2);
    S = Number(S).toFixed(2);
}
</script>

<style>
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 20%);
    grid-template-rows: repeat(4, 30%);
}


.grid-item button {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    color: rgb(5, 5, 5);
    font-size: 30px;
    font-weight: bold;
    transition: background-color 0.3s;
}

.grid-item button:active {
    background-color: #c9c9c9;
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
    width: 300px;
}

.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.wrapper {
    display: grid;
    grid-template-columns: 80px 5px 80px 5px 80px 5px 80px;
    grid-template-rows: 40px 10px 40px 10px 40px 10px 40px 10px 40px 10px 40px
}

.box {
    margin-left: 0px;
    height: auto;
}

.kput {
    grid-column: 1 / 8;
    grid-row: 1 / 2;
}

.el-button+.el-button {
    margin-left: 0px;
}

.numberContainer {
    display: grid;
    grid-column: 1 / 6;
    grid-row: 3/ 8;
    grid-row-gap: 10px;
    grid-column-gap: 5px;
    grid-template-columns: 80px 80px 80px;
    grid-template-rows: 40px 40px 40px;
}

.k0 {
    grid-column: 1 / 4;
    grid-row: 9/ 10;
}

.kb {
    grid-column: 5 / 6;
    grid-row: 9/ 10;
}

.kdelete {
    grid-column: 7 / 8;
    grid-row: 3/ 4;
}

.kfill {
    grid-column: 7 / 8;
    grid-row: 5/ 10;
}

.ksubmit {
    grid-column: 1 / 8;
    grid-row: 11/ 12;
}
</style>
