<template>
  <div class="app-containner">
    <AsideBar class="aside-containner"></AsideBar>
    <div class="main-containner">
      <div class="fiexed-header">
        <NavBar></NavBar>
      </div>
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script setup>
import AppMain from './AppMain'
import NavBar from './NavBar'
import AsideBar from './AsideBar'
</script>

<style scoped lang="scss">
.app-containner {
  width: 100%;
  height: 100%;
  .aside-containner {
    position: absolute;
    top: 0;
    left: 0;
    width: 210px;
    height: 100%;
    background-color: red;
    overflow-y: auto;
  }
  .main-containner {
    position: absolute;
    top: 0;
    left: 210px;
    min-width: calc(100% - 210px);
    height: 100%;
    background-color: yellow;
    .fiexed-header {
      height: 82px;
      background-color: purple;
    }
  }
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
