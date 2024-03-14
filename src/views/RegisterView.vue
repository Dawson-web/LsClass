<script setup lang="ts">
import DotBackground from "@/components/DotBackground.vue";
import router from "@/router";
import { usePublicStore } from "@/stores/public";
import { ref } from "vue";
const registerForm = ref({});
const genders = [
  {
    label: "男",
    value: "男",
  },
  {
    label: "女",
    value: "女",
  },
];

const userType = ref("student");
const onSubmit = async () => {
  localStorage.setItem("usertype", userType.value);
  const usePubllic = usePublicStore();
  await usePubllic.userRegister(registerForm.value);
  router.push("/login");
};
</script>

<template>
  <div>
    <header>
      <NavBar compact />
    </header>
    <main>
      <h1 class="title">注册</h1>
      <div class="register-form-wrapper">
        <el-radio-group v-model="userType" size="large">
          <el-radio-button label="教师" value="teacher" />
          <el-radio-button label="学生" value="student" />
        </el-radio-group>
        <el-form
          v-if="userType === 'student'"
          label-width="left"
          :model="registerForm"
          class="register-form"
        >
          <el-form-item label="姓名">
            <el-input v-model="registerForm.name" />
          </el-form-item>
          <el-form-item label="性别">
            <el-select
              v-model="registerForm.gender"
              placeholder="性别"
              style="width: 240px"
            >
              <el-option
                v-for="item in genders"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="生日">
            <el-input v-model="registerForm.birth" />
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="registerForm.phoneNum" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="registerForm.email" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="registerForm.password" />
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="registerForm.address" />
          </el-form-item>
        </el-form>
        <el-form
          v-else-if="userType === 'teacher'"
          label-width="left"
          :model="registerForm"
          class="register-form"
        >
          <el-form-item label="姓名">
            <el-input v-model="registerForm.nickname" />
          </el-form-item>
          <el-form-item label="性别">
            <el-select
              v-model="registerForm.gender"
              placeholder="性别"
              style="width: 240px"
            >
              <el-option
                v-for="item in genders"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="registerForm.phoneNum" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="registerForm.email" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="registerForm.password" />
          </el-form-item>
        </el-form>

        <ElButton style="width: 100%" type="primary" plain @click="onSubmit"
          >注册</ElButton
        >
        <div style="display: flex; align-items: center; margin-top: 1rem">
          <ElText>已有账户？</ElText>
          <ElLink type="primary" @click="$router.push('/login')"
            >立即登录</ElLink
          >
        </div>
      </div>
    </main>
    <DotBackground />
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";

header {
  margin-top: 8svh;

  @media (max-height: $mobile-height-breakpoint) {
    margin-top: 0;
  }
}

main {
  margin-top: 8svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-height: $mobile-height-breakpoint) {
    margin-top: 2svh;
  }
}

.title {
  font-weight: 200;
}

.register-form-wrapper {
  width: 280px;
  padding: 3rem 2rem;
  background-color: #fff;
  border-radius: $border-radius-lg;
  .register-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}

.captcha-wrapper {
  width: 100%;
  display: flex;
  gap: 0.5rem;

  .captcha {
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: #fff;
    background-size: 100% 100%;
    flex: 2;
    border-radius: $border-radius-md;
  }
}
</style>
