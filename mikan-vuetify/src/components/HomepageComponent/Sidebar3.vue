<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
    rail-width="80"
    border="0"
  >
    <v-card class="pa-3 fill-height bg-grey-lighten-4">
      <v-card class="fill-height d-flex flex-column rounded-xl card-1" flat>
        <div class="sidebar-content align-center">
          <v-list density="compact" nav>
            <v-list-item value="home">
              <template #prepend>
                <v-avatar size="32">
                  <v-img :src="mikanImage" />
                </v-avatar>
              </template>

              <v-list-item-title>Mikan</v-list-item-title>
            </v-list-item>
          </v-list>

          <v-divider />

          <v-list density="compact" nav>
            <v-list-item
              prepend-icon="mdi-home-city"
              title="Meeting Minute"
              value="home"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account"
              title="Manager Review"
              value="account"
              @click="router.push({ path: '/Kanban-2' })"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account-group-outline"
              title="Users"
              value="users"
            ></v-list-item>
          </v-list>

          <v-list density="compact" nav class="border-sm rounded-xl ma-2">
            <!-- Projects Dropdown Trigger (Chevron LEFT, Add Button RIGHT) -->
            <v-list-item class="cursor-pointer pa-0" @click="isOpen = !isOpen">
              <template #prepend>
                <v-icon>{{
                  isOpen ? "mdi-chevron-down" : "mdi-chevron-right"
                }}</v-icon>
              </template>

              <v-list-item-title>Projects</v-list-item-title>

              <template #append>
                <v-btn
                  icon="mdi-plus"
                  color="grey"
                  variant="text"
                  density="compact"
                  @click.stop="createNewProject"
                />
              </template>
            </v-list-item>

            <!-- Dropdown Content -->
            <v-expand-transition class="ml-n2">
              <div v-if="isOpen">
                <v-divider></v-divider>
                <div>
                  <v-list-item
                    v-for="proj in projectItems"
                    :key="proj"
                    prepend-icon="mdi-circle-medium"
                    class="project-item"
                    @click="handleClick(proj)"
                  >
                    <v-list-item-title>{{ proj }}</v-list-item-title>
                  </v-list-item>
                </div>
              </div>
            </v-expand-transition>
          </v-list>
        </div>
        <div class="sidebar-footer">
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
              title="John Leider"
            >
              <template v-slot:append>
                <v-btn
                  icon="mdi-chevron-left"
                  variant="text"
                  @click.stop="rail = !rail"
                />
              </template>
            </v-list-item>
          </v-list>
        </div>
      </v-card>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { boards } from "@/stores/boards";
import mikanImage from "@/assets/mikan.png";

const drawer = ref(true);
const rail = ref(true);
const isOpen = ref(false);
const emit = defineEmits<{
  (e: "select-project", name: string): void;
}>();
const projectItems = computed(() => boards.value.map((b) => b.title));
const router = useRouter();

function handleClick(name: string) {
  // push to the Kanban page path and attach ?board=...
  router.push({
    path: "/Kanban-3",
    query: { board: name },
  });
}

// function handleClick(proj: string) {
//   isOpen.value = false
//   emit('select-project', proj)
// }
// function handleClick(proj: string) {
//   // e.g. https://your-app.com/projects?board=Branding
//   const url = `/Kanban-3?board=${encodeURIComponent(proj)}`
//   window.location.href = url
// }

function createNewProject() {
  console.log("Trigger create new project dialog/modal");
  // You can open a modal or route to a creation form
  // simple example: just push a new empty board
  const newId = Math.max(...boards.value.map((b) => b.id)) + 1;
  boards.value.push({ id: newId, title: "New Project", stages: [] });
}
</script>

<style scoped>
.fill-height {
  height: 100%;
  /* Make sure it fills the full screen */
}

.card-1 {
  border: thin solid lightgray;
  box-shadow: none;
}

.sidebar-content {
  flex: 1; /* This grows to fill available space */
}

.sidebar-footer {
  margin-top: auto; /* This pushes the footer to the bottom */
  border-top: 1px solid #e0e0e0;
  background-color: rgba(0, 0, 0, 0.02);
}
</style>
