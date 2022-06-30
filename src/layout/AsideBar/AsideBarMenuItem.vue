<template>
  <div>
    <!-- 没有子菜单：使用el-menu-item -->
    <template v-if="item && !item.children">
      <el-menu-item :index="item.path" :key="item.path">
        <el-icon>
          <svg-icon :icon="item.meta.icon"></svg-icon>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
    <!-- 有子菜单：使用el-sub-menu -->
    <template v-if="item && item.children && item.children.length > 0">
      <el-sub-menu :index="item.path" :key="item.path">
        <template #title>
          <el-icon>
            <svg-icon :icon="item.meta.icon"></svg-icon>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <AsideBarMenuItem
          v-for="(ele, i) in item.children"
          :menuList="ele"
          :key="i"
        ></AsideBarMenuItem>
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup>
/* eslint-disable */
// eslint-disable-next-line vue/no-setup-props-destructure
import { defineProps } from 'vue'

const PropsMenuData = defineProps({
  menuList: {
    type: Object,
    default: () => {}
  }
})

const item = PropsMenuData.menuList
</script>

<style lang="scss" scoped></style>
