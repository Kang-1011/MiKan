<template>
  <v-navigation-drawer color="#1E1E1E" class="sidebar" model-value app>
    <!-- Avatar Section -->
    <div class="pt-11 pa-4 text-center">
      <label for="avatar-upload" class="avatar-container">
        <v-sheet
          color="#FF3D00"
          class="rounded-lg d-flex align-center justify-center mx-auto"
          width="160"
          height="160"
          style="cursor: pointer; overflow: hidden; position: relative"
        >
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            alt="User Avatar"
            class="avatar-image"
          />
          <v-icon v-else color="white" size="36">mdi-plus</v-icon>

          <!-- Hover Remove Button -->
          <v-btn
            icon
            x-small
            class="remove-btn"
            v-if="avatarUrl"
            @click.stop.prevent="removeAvatar"
          >
            <v-icon color="grey lighten-1">mdi-close</v-icon>
          </v-btn>
        </v-sheet>
      </label>

      <!-- Hidden File Input -->
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        @change="handleAvatarUpload"
        style="display: none"
      />

      <div class="white--text text-h5 font-weight-bold mt-4">Hello, User!</div>
      <div class="grey--text text-body-1">Employee</div>
      <v-divider
        class="my-4"
        color="white lighten-5"
        style="border-width: 2px"
      />
    </div>

    <!-- Navigation Links -->
    <v-list nav dense color="transparent">
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        @click="sidebarNavigation(item.routePath)"
        link
        class="px-5 text-h6 mb-5"
      >
        <div class="d-flex align-center">
          <v-icon color="grey darken-1" class="mr-3">{{ item.icon }}</v-icon>
          <span class="grey--text text--lighten-1">{{ item.title }}</span>
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const avatarUrl = ref(null);

// Load from localStorage on component mount
onMounted(() => {
  const savedImage = localStorage.getItem("user-avatar");
  if (savedImage) {
    avatarUrl.value = savedImage;
  }
});

const handleAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      avatarUrl.value = reader.result;
      localStorage.setItem("user-avatar", reader.result);
      event.target.value = null; // ✅ Reset input so same file can be selected again
    };
    reader.readAsDataURL(file);
  } else {
    event.target.value = null; // ✅ Also reset if invalid file
  }
};
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

const sidebarNavigation = (routePath) => {
  console.log("Navigation to:", routePath);
  router.push(routePath);
};

const removeAvatar = () => {
  avatarUrl.value = null;
  localStorage.removeItem("user-avatar");
};
</script>

<style scoped>
.sidebar {
  width: 280px;
}

.rounded-lg {
  border-radius: 8px !important;
}

.avatar-container:hover .remove-btn {
  opacity: 1;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
</style>
