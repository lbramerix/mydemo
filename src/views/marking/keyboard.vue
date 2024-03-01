<template>
    <el-card style="width: 390px;">
        <template #header>
            <div class="card-header">

            </div>
        </template>
        <div class="wrapper" @click.stop='_handleKeyPress'>
            <el-input placeholder="请给分" @click="isInputChoose = true" v-model="number" class="box kput"
                v-bind:value="score"></el-input>
            <el-button class="box k7" data-num='7'>7</el-button>
            <el-button class="box k8" style="margin-left: 0px;" data-num='8'>8</el-button>
            <el-button class="box k9" style="margin-left: 0px;" data-num='9'>9</el-button>
            <el-button class="box k4" style="margin-left: 0px;" data-num='4'>4</el-button>
            <el-button class="box k5" style="margin-left: 0px;" data-num='5'>5</el-button>
            <el-button class="box k6" style="margin-left: 0px;" data-num='6'>6</el-button>
            <el-button class="box k1" style="margin-left: 0px;" data-num='1'>1</el-button>
            <el-button class="box k2" style="margin-left: 0px;" data-num='2'>2</el-button>
            <el-button class="box k3" style="margin-left: 0px;" data-num='3'>3</el-button>
            <el-button class="box k0" style="margin-left: 0px;" data-num='0'>0</el-button>
            <el-button class="box kb" style="margin-left: 0px;" data-num='.'>.</el-button>
            <el-button class="box kdelete" style="margin-left: 0px;" data-num='D'>删除</el-button>
            <el-button class="kfill" type="success" plain style="height: auto;margin-left: 0px;">满分</el-button>
            <el-button class="ksubmit" type="primary" style="width: auto;margin-left: 0px;height: auto;"
                data-num='S'>给分</el-button>
        </div>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            score: ''
        }
    },
    methods: {
        _handleKeyPress(e) {
            let num = e.target.dataset.num;
            switch (String(num)) {
                case '.':
                    this._handleDecimalPoint();
                    break;
                case 'D':
                    this._handleDeleteKey();
                    break;
                case 'S':
                    this._handleConfirmKey();
                    break;
                default:
                    this._handleNumberKey(num);
                    break;
            }
        },
        _handleDecimalPoint() {
            if (this.score.indexOf('.') > -1) return false;
            if (!this.score.length)
                this.score = '0.';
            else
                this.score = this.score + '.';

        },
        _handleDeleteKey() {
            let S = this.score;
            if (!S.length) return false;
            this.score = S.substring(0, S.length - 1);

        },
        _handleClearKey() {
            this.score = '';
        },
        _handleNumberKey(num) {
            let S = this.score;
            console.log(S)
            if (S.indexOf('.') > -1 && S.substring(S.indexOf('.') + 1).length < 2)
                this.score = S + num;
            if (!(S.indexOf('.') > -1)) {
                if (num == 0 && S.length == 0)
                    this.score = '0.';

                else {
                    if (S.length && Number(S.charAt(0)) === 0) return;
                    this.score = S + num;
                }

            }

        },
        _handleConfirmKey() {
            let S = this.score;
            if (!S.length) {
                alert('您目前未输入!')
                return false;
            }
            if (S.indexOf('.') > -1 && S.indexOf('.') == (S.length - 1))
                S = Number(S.substring(0, S.length - 1)).toFixed(2);
            S = Number(S).toFixed(2);
            this.$emit('confirmEvent', S)
        }
    }
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

.k7 {
    grid-column: 1 / 2;
    grid-row: 3 / 4;
}

.k8 {
    grid-column: 3 / 4;
    grid-row: 3 / 4;
}

.k9 {
    grid-column: 5 / 6;
    grid-row: 3 / 4;
}

.k4 {
    grid-column: 1 / 2;
    grid-row: 5/ 6;
}

.k5 {
    grid-column: 3 / 4;
    grid-row: 5/ 6;
}

.k6 {
    grid-column: 5 / 6;
    grid-row: 5/ 6;
}

.k1 {
    grid-column: 1 / 2;
    grid-row: 7/ 8;
}

.k2 {
    grid-column: 3 / 4;
    grid-row: 7/ 8;
}

.k3 {
    grid-column: 5 / 6;
    grid-row: 7/ 8;
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
