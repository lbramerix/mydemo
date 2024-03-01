import { createRouter, createWebHashHistory } from 'vue-router';
import login from '@/views/login';
// 首页
import index from '@/views/index';
// 考试管理
import Exam from '@/views/yuejuan/exam';
// 答题卡管理
import Answersheet from '@/views/yuejuan/answersheet';
// 教师阅卷
import Teacher from '@/views/yuejuan/teacher';
// 学业分析 
import Analysis from '@/views/yuejuan/analysis';
// 题库组卷
import Questionbank from '@/views/yuejuan/questionbank';
// 批阅
import Mark from '@/views/marking/mark';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: '',
            component: login,
            hidden: true,
            meta: {
                requireAuth: false
            }
        },
        {
            path: '/login',
            name: '登录',
            component: login,
            hidden: true,
            meta: {
                requireAuth: false
            }
        },
        {
            path: '/index',
            name: '首页',
            component: index,
            iconCls: 'el-icon-tickets',
            children: [{
                path: '/yuejuan/exam',
                name: '考试管理',
                component: Exam,
                meta: {
                    requireAuth: true
                }
            },{
                path: '/yuejuan/answersheet',
                name: '答题卡管理',
                component: Answersheet,
                meta: {
                    requireAuth: true
                }
            },{
                path: '/yuejuan/teacher',
                name: '教师阅卷',
                component: Teacher,
                meta: {
                    requireAuth: true
                }
            },{
                path: '/yuejuan/analysis',
                name: '学业分析',
                component: Analysis,
                meta: {
                    requireAuth: true
                }
            },{
                path: '/yuejuan/questionbank',
                name: '题库组卷',
                component: Questionbank,
                meta: {
                    requireAuth: true
                }
            }]
        },
        {
            path: '/marking/mark',
            name: '批阅',
            component: Mark,
            hidden: true,
            props: true,
            meta: {
                requireAuth: false
            }
        },
    ]
});

export default router;
