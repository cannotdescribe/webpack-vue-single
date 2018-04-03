<template>
  <div class="app-wrapper" >
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <tags-view></tags-view>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, TagsView,AppMain } from './components'
export default {
  name: 'layout',
  components: {
      Navbar,
      Sidebar,
      TagsView,
      AppMain
  },
    computed: {
        sidebar() {
            return "sidebar";
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>