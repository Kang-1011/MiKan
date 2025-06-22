<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    rail-width="90"
    border="0"
    @update:rail="handleRailUpdate"
  >
    <v-card class="pa-3 fill-height">
      <div class="sidebar-wrapper fill-height rounded-lg d-flex flex-column">
        <!-- Title and Toggle Button -->
        <div
          class="d-flex align-center justify-between px-2 pt-3"
          style="min-height: 56px"
        >
          <div class="d-flex align-center w-100 justify-space-between">
            <div
              v-if="!rail"
              class="text-h5 font-weight-bold text-black text-center flex-grow-1"
              style="margin-left: 30px"
            >
              MIKAN.AI
            </div>
            <v-btn
              icon
              variant="text"
              size="default"
              @click.stop="toggleRail"
              class="ml-auto"
            >
              <v-icon :size="rail ? 28 : 32">{{
                rail ? "mdi-menu" : "mdi-menu-open"
              }}</v-icon>
            </v-btn>
          </div>
        </div>

        <v-divider class="my-2 mx-2" color="black" style="border-width: 1px" />

        <!-- Navigation -->
        <v-list nav dense class="px-2">
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            @click="sidebarNavigation(item.routePath)"
            link
            class="tight-list-item text-body-1 text-black"
          >
            <div class="d-flex align-center">
              <v-icon color="black" class="mr-2">{{ item.icon }}</v-icon>
              <span v-if="!rail" class="text-black">{{ item.title }}</span>
            </div>
          </v-list-item>
        </v-list>

        <!-- Projects Section -->
        <div
          class="px-2"
          style="min-height: 32px; display: flex; align-items: center"
        >
          <template v-if="!rail">
            <div
              class="text-body-1 font-weight-bold text-uppercase pl-3"
              style="color: #828181"
            >
              Projects
            </div>
          </template>
          <template v-else>
            <v-divider class="w-100" color="black" style="border-width: 1px" />
          </template>
        </div>

        <v-list nav dense class="px-2">
          <v-list-item
            v-for="item in projectItems"
            :key="item.title"
            @click="sidebarNavigation(item.routePath)"
            link
            class="tight-list-item text-body-1 text-black"
          >
            <div class="d-flex align-center">
              <v-icon color="black" class="mr-2">{{ item.icon }}</v-icon>
              <span v-if="!rail" class="text-black">{{ item.title }}</span>
            </div>
          </v-list-item>
        </v-list>

        <!-- Avatar & Greeting -->
        <div
          class="profile-section d-flex align-center mt-auto pb-3 px-4"
          style="min-height: 60px; height: 60px"
        >
          <div class="d-flex align-center justify-center" style="width: 33px">
            <label for="avatar-upload" class="avatar-container">
              <v-sheet
                color="#FF3D00"
                class="rounded-lg d-flex align-center justify-center"
                width="35"
                height="35"
                style="cursor: pointer; overflow: hidden; position: relative"
              >
                <img
                  v-if="avatarUrl"
                  :src="avatarUrl"
                  alt="User Avatar"
                  class="avatar-image"
                />
                <v-icon v-else color="white" size="24">mdi-plus</v-icon>

                <v-btn
                  icon
                  x-small
                  class="remove-btn"
                  v-if="avatarUrl && !rail"
                  @click.stop.prevent="removeAvatar"
                >
                  <v-icon color="grey lighten-1">mdi-close</v-icon>
                </v-btn>
              </v-sheet>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                @change="handleAvatarUpload"
                style="display: none"
              />
            </label>
          </div>

          <div
            v-if="!rail"
            class="d-flex flex-column justify-center"
            style="line-height: 1; margin-left: 12px; gap: 0px"
          >
            <div
              class="text-subtitle-1 font-weight-bold text-black"
              style="margin-bottom: 0; line-height: 1.1"
            >
              Hello, User!
            </div>
            <div
              class="text-body-2 text-black"
              style="margin-top: 0; line-height: 1.1"
            >
              Employee
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const drawer = ref(true);
const rail = ref(true);
const avatarUrl = ref(null);
const router = useRouter();

const menuItems = ref([
  { title: "New Meeting", icon: "mdi-plus-circle", routePath: "/Homepage" },
  {
    title: "Kanban Board",
    icon: "mdi-view-dashboard",
    routePath: "/KanbanPage",
  },
  { title: "My Tasks", icon: "mdi-checkbox-marked", routePath: "/MyTasks4" },
  { title: "Manager Review", icon: "mdi-file", routePath: "/ManagerReview" },
]);

const projectItems = ref([
  { title: "Project 1", icon: "mdi-folder", routePath: "/Project1" },
  { title: "Project 2", icon: "mdi-folder", routePath: "/Project2" },
]);

const toggleRail = () => {
  rail.value = !rail.value;
};

const handleRailUpdate = (val) => {
  rail.value = val;
};

onMounted(() => {
  const savedImage = localStorage.getItem("user-avatar");
  if (savedImage) avatarUrl.value = savedImage;
});

const handleAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      avatarUrl.value = reader.result;
      localStorage.setItem("user-avatar", reader.result);
      event.target.value = null;
    };
    reader.readAsDataURL(file);
  } else {
    event.target.value = null;
  }
};

const removeAvatar = () => {
  avatarUrl.value = null;
  localStorage.removeItem("user-avatar");
};

const sidebarNavigation = (routePath) => {
  router.push(routePath);
};
</script>

<style scoped>
.tight-list-item {
  min-height: 40px !important;
  padding-top: 0 !important;
  padding-left: 12px;
  padding-bottom: 0 !important;
  margin-bottom: 2px !important;
}

.fill-height {
  height: 100%;
}

.sidebar-wrapper {
  background-color: #f5f5f5;
  width: 100%;
  border: thin solid lightgray;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-container:hover .remove-btn {
  opacity: 1;
}

.remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}

.text-black {
  color: #000 !important;
}

.profile-section {
  width: 100%;
}
</style>
