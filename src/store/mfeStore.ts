import { getMicroApps } from '@/api';
import { defineStore } from 'pinia';
import { ObjectType, RegistrableApp } from 'qiankun';

const createMefStore = defineStore('mefStore', {
  state: () => ({
    microApps: [] as RegistrableApp<ObjectType>[],
    loadState: 'initial',
  }),
  getters: {
    /**
     * 在没有定义统一的微前端路由前缀时
     * 可以通过该值判断主应用和子应用的路径是否冲突
     */
    microAppRules: (state) => state.microApps.map((app) => app.activeRule),
  },
  actions: {
    getMicroApps() {
      this.loadState = 'loading';
      return getMicroApps().then((apps) => {
        this.loadState = 'success';
        this.microApps = apps.map((app) => {
          let { activeRule } = app;
          if (!activeRule.toString().startsWith('/mfe')) {
            activeRule = `/mfe${activeRule}`;
          }
          return {
            ...app,
            activeRule,
            props: {
              ...app.props,
              base: app.props?.base || activeRule,
            },
          };
        });
      }).catch(() => {
        this.loadState = 'fail';
      });
    },
  },
});

export { createMefStore };
