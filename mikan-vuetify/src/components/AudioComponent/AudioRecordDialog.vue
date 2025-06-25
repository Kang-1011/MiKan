<template>
    <v-dialog max-width="500px" min-height="400px">
        <v-card class="rounded-xl pa-2">
            <v-card-title class="ml-3">Record</v-card-title>

            <v-card-text align="center">
                <v-sheet min-height="150" class="d-flex align-center justify-center text-center">
                    <div v-if="!started">
                        <h4>Press the button below to start recording</h4>
                    </div>
                    <div v-else>
                        <AVMedia :media="stream" type="frequ" :canv-width="360" :canv-height="120" frequ-direction="mo"
                            :frequ-lnum="60" line-color="red" :line-width="2" />
                    </div>
                </v-sheet>
                <div v-if="!started && !enabled" align="center">
                    <!-- <v-btn icon @click="startRecording" variant="flat" density="compact" aria-label="Record"> -->
                    <!--
                            v-icon: The icon component.
                            size="64": Sets a large size for the icon to accommodate the border and padding.
                            class="record-icon-with-border": Applies our custom styling.
                        -->
                    <!-- <v-icon size="64" color="red" class="record-icon-with-border">
                            mdi-record
                        </v-icon>
                    </v-btn> -->
                    <v-btn size="64" icon @click="startRecording" variant="flat" density="compact">
                        <v-icon size="64" color="red" class="circle-recording-icon">mdi-record</v-icon>
                    </v-btn>
                </div>

                <div v-if="started && !stopped" align="center">
                    <v-row align="center" justify="center" style="gap: 100px;">
                        <v-col cols="auto">
                            <v-btn size="64" icon @click="pauseResumeRecording" variant="flat" density="compact">
                                <v-icon size="64" color="red" class="circle-recording-icon"
                                    :icon="enabled ? 'mdi-pause' : 'mdi-play'" />
                            </v-btn>
                        </v-col>

                        <v-col cols="auto">
                            <v-btn size="64" icon @click="stopRecording" variant="flat" density="compact">
                                <v-icon size="64" color="red" class="circle-recording-icon">mdi-stop</v-icon>
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
                <div v-if="stopped">
                    <v-btn @click="navigateToTranscribe" variant="flat" class="text-body-2 mr-4 rounded-lg"
                        color="black">
                        Transcribe
                    </v-btn>
                </div>
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
const stopped = ref(false);

function startRecording() {
    started.value = true;
    enabled.value = !enabled.value
}

function pauseResumeRecording() {
    enabled.value = !enabled.value
}

function stopRecording() {
    enabled.value = false
    stopped.value = true
}

function navigateToTranscribe() {
    router.push("/TranscriptsHomepage");
}
</script>

<style scoped>
.circle-recording-icon {
    border: 6px solid #616161;
    border-radius: 50%;
    padding: 36px;
    background-color: #efe2e217;
    margin: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.record-icon-with-border {
    border: 6px solid #616161;
    /* The requested border style */
    padding: 10px;
    /* Padding between the icon graphic and the border */
    border-radius: 50%;
    /* Makes the border circular around the icon */
    background-color: #f44336;
    /* Optional: A background color for the icon area */
    color: white;
    /* Optional: Change icon color if background is dark */
    transition: all 0.2s ease-in-out;
    /* Smooth transition for hover effects */
}

/* Hover effect for the icon with border */
.record-icon-with-border:hover {
    background-color: #d32f2f;
    /* Darker red on hover */
    border-color: #424242;
    /* Darker border on hover */
    transform: scale(1.05);
    /* Slightly enlarge on hover */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    /* Subtle shadow on hover */
}
</style>