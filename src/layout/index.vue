<template>
  <div class="app-containner">
    <AsideBar class="aside-containner"></AsideBar>
    <div class="main-containner">
      <div class="fiexed-header">
        <NavBar></NavBar>
        <TagsView></TagsView>
      </div>
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script setup>
import AppMain from './AppMain'
import NavBar from './NavBar'
import AsideBar from './AsideBar'
import TagsView from '../components/TagsView'
</script>

<style scoped lang="scss">
.app-containner {
  width: 100%;
  height: 100vh;
  .aside-containner {
    position: fixed;
    top: 0;
    left: 0;
    width: 210px;
    height: 100%;
    background-color: #304156;
    overflow-y: auto;
  }
  .main-containner {
    position: absolute;
    top: 0;
    left: 210px;
    min-width: calc(100% - 210px);
    height: 100%;
    background-color: white;
    .fiexed-header {
      position: fixed;
      top: 0;
      right: 0;
      width: calc(100% - 210px);
      height: 82px;
      background-color: purple;
    }
  }
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.aside-title {
  font-size: 22px;
  color: #fff;
}
</style>
