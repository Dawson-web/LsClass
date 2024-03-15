<template>
  <div class="nav-menu">
    <el-menu
      :default-active="1"
      class="el-menu-demo"
      mode="horizontal"
      router="true"
      style="min-width: 800px"
      @select="handleSelect"
    >
      <el-menu-item index="1" route="announce">公告</el-menu-item>
      <slot name="Menu"></slot>
    </el-menu>

    <div
      style="
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 120px;
      "
    >
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <el-popconfirm title="确认退出账号？" @confirm="logout">
        <template #reference>
          <el-button>退出</el-button>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>

<script lang="ts" setup>
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userType");
  location.reload();
};
</script>

<style lang="scss" scoped>
.nav-menu {
  margin: 0 auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
}
</style>
