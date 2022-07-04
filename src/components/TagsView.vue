<template>
  <div class="tags-container">
    <ul class="tags">
      <li
        class="tags-item"
        :class="{ active: $route.path === item.path }"
        v-for="(item, index) in tags"
        :key="index"
        @click="handleCurrentTag(item.path)"
      >
        <span class="span-first">{{ item.meta.title }}</span>
        <span @click.stop="handleCloseTag(index)" v-if="!($route.path === item.path)"
          ><svg-icon icon="close"></svg-icon
        ></span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { watch, computed } from 'vue'
import { useStore } from 'vuex'
const route = useRoute()
const router = useRouter()
const store = useStore()
// watch(监听的数据，副作用函数，配置对象)
watch(
  route,
  (newData, oldData) => {
    if (route.meta && route.meta.title && route.path) {
      let obj = {
        meta: route.meta,
        path: route.path
      }
      store.dispatch('tagsView/setTagsView', obj)
    }
  },
  { immediate: true, deep: true }
)
// 获取vuex存储的tags标签数据
const tags = computed(() => {
  return store.getters.tagsView
})
// 点击跳转标签页
const handleCurrentTag = (path) => {
  router.push(path)
}
// 关闭标签
const handleCloseTag = (i) => {
  store.dispatch('tagsView/closeTag', i)
}
</script>

<style scoped lang="scss">
.tags-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
}
.tags {
  display: inline-block;
  position: relative;
  .span-first {
    padding-right: 2px !important;
  }
}
.tags-item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
}
.active {
  color: #fff;
  background-color: #304156;
}
</style>
