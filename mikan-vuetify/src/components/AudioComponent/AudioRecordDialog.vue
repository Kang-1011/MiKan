<template>
    <v-dialog max-width="500px" min-height="350px" :persistent="started && !stopped">
        <v-card class="rounded-xl pa-2">
            <v-card-title class="ml-3 pb-0">
				<div class="d-flex justify-space-between align-center">
					<div>Transcribe</div>
					<v-btn icon flat @click="$emit('close-dialog')">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</div>
			</v-card-title>

            <v-stepper v-model="step" class="no-shadow">
                <v-stepper-header class="no-shadow">
                    <v-stepper-item :value="1" title="Configuration" />
                    <v-divider></v-divider>
                    <v-stepper-item :value="2" title="Record" />
                </v-stepper-header>

                <v-stepper-window>
                    <v-stepper-window-item :value="1">
                        <div>
                            <div style="height: 275px;">
                                <v-form ref="configForm" lazy-validation>
                                    <v-text-field v-model="location" label="Location" clearable variant="outlined"
                                        density="compact" rounded="lg" class="mb-1 mt-2"
                                        :rules="[(v) => !!v || 'Location is required']" />

                                    <v-select v-model="project" :items="projectOptions" item-title="title"
                                        item-value="id" label="Project" clearable variant="outlined" density="compact"
                                        rounded="lg" class="mb-1" :rules="[(v) => !!v || 'Project is required']" />

                                    <v-select v-model="mode" :items="['Summary', 'Kanban']" label="Mode" clearable
                                        variant="outlined" density="compact" rounded="lg" class="mb-1"
                                        :rules="[(v) => !!v || 'Transcription mode is required']" />
                                </v-form>
                            </div>
                            <div class="d-flex justify-space-between">
                                <v-btn color="black" variant="flat" class="text-body-2 rounded-lg"
                                    :disabled="step == 1">
                                    Previous
                                </v-btn>
                                <v-btn color="black" variant="flat" class="text-body-2 rounded-lg" @click="goToStep2">
                                    Next
                                </v-btn>
                            </div>
                        </div>
                    </v-stepper-window-item>

                    <v-stepper-window-item :value="2" align="center">
                        <div>
                            <div style="height: 275px;">
                                <div style="height: 125px;" class="d-flex align-center justify-center text-center">
                                    <div v-if="!started">
                                        <p class="audio-record-text">Press the button below to start recording</p>
                                    </div>
                                    <div v-if="started">
                                        <AVMedia :media="stream" type="frequ" :canv-width="360" :canv-height="120"
                                            frequ-direction="mo" :frequ-lnum="60" line-color="red" :line-width="2" />
                                        <p class="audio-record-text">{{ formattedTime }}</p>
                                    </div>
                                </div>

                                <div v-if="stopped && audioUrl" class="mt-4">
                                    <audio :src="audioUrl" controls></audio>
                                    <p class="text-subtitle-1">Recording complete. Press "Transcribe" to proceed.</p>
                                </div>

                                <!-- Structured this way to ensure record button and (pauseResume + stop) buttons are aligned -->
                                <div v-if="!started" style="height: 150px;" elevation="0">
                                    <v-btn size="64" icon @click="startRecording" variant="flat">
                                        <v-icon size="64" color="red" class="circle-border-icon">mdi-record</v-icon>
                                    </v-btn>
                                </div>
                                <div v-if="started && !stopped" style="height: 150px;" elevation="0">
                                    <div class="d-flex justify-space-around">
                                        <v-btn size="64" icon @click="pauseResumeRecording" variant="flat">
                                            <v-icon size="64" color="red" class="circle-border-icon"
                                                :icon="isPaused ? 'mdi-play' : 'mdi-pause'" />
                                        </v-btn>
                                        <v-btn size="64" icon @click="stopRecording" variant="flat">
                                            <v-icon size="64" color="red"
                                                class="circle-border-icon">mdi-stop</v-icon>
                                        </v-btn>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex justify-space-between">
                                <!-- <v-btn color="black" variant="outlined" class="text-body-2 mr-2 rounded-lg" @click="$emit('close-dialog')">Cancel</v-btn> -->
                                <v-btn v-if="!started" @click="step--" color="black" variant="flat"
                                    class="text-body-2 rounded-lg">
                                    Previous
                                </v-btn>
                                <v-btn v-if="started" @click="resetRecording" color="black" variant="flat"
                                    class="text-body-2 rounded-lg" :disabled="isTranscribing || !stopped">
                                    Retake
                                </v-btn>
                                <v-btn @click="transcribeRecordedAudio" color="black" variant="flat"
                                    class="text-body-2 rounded-lg" :loading="isTranscribing" :disabled="!stopped">
                                    Transcribe
                                </v-btn>
                            </div>
                        </div>
                    </v-stepper-window-item>
                </v-stepper-window>
            </v-stepper>            
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { AVMedia } from 'vue-audio-visual'
import { useUserMedia } from '@vueuse/core'
import axios from 'axios'

import { useProjectStore } from '@/stores/projects'
import { useTranscriptStore } from "@/stores/transcriptstore";
const transcriptStore = useTranscriptStore();
const router = useRouter()

const step = ref(1)
const configForm = ref(null); // instead of using $refs directly
const location = ref("GLC Meeting Room 1")
const project = ref("")
const mode = ref("")
const projectStore = useProjectStore()
onMounted(() => {
    if (projectStore.projects.length === 0) {
        projectStore.fetchProjects()
    }
})
const projectOptions = computed(() => projectStore.projects)
async function goToStep2() {
    const { valid } = await configForm.value.validate();
    if (valid) {
        step.value = 2;
        transcriptStore.loadConfig(location.value, project.value)
    }
}

// For vue-audio-visual
const { stream, enabled } = useUserMedia({ constraints: { audio: true, video: false } });

// State Management for UI
const started = ref(false);
const stopped = ref(false);
const isPaused = ref(false);
const isTranscribing = ref(false);

// For recording
const audioBlob = ref(null);
const audioUrl = ref(null);
const mediaRecorder = ref(null);
const audioChunks = ref([]);

// --- TIMER ---
// For timer
const elapsedTime = ref(0);
const timerInterval = ref(null);

// Format time
const formattedTime = computed(() => {
    const minutes = Math.floor(elapsedTime.value / 60);
    const seconds = elapsedTime.value % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});
// --- END TIMER ---

function resetRecording() { // Reset everything to default state
    enabled.value = false;

    // --- TIMER ---
    // Clear interval and reset time
    if (timerInterval.value) {
        clearInterval(timerInterval.value);
    }
    elapsedTime.value = 0;
    timerInterval.value = null;
    // --- END TIMER ---

    started.value = false;
    stopped.value = false;
    isPaused.value = false;
    audioBlob.value = null; // Clear previous recording

    if (audioUrl.value) {
        URL.revokeObjectURL(audioUrl.value); // Clean up memory
    }
    audioUrl.value = null;
    mediaRecorder.value = null;
    audioChunks.value = []; // Reset chunks for the next recording
}

async function startRecording() {
    resetRecording()
    if (!enabled.value) {
        enabled.value = true; // Request microphone access
    }
    started.value = true;

    // --- TIMER ---
    // Start the timer
    timerInterval.value = setInterval(() => {
        elapsedTime.value++;
    }, 1000);
    // --- END TIMER ---

    try {
        const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.value = new MediaRecorder(newStream, { mimeType: 'audio/webm' });

        mediaRecorder.value.ondataavailable = (event) => {
            audioChunks.value.push(event.data);
        };

        mediaRecorder.value.onstop = () => {
            // Create a single Blob from all collected chunks
            audioBlob.value = new Blob(audioChunks.value, { type: mediaRecorder.value.mimeType });
            audioUrl.value = URL.createObjectURL(audioBlob.value);

            // Stop the microphone track to turn off the browser's recording indicator
            newStream.getTracks().forEach(track => track.stop()); // Stop microphone access
        };

        mediaRecorder.value.start(); // Start recording
    } catch (error) {
        console.error('Error accessing microphone:', error);
    }
}

function pauseResumeRecording() {
    if (mediaRecorder.value) {
        if (mediaRecorder.value.state === 'recording') {
            mediaRecorder.value.pause();
            enabled.value = false; // pause animation
            isPaused.value = true;

            // --- TIMER ---
            // Pause the timer
            clearInterval(timerInterval.value);
            // --- END TIMER ---

        } else if (mediaRecorder.value.state === 'paused') {
            mediaRecorder.value.resume();
            enabled.value = true; // continue animation
            isPaused.value = false;

            // --- TIMER ---
            // Resume the timer
            timerInterval.value = setInterval(() => {
                elapsedTime.value++;
            }, 1000);
            // --- END TIMER ---
        }
    }
}

function stopRecording() {
    if (mediaRecorder.value && mediaRecorder.value.state !== 'inactive') {
        mediaRecorder.value.stop();
    }
    enabled.value = false; // stop animation
    isPaused.value = false;
    stopped.value = true;

    // --- TIMER ---
    // Stop the timer
    clearInterval(timerInterval.value);
    // --- END TIMER ---
}

// --- API Communication ---

async function transcribeRecordedAudio() {
    if (!audioBlob.value) {
        alert("No recording available to transcribe.");
        return;
    }

    isTranscribing.value = true;
    const formData = new FormData();
    // The third parameter 'recording.webm' sets the filename in the request.
    formData.append('file', audioBlob.value, 'recording.webm');

    try {
        const response = await axios.post('http://127.0.0.1:8000/llm_speech_json/transcribe', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log("Transcription successful:", response.data);
        transcriptStore.loadFromLLMJSON(response.data);

        router.push('/TranscriptsHomepage');

    } catch (error) {
        console.error("Error during transcription:", error);
        alert("There was an error sending the audio for transcription.");
    } finally {
        isTranscribing.value = false;
    }
}
</script>

<style scoped>
.circle-border-icon {
    border: 6px solid #616161;
    border-radius: 50%;
    padding: 36px;
    background-color: #efe2e217;
    margin: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.no-shadow {
    box-shadow: none !important;
}

.audio-record-text {
    font-size: 1.25rem;
    font-weight: normal;
}
</style>
