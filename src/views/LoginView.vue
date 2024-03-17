<script setup lang="ts">
import DotBackground from "@/components/DotBackground.vue";
import router from "@/router";
import { usePublicStore } from "@/stores/public";
import { ref } from "vue";
const loginForm = ref({
  username: "",
  password: "",
});
const userType = ref("student");
// 登录
async function onSubmit() {
  localStorage.setItem("usertype", userType.value);
  const usePubllic = usePublicStore();
  await usePubllic.userLogin(loginForm.value);
  router.push(`/${userType.value}`);
}
</script>

<template>
  <div>
    <main>
      <h1 class="title">登录</h1>
      <div class="login-form-wrapper">
        <el-radio-group
          v-model="userType"
          style="display: flex; justify-content: center"
        >
          <el-radio-button label="学生" value="student" />
          <el-radio-button label="教师" value="teacher" />
          <el-radio-button label="管理员" value="manager" />
        </el-radio-group>
        <ElForm label-position="top">
          <ElFormItem label="邮箱:">
            <ElInput type="usernmae" v-model="loginForm.username" />
          </ElFormItem>
          <ElFormItem label="密码:" style="margin-bottom: calc(18px - 1.2rem)">
            <ElInput
              type="password"
              show-password
              v-model="loginForm.password"
            />
            <div style="display: flex; align-items: center">
              <ElText style="font-size: 10px">忘记密码?</ElText>
              <ElLink
                type="primary"
                @click="$router.push('/backpassword')"
                style="font-size: 10px"
                >立即找回</ElLink
              >
            </div>
          </ElFormItem>
          <br />
          <ElButton style="width: 100%" type="primary" plain @click="onSubmit"
            >登录</ElButton
          >
        </ElForm>
        <div style="display: flex; align-items: center; margin-top: 1rem">
          <ElText>没有账户？</ElText>
          <ElLink type="primary" @click="$router.push('/register')"
            >立即注册</ElLink
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
    margin-top: 10svh;
  }
}

.title {
  font-weight: 200;
}

.login-form-wrapper {
  width: 280px;
  padding: 3rem 2rem;
  background-color: #fff;
  border-radius: $border-radius-lg;
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
