<script setup lang="ts">
import DotBackground from "@/components/DotBackground.vue";
import router from "@/router";
import { usePublicStore } from "@/stores/public";
import { ref } from "vue";
const backPasswordForm = ref({});
const userType = ref("student");
const usePublic = usePublicStore();

const getEmailcode = async () => {
  localStorage.setItem("usertype", userType.value);
  await usePublic.getEmailCode(backPasswordForm.value.email);
};

const onSubmit = async () => {
  localStorage.setItem("usertype", userType.value);
  await usePublic.backPassword(backPasswordForm.value);
  router.push("/login");
};
</script>

<template>
  <div>
    <header>
      <NavBar compact />
    </header>
    <main>
      <h1 class="title">找回密码</h1>
      <div class="backpassword-form-wrapper">
        <el-radio-group
          v-model="userType"
          style="display: flex; justify-content: center; margin-bottom: 20px"
        >
          <el-radio-button label="教师" value="teacher" />
          <el-radio-button label="学生" value="student" />
        </el-radio-group>
        <el-form
          label-position="right"
          label-width="auto"
          :model="backPasswordForm"
          class="backpassword-form"
        >
          <el-form-item label="邮箱：">
            <el-input v-model="backPasswordForm.email" />
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="backPasswordForm.pwd" />
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input v-model="backPasswordForm.confirmPwd" />
          </el-form-item>
          <el-form-item label="验证码：">
            <div style="display: flex; flex-wrap: nowrap; gap: 10px">
              <el-input v-model="backPasswordForm.code" />
              <el-button
                type="primary"
                @click="getEmailcode"
                style="font-size: 12px"
                >获取验证码</el-button
              >
            </div>
          </el-form-item>
        </el-form>

        <ElButton style="width: 100%" type="primary" plain @click="onSubmit"
          >确认</ElButton
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

.backpassword-form-wrapper {
  width: 280px;
  padding: 3rem 2rem;
  background-color: #fff;
  border-radius: $border-radius-lg;
  .backpassword-form {
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
