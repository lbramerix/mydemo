import Mock from 'mockjs' //导入mockjs
import store from '../store/index.js';

const subjectList = {
    data: {
        subjectinfo: [{
            name: "主观题 第6题",
            score: 6,
            all1: 900,
            all2: 1000,
            per1: 60,
            per2: 210,
            returned: 2,
            school: '上林县中学&城关中学联考',
            subject: '语文',
        }, {
            name: "主观题 第8题",
            score: 6,
            all1: 1000,
            all2: 1000,
            per1: 60,
            per2: 60,
            returned: 0,
            school: '上林县中学&城关中学联考',
            subject: '语文',
        }, {
            name: "主观题 第8题",
            score: 6,
            all1: 400,
            all2: 700,
            per1: 0,
            per2: 70,
            returned: 0,
            school: '上林县中学&城关中学联考',
            subject: '语文',
        }, {
            name: "主观题 短文改错",
            score: 10,
            all1: 800,
            all2: 1000,
            per1: 60,
            per2: 100,
            returned: 0,
            school: '上林县中学&城关中学联考',
            subject: '英语',
        }, {
            name: "选做题1 43",
            score: 10,
            all1: 500,
            all2: 500,
            per1: 70,
            per2: 70,
            returned: 0,
            school: '上林县中学&城关中学联考',
            subject: '文综合'
        }, {
            name: "选做题1 44",
            score: 10,
            all1: 400,
            all2: 500,
            per1: 60,
            per2: 70,
            returned: 0,
            school: '上林县中学&城关中学联考',
            subject: '文综合'
        }, {
            name: "主观题13-16",
            score: 10,
            all1: 400,
            all2: 500,
            per1: 60,
            per2: 70,
            returned: 0,
            school: '长春市普通高中2023级高一质量监测',
            subject: '语文'
        }],
        meta: {
            status: 200,
            message: 'success',
        }
    },
};

const schoolList = {
    data: {
        schoolinfo: [{
            school: '上林县中学&城关中学联考',
            tab: "统考",
        }, {
            school: '长春市普通高中2023级高一质量监测',
            tab: "学校",
        }],
        meta: {
            status: 200,
            message: 'success',
        }
    },
};

const tagList = {
    data: {
        taginfo: [{
            school: '上林县中学&城关中学联考',
            subject: '语文',
            tag: "试评",
            participantsNumber: 800,
            allNumber: 900,
        }, {
            school: '上林县中学&城关中学联考',
            subject: '英语',
            tag: "3评 试评",
            participantsNumber: 570,
            allNumber: 900,
        }, {
            school: '上林县中学&城关中学联考',
            subject: '文综合',
            tag: "仲裁 试评",
            participantsNumber: 700,
            allNumber: 800,
        }, {
            school: '长春市普通高中2023级高一质量监测',
            subject: '语文',
            tag: "按班批阅",
            participantsNumber: 10,
            allNumber: 20,
        }],
        meta: {
            status: 200,
            message: 'success',
        }
    },
};

Mock.mock('/school', 'post', req => {
    //获取学校信息列表
    let filteredSchools = [];
    for (let i = 0; i < schoolList.data.schoolinfo.length; i++) {
        filteredSchools.push(schoolList.data.schoolinfo[i]);
    }
    if (filteredSchools.length > 0) {
        return {
            meta: {
                msg: 'success',
                status: 200
            },
            data: filteredSchools
        }
    } else {
        return {
            meta: {
                msg: 'error',
                status: 201
            }
        }
    }
})

Mock.mock('/subject', 'post', req => {
    //获取学科信息列表
    let filteredSubjects = [];
    for (let i = 0; i < subjectList.data.subjectinfo.length; i++) {
        filteredSubjects.push(subjectList.data.subjectinfo[i]);
    }
    if (filteredSubjects.length > 0) {
        return {
            meta: {
                msg: 'success',
                status: 200
            },
            data: filteredSubjects
        }
    } else {
        return {
            meta: {
                msg: 'error',
                status: 201
            }
        }
    }
})

Mock.mock('/tag', 'post', req => {
    let filteredTags = [];
    for (let i = 0; i < taglList.data.taginfo.length; i++) {
        if (school === taglList.data.taginfo[i].school) {
            filteredTags.push(taglList.data.taginfo[i]);
        }
    }
    if (filteredTags.length > 0) {
        return {
            meta: {
                msg: 'success',
                status: 200
            },
            data: filteredTags
        }
    } else {
        return {
            meta: {
                msg: 'error',
                status: 201
            }
        }
    }
})

//定义请求方法与路径
export default {
    'get|/school': schoolList,
    'get|/subject': subjectList,
    'get|/tag': tagList,
}
