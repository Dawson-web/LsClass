<script lang="ts" setup>
import { useManagerStore } from "@/stores/manager";
import { Edit } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
const managerStore = useManagerStore();

const updateVisible = ref(false);
const editVisible = ref(false);

const courseList = ref([]);
const courseInfo = ref({});
const newCourseInfo = ref({});

const departmentList = ref([]);
const classList = ref([]);
const TeacherList = ref([]);

// 获取课程信息
async function getCourseList() {
  courseList.value = await managerStore.getCourse();
}
// 预载
onMounted(async () => {
  await getCourseList();
  classList.value = await managerStore.getClass();
  departmentList.value = await managerStore.getDepartment();
  TeacherList.value = await managerStore.getTeacherList();
});
// 更新课程信息
const updateCourse = (form: any) => {
  updateVisible.value = true;
  courseInfo.value = form;
};
// 取消更新课程信息
const cancleUpdateCourse = () => {
  updateVisible.value = false;
  courseInfo.value = {};
};
// 确认更新课程信息
const doUpdateCourse = async () => {
  await managerStore.updateCourse(courseInfo.value);
  updateVisible.value = false;
  getCourseList();
};
// 删除课程
const deleteCourse = async (id: number) => {
  await managerStore.deleteCourse(id);
  getCourseList();
};
// 创建课程
const createCourse = () => {
  editVisible.value = true;
  newCourseInfo.value = {};
};
// 取消创建课程
const cancleCreateCourse = () => {
  editVisible.value = false;
  newCourseInfo.value = {};
};
// 确认创建课程
const doCreateCourse = async () => {
  (newCourseInfo.value.endDate =
    newCourseInfo.value.endDate * 7 * 24 * 60 * 60 * 1000 + Date.now()),
    await managerStore.createCourse(newCourseInfo.value);
  editVisible.value = false;
  getCourseList();
};
</script>

<template>
  <div style="background-color: #eee; padding: 30px; border-radius: 15px">
    <el-row :gutter="12">
      <el-col :span="8" :key="item.courseId" v-for="item in courseList">
        <el-card shadow="hover" class="course-card"
          ><h4>{{ item.courseName }}</h4>
          <div>
            <div class="bottom">
              <span class="type">所属学院：{{ item.departmentName }}</span>
              <span class="type">任课老师: {{ item.teacherName }}</span>
              <span class="type">班级: {{ item.className }}</span>
              <p class="type">课程介绍：{{ item.description }}</p>
            </div>
          </div>
          <el-button text type="primary" @click="updateCourse(item)"
            >修改课程</el-button
          >
          <el-button text type="danger" @click="deleteCourse(item.courseId)"
            >删除课程
          </el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="updateVisible" title="修改课程" width="600">
      <el-form label-width="auto">
        <el-form-item label="课程名">
          <el-input
            v-model="courseInfo.courseName"
            style="width: 240px"
            placeholder="Please input"
        /></el-form-item>
        <el-form-item label="介绍">
          <el-input
            v-model="courseInfo.description"
            style="width: 240px"
            placeholder="Please input" /></el-form-item
        ><el-form-item label="学院">
          <el-select
            v-model="courseInfo.departmentId"
            placeholder="Select"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in departmentList"
              :key="item.id"
              :label="item.department"
              :value="item.id"
            /> </el-select></el-form-item
        ><el-form-item label="班级">
          <el-select
            v-model="courseInfo.classId"
            placeholder="Select"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.className"
              :value="item.id"
            /> </el-select></el-form-item
        ><el-form-item label="老师">
          <el-select
            v-model="courseInfo.teacherId"
            placeholder="Select"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in TeacherList"
              :key="item.id"
              :label="item.nickname"
              :value="item.id"
            /> </el-select
        ></el-form-item>
      </el-form>
      <el-button @click="cancleUpdateCourse">取消</el-button>
      <el-button type="primary" @click="doUpdateCourse">确认</el-button>
    </el-dialog>
    <el-button
      @click="createCourse"
      style="position: fixed; margin-left: 95vw"
      type="primary"
      :icon="Edit"
      circle
    />

    <el-dialog v-model="editVisible" title="新增课程" width="400">
      <el-form label-position="right">
        <el-form-item label="课程名">
          <el-input
            v-model="newCourseInfo.courseName"
            style="width: 240px"
            placeholder="Please input"
        /></el-form-item>
        <el-form-item label="介绍">
          <el-input
            v-model="newCourseInfo.description"
            style="width: 240px"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="学院">
          <el-select
            v-model="newCourseInfo.departmentId"
            placeholder="Select"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in departmentList"
              :key="item.id"
              :label="item.department"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select
            v-model="newCourseInfo.classId"
            placeholder="Select"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.className"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="老师">
          <el-select
            v-model="newCourseInfo.teacherId"
            placeholder="Select"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in TeacherList"
              :key="item.id"
              :label="item.nickname"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="任课周数">
          <el-input-number
            v-model="newCourseInfo.endDate"
            :min="1"
            :max="120"
            class="custom-select"
          />
        </el-form-item>
      </el-form>
      <el-button @click="cancleCreateCourse">取消</el-button>
      <el-button type="primary" @click="doCreateCourse">创建</el-button>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.course-card {
  height: 240px;
  margin-top: 10px;
  border-radius: 15px;
  &:hover {
    transform: scale(1.02);
  }
  .type {
    font-size: 12px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
  }

  .desc {
    height: 80px;
    width: 100%;
    overflow: hidden;
  }
  .link {
    float: right;
    margin-top: 8px;
    padding: 0;
    min-height: auto;
  }
}
</style>
