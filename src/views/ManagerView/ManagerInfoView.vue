<script lang="ts" setup>
import { useManagerStore } from "@/stores/manager";
import { onMounted, ref } from "vue";

const form = ref({});
onMounted(async () => {
  const managerStore = useManagerStore();
  form.value = await managerStore.getManagerInfo();
  console.log(form.value);
});
</script>
<template>
  <el-card
    style="width: 480px; margin: 0 auto; margin-top: 20vh; border-radius: 15px"
    shadow="always"
  >
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="账号">
        <el-input v-model="form.username" disabled="" />
      </el-form-item>
      <el-form-item label="管理">
        <el-input v-model="form.nickname" disabled="" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" disabled="" />
      </el-form-item>
      <slot name="Info"></slot>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped></style>
