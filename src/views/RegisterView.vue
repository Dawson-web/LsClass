<script setup lang="ts">
import DotBackground from "@/components/DotBackground.vue";
import router from "@/router";
import { usePublicStore } from "@/stores/public";
import { ref } from "vue";
const registerForm = ref({});
const userType = ref("student");
// 注册
const onSubmit = async () => {
  registerForm.value.birth = new Date(
    Date.parse(registerForm.value.birth)
  ).getTime();
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
        <el-radio-group
          v-model="userType"
          style="display: flex; justify-content: center; margin-bottom: 20px"
        >
          <el-radio-button label="教师" value="teacher" />
          <el-radio-button label="学生" value="student" />
        </el-radio-group>
        <el-form
          v-if="userType === 'student'"
          label-position="right"
          label-width="auto"
          :model="registerForm"
          class="register-form"
        >
          <el-form-item label="姓名:">
            <el-input v-model="registerForm.name" />
          </el-form-item>
          <el-form-item label="性别:">
            <el-radio-group v-model="registerForm.gender">
              <el-radio value="男">男</el-radio>
              <el-radio value="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日:">
            <div class="block">
              <el-date-picker
                v-model="registerForm.birth"
                type="dates"
                placeholder="Pick one or more dates"
              />
            </div>
          </el-form-item>
          <el-form-item label="电话:">
            <el-input v-model="registerForm.phoneNum" />
          </el-form-item>
          <el-form-item label="邮箱:">
            <el-input v-model="registerForm.email" />
          </el-form-item>
          <el-form-item label="密码:">
            <el-input v-model="registerForm.password" />
          </el-form-item>
          <el-form-item label="地址:">
            <el-input v-model="registerForm.address" />
          </el-form-item>
        </el-form>
        <el-form
          v-else-if="userType === 'teacher'"
          label-position="right"
          label-width="auto"
          :model="registerForm"
          class="register-form"
        >
          <el-form-item label="姓名:">
            <el-input v-model="registerForm.nickname" />
          </el-form-item>
          <el-form-item label="性别:">
            <el-radio-group v-model="registerForm.gender">
              <el-radio value="男">男</el-radio>
              <el-radio value="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电话:">
            <el-input v-model="registerForm.phoneNum" />
          </el-form-item>
          <el-form-item label="邮箱:">
            <el-input v-model="registerForm.email" />
          </el-form-item>
          <el-form-item label="密码:">
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
