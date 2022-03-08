<script lang="ts" setup>
import { onMounted } from 'vue';
import { registerMicroApps, start } from 'qiankun';
import { storeToRefs } from 'pinia';
import { createMefStore } from '@/store/mfeStore';

const mfeStore = createMefStore();
const { microApps } = storeToRefs(mfeStore);
const { getMicroApps } = mfeStore;

getMicroApps().then(() => {
  registerMicroApps(microApps.value);
});

onMounted(() => {
  start({
    prefetch: false,
  });
});
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <template v-if="microApps.length"> | </template>
    <template v-for="(menu, index) in microApps"
      :key="menu.name">
      <router-link :to="menu.activeRule">
        {{ menu.name }}
      </router-link>
      <template v-if="index < microApps.length -1"> | </template>
    </template>
  </nav>
  <router-view />
</template>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
