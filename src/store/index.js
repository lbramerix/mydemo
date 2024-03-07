import { defineStore } from "pinia";
const useCounterStore = defineStore("counter", {
    // 数据 data
    state: () => {
        return {
            count: 100,
        };
    },
    //   计算 cpmputed
    getters: {},
    //   方法 methods
    actions: {},
});

const themeConfig = reactive<GlobalState['themeConfig']>({
    // 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
    layout: 'vertical',
    // 默认 primary 主题颜色
    primary: DEFAULT_PRIMARY,
    // 深色模式
    isDark: false,
    // 灰色模式
    isGrey: false,
    // 色弱模式
    isWeak: false,
    // 当前页面是否全屏
    maximize: false,
  })

export default useCounterStore;