<template>
    <v-dialog max-width="600px">
        <v-card class="rounded-xl pa-2">
            <v-card-title class="ml-3">Record</v-card-title>

            <v-card-text align="center">
                <AVMedia :media="stream" type="frequ" frequ-direction="mo" :frequ-lnum="60" line-color="red"
                    :line-width="2" />
                <div v-if="!started && !recording" align="center">
                    <v-btn icon @click="startRecording" variant="flat" density="compact">
                        <v-icon size="100" color="red" class="circle-recording-icon">mdi-record</v-icon>
                    </v-btn>
                </div>

                <div v-if="started && !stopped" align="center">
                    <v-row align="center" justify="center" style="gap: 60px;">
                        <v-col cols="auto">
                            <v-btn icon @click="pauseResumeRecording" variant="flat" density="compact">
                                <v-icon size="80" color="red" class="circle-recording-icon"
                                    :icon="recording ? 'mdi-pause' : 'mdi-play'" />
                            </v-btn>
                        </v-col>

                        <v-col cols="auto">
                            <v-btn icon @click="stopRecording" variant="flat" density="compact">
                                <v-icon size="80" color="red" class="circle-recording-icon">mdi-stop</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <!-- <v-row justify="center">
                        <div align="center">
                            <v-btn icon @click="pauseResumeRecording" variant="flat" density="compact">
                                <v-icon size="100"
                                    :icon="recording ? 'mdi-pause-circle-outline' : 'mdi-play-circle-outline'" />
                            </v-btn>
                        </div>
                        <v-btn icon @click="stopRecording" variant="flat" density="compact">
                            <v-icon size="100">mdi-stop-circle-outline</v-icon>
                        </v-btn>
                    </v-row> -->
                </div>
            </v-card-text>

            <v-card-actions class="justify-end mb-2">
                <!-- <v-btn color="black" variant="outlined" class="text-body-2 mr-2" rounded="lg"
                    @click="closeDialog">Cancel</v-btn>

                <v-btn color="black" variant="flat" class="text-body-2  mr-4" rounded="lg"
                    @click="createDraft">Create</v-btn> -->
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { AVMedia } from 'vue-audio-visual'
import { useUserMedia } from '@vueuse/core'

const showMedia = ref(false)
const { stream, enabled } = useUserMedia()

watch(enabled, () => {
    if (showMedia.value) {
        return
    }

    if (enabled) {
        showMedia.value = true
    }
})

const started = ref(false);
const recording = ref(false);
const stopped = ref(false);

function startRecording() {
    started.value = true;
    recording.value = !recording.value;
    enabled.value = !enabled.value
}

function pauseResumeRecording() {
    recording.value = !recording.value;
    enabled.value = !enabled.value
}

function stopRecording() {
    recording.value = !recording.value;
    enabled.value = !enabled.value
    stopped.value = true
}
</script>

<style scoped>
/* Circular border */
.circle-recording-icon {
    border: 6px solid #616161;
    /* Amber border */
    border-radius: 50%;
    /* Makes it circular */
    padding: 6px;
    /* Adjust padding to control circle size */
    background-color: #efe2e217;
    /* Light background inside the circle */
    margin: 6px;
}
</style>