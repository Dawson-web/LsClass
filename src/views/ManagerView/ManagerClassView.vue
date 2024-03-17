<script lang="ts" setup>
import { useManagerStore } from "@/stores/manager";
import { Edit } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";

const managerStore = useManagerStore();

const classList = ref([]);

const updateVisible = ref(false);
const classInfo = ref({});
const editVisible = ref(false);
const className = ref("");
const major = ref("");

// 获取班级列表
async function getClassList() {
  classList.value = await managerStore.getClass();
}
// 预载
onMounted(async () => {
  await getClassList();
});
// 更新班级信息
const updateClass = (form: any) => {
  updateVisible.value = true;
  classInfo.value = form;
};
// 取消更新班级信息
const cancleUpdateClass = () => {
  updateVisible.value = false;
  classInfo.value = {};
};
// 确认更新班级信息
const doUpdateClass = async () => {
  const form = {
    id: classInfo.value.id,
    className: classInfo.value.className,
    major: classInfo.value.major,
  };
  await managerStore.updateClass(form);
  updateVisible.value = false;
  getClassList();
};
// 删除班级
const deleteClass = async (id: number) => {
  await managerStore.deleteClass(id);
  getClassList();
};
// 创建班级
const createClass = () => {
  className.value = "";
  major.value = "";
  editVisible.value = true;
};
// 取消创建班级
const cancleCreateClass = () => {
  className.value = "";
  major.value = "";
  editVisible.value = false;
};
// 确认创建班级
const doCreateClass = async () => {
  const form = {
    className: className.value,
    major: major.value,
  };
  await managerStore.createClass(form);
  editVisible.value = false;
  getClassList();
};
</script>

<template>
  <div style="background-color: #eee; padding: 30px; border-radius: 15px">
    <el-row :gutter="12">
      <el-col :span="8" :key="item.id" v-for="item in classList">
        <el-card shadow="hover" class="competion-card"
          ><h4>班级：{{ item.className }}</h4>
          <div>
            <div class="bottom">
              <span class="type">专业：{{ item.major }}</span>
              <span class="type">序列号：{{ item.id }}</span>
            </div>
          </div>
          <el-button text type="primary" @click="updateClass(item)"
            >修改班级</el-button
          >
          <el-button text type="danger" @click="deleteClass(item.id)"
            >删除班级
          </el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="updateVisible" title="修改班级" width="600">
    <label for="">班级名：</label>
    <el-input
      v-model="classInfo.className"
      style="width: 240px"
      placeholder="默认"
    />
    <label for="">专业：</label>
    <el-input
      v-model="classInfo.major"
      style="width: 240px"
      placeholder="默认"
    />
    <br />
    <el-button @click="cancleUpdateClass">取消</el-button>
    <el-button type="primary" @click="doUpdateClass">确认</el-button>
  </el-dialog>

  <el-button
    @click="createClass"
    style="position: fixed; margin-left: 95vw"
    type="primary"
    :icon="Edit"
    circle
  />

  <el-dialog v-model="editVisible" title="新增班级" width="600">
    <label for="">班级名：</label>
    <el-input
      v-model="className"
      style="width: 240px"
      placeholder="Please input"
    />
    <label for="">专业：</label>
    <el-input v-model="major" style="width: 240px" placeholder="Please input" />
    <el-button @click="cancleCreateClass">取消</el-button>
    <el-button type="primary" @click="doCreateClass">确认</el-button>
  </el-dialog>
</template>

<style lang="scss" scoped>
.competion-card {
  height: 150px;
  border-radius: 15px;
  margin-top: 10px;
  &:hover {
    transform: scale(1.02);
  }
  .type {
    font-size: 12px;
    color: #999;
  }
}
</style>
