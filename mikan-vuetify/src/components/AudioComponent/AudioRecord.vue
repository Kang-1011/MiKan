<template>
  <v-container>
    <v-card class="mx-auto border" max-width="500" rounded="xl" variant="solo">
      <v-row class="mt-2">
        <v-col class="d-flex justify-center">
          <div>
            <AVMedia
              :media="stream"
              type="frequ"
              frequ-direction="mo"
              :frequ-lnum="60"
              line-color="darkorange"
            />
          </div>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center align-center mb-4">
        <v-col cols="auto">
          <v-img
            :src="enabled ? pauseImage : recordImage"
            width="100"
            height="100"
            class="rounded-circle cursor-pointer"
            cover
            @click="enabled = !enabled"
          />
        </v-col>
        <v-col cols="auto">
          <v-img
            src="@/assets/stop.png"
            width="100"
            height="100"
            class="rounded-circle cursor-pointer"
            cover
            @click="stopRecording"
          />
          <v-dialog v-model="dialog" max-width="400" persistent>
            <v-card>
              <v-card-title class="text-h5"> Recording Stopped </v-card-title>
              <v-card-text>
                Your recording has been successfully stopped and saved. Parse it
                now?
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="bg-black text-white"
                  prepend-icon="mdi-check"
                  text
                  @click="dialog = false"
                  width="100"
                >
                  OK
                </v-btn>
                <v-btn
                  class="bg-white text-black"
                  prepend-icon="mdi-close"
                  variant="outlined"
                  text
                  @click="dialog = false"
                  width="100"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { AVMedia } from "vue-audio-visual";
import { useUserMedia } from "@vueuse/core";
import recordImage from "@/assets/record.webp";
import stopImage from "@/assets/stop.png";
import pauseImage from "@/assets/pause.webp";

const { stream, enabled } = useUserMedia();
const dialog = ref(false);

onMounted(() => {
  enabled.value = true;
});

function stopRecording() {
  enabled.value = false;
  dialog.value = true; // Show the notification dialog
}
</script>
