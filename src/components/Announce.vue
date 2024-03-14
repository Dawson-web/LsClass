<script lang="ts" setup>
import { useManagerStore } from "@/stores/manager";
import { usePublicStore } from "@/stores/public";
import { Edit } from "@element-plus/icons-vue";
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

onMounted(async () => {
  await getAnnouncements();
});
const getAnnouncements = async () => {
  form.value = await usePubllic.getAnnouncements(type.value);
};
``;
const cancleCreateAnnouncement = () => {
  editVisible.value = false;
  newAnnouncement.value = {};
};
const doCreateAnnouncement = async () => {
  newAnnouncement.value.expiryDate = 1677753600000;
  await managerStore.createAnnouncement(newAnnouncement.value);
  editVisible.value = false;
  await getAnnouncements();
};

const updateAccoument = (form: any) => {
  updateVisible.value = true;
  ``;
  AnnouncementInfo.value = form;
  console.log(AnnouncementInfo.value);
};
const cancleUpdateAccoument = () => {
  updateVisible.value = false;
  AnnouncementInfo.value = {};
};
const updateAnnouncement = async () => {
  updateVisible.value = false;
  await managerStore.updateAnnouncement(AnnouncementInfo.value);
  await getAnnouncements();
};

const deleteAnnouncement = async (id: number) => {
  await managerStore.deleteAnnouncement(id);
  getAnnouncements();
};
</script>

<template>
  <div class="announce-box">
    <div>
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
      style="width: 100%"
      v-for="item in form"
      :key="item.announcementId"
    >
      <template #header>
        <div class="card-header">
          <span>{{ item.title }}</span>
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
      </template>
      <p class="text item">{{ item.content }}</p>
      <template #footer>发布者：{{ item.authorName }}</template>
    </el-card>
  </div>
  <el-button
    @click="editVisible = true"
    style="position: fixed; margin-left: 95vw"
    type="primary"
    :icon="Edit"
    circle
  />
  <el-dialog v-model="updateVisible" title="更改公告" width="600">
    <label for="">标题：</label>
    <el-input
      v-model="AnnouncementInfo.title"
      style="width: 240px"
      placeholder="Please input"
    />
    <el-input
      v-model="AnnouncementInfo.content"
      style="width: 240px"
      placeholder="Please input"
      type="textarea"
    />

    <el-button @click="cancleUpdateAccoument">取消</el-button>
    <el-button type="primary" @click="updateAnnouncement">确认</el-button>
  </el-dialog>
  <el-dialog v-model="editVisible" title="新增公告" width="600">
    <label for="">标题：</label>
    <el-input
      v-model="newAnnouncement.title"
      style="width: 240px"
      placeholder="Please input"
    />
    <el-input
      v-model="newAnnouncement.content"
      style="width: 240px"
      placeholder="Please input"
      type="textarea"
    />

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
}
</style>
