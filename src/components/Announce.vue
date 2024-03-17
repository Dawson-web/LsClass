<script lang="ts" setup>
import { useManagerStore } from "@/stores/manager";
import { usePublicStore } from "@/stores/public";
import { Edit } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const usePubllic = usePublicStore();
const managerStore = useManagerStore();
const form = ref([]);
const type = ref(1);

const updateVisible = ref(false);
const editVisible = ref(false);
const AnnouncementInfo = ref({});
const newAnnouncement = ref({});

const typeOptions = [
  {
    value: 1,
    label: "系统工告",
  },
  {
    value: 2,
    label: "教师公告",
  },
];
async function typeChange() {
  form.value = await usePubllic.getAnnouncements(type.value);
}
// 预载
onMounted(async () => {
  await getAnnouncements();
});
// 获取公告
const getAnnouncements = async () => {
  form.value = await usePubllic.getAnnouncements(type.value);
};
// 取消创建公告
const cancleCreateAnnouncement = () => {
  editVisible.value = false;
  newAnnouncement.value = {};
};
// 创建公告
const doCreateAnnouncement = async () => {
  newAnnouncement.value.expiryDate = 1677753600000;
  await managerStore.createAnnouncement(newAnnouncement.value);
  editVisible.value = false;
  await getAnnouncements();
};
// 更新公告
const updateAccoument = (form: any) => {
  updateVisible.value = true;
  AnnouncementInfo.value = form;
};
// 取消更新公告
const cancleUpdateAccoument = () => {
  updateVisible.value = false;
  AnnouncementInfo.value = {};
  ElMessage({
    message: "取消更新",
    grouping: true,
  });
};
// 确认更新公告
const updateAnnouncement = async () => {
  updateVisible.value = false;
  await managerStore.updateAnnouncement(AnnouncementInfo.value);
  await getAnnouncements();
  ElMessage({
    message: "公告更新成功",
    grouping: true,
    type: "success",
  });
};
// 删除公告
const deleteAnnouncement = async (id: number) => {
  await managerStore.deleteAnnouncement(id);
  getAnnouncements();
};

const judgeUsertype = () => {
  return localStorage.getItem("usertype") !== "student";
};
</script>

<template>
  <div class="announce-box">
    <div style="align-self: flex-start; margin: 10px">
      <span>公告类型：</span>
      <el-select
        v-model="type"
        placeholder="Select"
        @change="typeChange"
        size="small"
        style="width: 120px"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <el-card
      class="announce-card"
      v-for="item in form"
      :key="item.announcementId"
    >
      <template #header>
        <div class="announcement-header">
          <el-text class="mx-1">公告：{{ item.title }}</el-text>
          <div v-if="judgeUsertype()">
            <el-button
              @click="deleteAnnouncement(item.announcementId)"
              type="danger"
              text
              >删除</el-button
            >
            <el-button @click="updateAccoument(item)" type="primary" text
              >更改</el-button
            >
          </div>
        </div>
      </template>
      <p class="text item">{{ item.content }}</p>
      <template #footer>发布者：{{ item.authorName }}</template>
    </el-card>
  </div>
  <el-button
    v-if="judgeUsertype()"
    @click="editVisible = true"
    style="position: fixed; margin-left: 95vw"
    type="primary"
    :icon="Edit"
    circle
  />
  <el-dialog v-model="updateVisible" title="更改公告" width="600">
    <el-form
      label-position="right"
      label-width="auto"
      :model="AnnouncementInfo"
    >
      <el-form-item label="标题:">
        <el-input
          v-model="AnnouncementInfo.title"
          style="width: 500px"
          placeholder="Please input"
      /></el-form-item>
      <el-form-item label="内容:">
        <el-input
          v-model="AnnouncementInfo.content"
          style="width: 500px"
          placeholder="Please input"
          type="textarea"
      /></el-form-item>
    </el-form>
    <div style="display: flex; justify-content: center; gap: 10px">
      <el-button @click="cancleUpdateAccoument">取消</el-button>
      <el-button type="primary" @click="updateAnnouncement">确认</el-button>
    </div>
  </el-dialog>
  <el-dialog v-model="editVisible" title="新增公告" width="600">
    <el-form label-position="right" label-width="auto" :model="newAnnouncement">
      <el-form-item label="标题:">
        <el-input
          v-model="newAnnouncement.title"
          style="width: 500px"
          placeholder="Please input"
        />
      </el-form-item>
      <el-form-item label="内容:"
        ><el-input
          v-model="newAnnouncement.content"
          style="width: 500px"
          placeholder="Please input"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <el-button @click="cancleCreateAnnouncement">取消</el-button>
    <el-button type="primary" @click="doCreateAnnouncement">确认</el-button>
  </el-dialog>
</template>

<style lang="scss" scoped>
.announce-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #eee;
  padding: 30px;
  border-radius: 15px;
  .announce-card {
    width: 100%;
    margin: 5px;
    border-radius: 15px;
    &:hover {
      transform: scale(1.02);
    }
  }
  .announcement-header {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
}
</style>
