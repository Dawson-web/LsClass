<script lang="ts" setup>
import NavMenu from "@/components/NavMenu.vue";
</script>
<template>
  <NavMenu>
    <template #Menu
      ><el-menu-item index="2" route="userinfo">管理员信息</el-menu-item>
      <el-menu-item index="3 " route="department">院系管理</el-menu-item>
      <el-menu-item index="4" route="class">班级管理</el-menu-item>
      <el-menu-item index="5 " route="course">课程管理</el-menu-item>
      <el-menu-item index="6" route="studentlist">学生列表</el-menu-item>
    </template>
  </NavMenu>
  <RouterView></RouterView>
</template>

<style lang="scss" scoped></style>
