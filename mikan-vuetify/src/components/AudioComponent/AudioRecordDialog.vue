<template>
    <v-dialog max-width="500px" min-height="450px" :persistent="started && !stopped">
        <v-card class="rounded-xl pa-2">
            <v-card-title class="ml-3">Record</v-card-title>

            <v-card-text align="center">
                <v-sheet min-height="200px" class="d-flex align-center justify-center text-center">
                    <div v-if="!started">
                        <h3>Press the button below to start recording</h3>
                    </div>
                    <div v-else>
                        <AVMedia :media="stream" type="frequ" :canv-width="360" :canv-height="120" frequ-direction="mo"
                            :frequ-lnum="60" line-color="red" :line-width="2" />
                        <h3>{{ formattedTime }}</h3>
                    </div>
                </v-sheet>

                <div v-if="stopped && audioUrl" class="mt-3">
                    <audio :src="audioUrl" controls></audio>
                    <p>Recording complete. Press "Transcribe" to proceed.</p>
                </div>

                <!-- Structured this way to ensure record button and (pauseResume + stop) buttons are aligned -->
                <v-card v-if="!started" min-height="100px" elevation="0">
                    <v-btn size="64" icon @click="startRecording" variant="flat">
                        <v-icon size="64" color="red" class="circle-border-icon">mdi-record</v-icon>
                    </v-btn>
                </v-card>
                <v-card v-if="started && !stopped" min-height="100px" elevation="0">
                    <v-row justify="center" style="gap: 100px;">
                        <v-col cols="auto">
                            <v-btn size="64" icon @click="pauseResumeRecording" variant="flat">
                                <v-icon size="64" color="red" class="circle-border-icon"
                                    :icon="isPaused ? 'mdi-play' : 'mdi-pause'" />
                            </v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn size="64" icon @click="stopRecording" variant="flat">
                                <v-icon size="64" color="red" class="circle-border-icon">mdi-stop</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-card-text>

            <v-card-actions class="justify-end mb-2">
                <div v-if="stopped">
                    <v-btn @click="resetRecording" variant="outlined" class="text-body-2 mr-2 rounded-lg"
                        color="grey-darken-1" :disabled="isTranscribing">
                        Retake
                    </v-btn>
                    <v-btn @click="transcribeRecordedAudio" variant="flat" class="text-body-2 mr-4 rounded-lg"
                        color="black" :loading="isTranscribing">
                        Transcribe
                    </v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { AVMedia } from 'vue-audio-visual'
import { useUserMedia } from '@vueuse/core'
import axios from 'axios'

const router = useRouter()

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
        const response = await axios.post('http://127.0.0.1:8000/transcribe', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log("Transcription successful:", response.data);

        // Navigate to the transcripts page, passing the result as state
        // Note: 'state' is not persisted on page refresh. For persistence, use query params or localStorage.
        // router.push({ 
        //     name: 'TranscriptsHomepage', // Ensure this route name is correct
        //     state: { transcript: response.data } 
        // });

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
</style>