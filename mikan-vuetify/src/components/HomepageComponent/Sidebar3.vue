<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    rail-width="90"
    border="0"
    @click="rail = false"
  >
    <v-card class="pa-3 fill-height bg-grey-lighten-4">
      <v-card class="fill-height d-flex flex-column rounded-xl card-1" flat>
        <div class="sidebar-content align-center">
          <v-list density="compact" nav>
            <v-list-item
              value="toggle"
              class="cursor-pointer rounded-xl"
              @click.stop="rail = !rail"
              :active="false"
            >
              <template #prepend>
                <v-icon size="24" class="icon-left-padding">
                  {{ rail ? "mdi-menu" : "mdi-menu-open" }}
                </v-icon>
              </template>
              <v-list-item-title class="text-h6 font-weight-bold">
                MIKAN.AI
              </v-list-item-title>
            </v-list-item>
          </v-list>

          <v-divider />

          <v-list density="compact" nav>
            <v-list-item
              class="rounded-xl"
              :to="{ path: '/AudioInput' }"
              exact
              :active="false"
            >
              <template #prepend>
                <v-icon size="24" class="icon-left-padding"
                  >mdi-plus-circle-outline</v-icon
                >
              </template>
              <v-list-item-title>New Meeting</v-list-item-title>
            </v-list-item>

            <v-list-item
              class="rounded-xl"
              :to="{ path: '/ManagerReviewV2' }"
              exact
              :active="false"
            >
              <template #prepend>
                <v-icon size="24" class="icon-left-padding"
                  >mdi-file-sign</v-icon
                >
              </template>
              <v-list-item-title>Manager Review</v-list-item-title>
            </v-list-item>

            <v-list-item
              class="rounded-xl"
              :to="{ path: '/Kanban-2' }"
              exact
              :active="false"
            >
              <template #prepend>
                <v-icon size="24" class="icon-left-padding"
                  >mdi-format-list-checkbox</v-icon
                >
              </template>
              <v-list-item-title>My Tasks</v-list-item-title>
            </v-list-item>
          </v-list>

          <v-divider class="mx-2" />

          <v-list density="compact" nav>
            <!-- Projects Header -->
            <v-list-item
              class="cursor-pointer rounded-xl"
              style="align-items: center; min-height: 48px"
              @click="isOpen = !isOpen"
            >
              <template #prepend>
                <v-icon size="24" class="icon-left-padding"
                  >mdi-folder-outline</v-icon
                >
              </template>

              <v-list-item-title
                style="font-weight: bold; font-size: 1.125rem; line-height: 1.6"
              >
                Projects
              </v-list-item-title>

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
            <!-- Project Items List (no transition) -->
            <div v-if="isOpen" class="px-2">
              <v-list-item
                v-for="proj in projectItems"
                :key="proj"
                class="rounded-xl"
                @click="handleClick(proj)"
                density="compact"
              >
                <div class="d-flex align-center" style="gap: 20px">
                  <v-icon color="grey" size="20" class="pl-5"
                    >mdi-circle-medium</v-icon
                  >
                  <v-list-item-title v-if="!rail">{{ proj }}</v-list-item-title>
                </div>
              </v-list-item>
            </div>
          </v-list>
        </div>

        <div class="sidebar-footer">
          <v-divider />
          <v-list>
            <v-list-item class="rounded-xl">
              <template #prepend>
                <v-icon size="24" class="icon-footer-padding"
                  >mdi-account</v-icon
                >
              </template>

              <v-list-item-title>John Leider</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-card>
    </v-card>
  </v-navigation-drawer>
</template>

<!-------------------------------------------SCRIPT---------------------------------------->

<script setup lang="ts">
import { ref, computed, defineEmits, watch } from "vue";
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
  router.push({
    path: "/Kanban-3",
    query: { board: name },
  });
}

watch(rail, (newVal) => {
  if (newVal) {
    // Sidebar collapsed
    isOpen.value = false;
  } else {
    // Sidebar expanded
    isOpen.value = true;
  }
});

function createNewProject() {
  console.log("Trigger create new project dialog/modal");
  const newId = Math.max(...boards.value.map((b) => b.id)) + 1;
  boards.value.push({ id: newId, title: "New Project", stages: [] });
}
</script>

<!-------------------------------------------STYLE---------------------------------------->

<style scoped>
.fill-height {
  height: 100%;
}

.card-1 {
  border: thin solid lightgray;
  box-shadow: none;
}

.sidebar-content {
  flex: 1;
}

.sidebar-footer {
  margin-top: auto;
  background-color: rgb(255, 255, 255); /* or whatever background you want */
}

.icon-left-padding {
  padding-left: 8px;
}

.icon-bullet-padding {
  padding-left: 8px;
}

.icon-footer-padding {
  padding-left: 8px;
}

.mikan-title {
  font-weight: bold;
  font-size: 1.125rem; /* ~18px, adjust as needed */
}

.project-item {
  cursor: pointer;
  transition: background-color 0.2s ease;
}
</style>
