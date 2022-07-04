<template>
  <div class="breadcrumb-container">
    <div v-for="(item, index) in breadcrumbData" :key="item.path">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item
          v-if="index !== breadcrumbData.length - 1"
          :to="{ path: item.path }"
          >{{ item.meta.title }} /</el-breadcrumb-item
        >
        <el-breadcrumb-item v-else>{{ item.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()

const breadcrumbData = computed(() => {
  return route.matched.filter((item) => item.meta.title && item.meta.icon)
})
// console.log('breadcrumbDat>>>>', breadcrumbData)
</script>

<style scoped lang="scss">
.breadcrumb-container {
  display: flex;
}
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>
