// 首先引入Mock
const Mock = require('mockjs');
 
// 设置拦截ajax请求的相应时间
Mock.setup({
    timeout: '200-600'
});
 
let configArray = [];
 
// 使用webpack的require.context()遍历所有mock文件
const files = require.context('.', true, /\.js$/);
files.keys().forEach((key) => {
    if (key === './index.js') return;
    configArray = configArray.concat(files(key).default);
});
 
// 注册所有的mock服务
configArray.forEach((item) => {
    for (let [path, target] of Object.entries(item)) {
        let protocol = path.split('|');
        Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target);
    }
})


// export const userData = Mock.mock("/data/list", "get", {
//     // 属性 list 的值是一个数组，随机生成 1 到 10 个元素
//     "list|1-10": [
//       {
//         "string|1-10": "★",
//         "number|1-100": 1,
//         "floatNumber|1-100.1-10": 1,
//         "boolean|1": true,
//         'bool|2-5': false,
//         "object|2-4": {
//           "310000": "上海市",
//           "320000": "江苏省",
//           "330000": "浙江省",
//           "340000": "安徽省"
//         },
//         "array|2": [
//           "AMD",
//           "CMD",
//           "UMD"
//         ],
//         'foo': '哇哈哈哈哈',
//         'name': function () {
//           return this.foo
//         },
//         'regexp': /\d{5,10}/,
//       },
//     ],
//     code: 200,
//     message: 'ok',
//   });