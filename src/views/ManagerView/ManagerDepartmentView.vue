<script lang="ts" setup>
import { useManagerStore } from "@/stores/manager";
import { Edit } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";

const managerStore = useManagerStore();

const updateVisible = ref(false);
const departmentInfo = ref({});
const editVisible = ref(false);
const departmentName = ref("");

const departmentList = ref([]);

async function getDepartmentList() {
  departmentList.value = await managerStore.getDepartment();
}

onMounted(async () => {
  await getDepartmentList();
});

const updateDeparment = (form: any) => {
  updateVisible.value = true;
  departmentInfo.value = form;
};
const cancleUpdateDeparment = () => {
  updateVisible.value = false;
  departmentInfo.value = {};
};
const doUpdateDeparment = async () => {
  const form = {
    id: departmentInfo.value.id,
    department: departmentInfo.value.department,
  };
  await managerStore.updateDepartment(form);
  updateVisible.value = false;
  getDepartmentList();
};

const deleteDepartment = async (id: number) => {
  await managerStore.deleteDepartment(id);
  getDepartmentList();
};

const createDepartment = () => {
  departmentName.value = "";
  editVisible.value = true;
};
const cancleCreateDepartment = () => {
  departmentName.value = "";
  editVisible.value = false;
};
const doCreateDepartment = async () => {
  await managerStore.createDepartment(departmentName.value);
  editVisible.value = false;
  getDepartmentList();
};
</script>

<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="8" :key="item.id" v-for="item in departmentList">
        <el-card shadow="hover" class="competion-card"
          ><h4>学院：{{ item.department }}</h4>
          <div>
            <div class="bottom">
              <span class="type">序列号：{{ item.id }}</span>
            </div>
          </div>
          <el-button text @click="updateDeparment(item)">修改院系</el-button>
          <el-button text type="danger" @click="deleteDepartment(item.id)"
            >删除院系
          </el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="updateVisible" title="修改院系" width="600">
    <label for="">新院系名：</label>
    <el-input
      v-model="departmentInfo.department"
      style="width: 240px"
      placeholder="Please input"
    />
    <el-button @click="cancleUpdateDeparment">取消</el-button>
    <el-button type="primary" @click="doUpdateDeparment">确认</el-button>
  </el-dialog>

  <el-button
    @click="createDepartment"
    style="position: fixed; margin-left: 95vw"
    type="primary"
    :icon="Edit"
    circle
  />

  <el-dialog v-model="editVisible" title="新增院系" width="600">
    <label for="">院系名：</label>
    <el-input
      v-model="departmentName"
      style="width: 240px"
      placeholder="Please input"
    />
    <el-button @click="cancleCreateDepartment">取消</el-button>
    <el-button type="primary" @click="doCreateDepartment">创建</el-button>
  </el-dialog>
</template>

<style lang="scss" scoped>
.competion-card {
  height: 150px;
  margin-top: 10px;
  .type {
    font-size: 12px;
    color: #999;
  }
}
</style>
