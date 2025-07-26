<template>
	<v-dialog max-width="500px" min-height="350px">
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
					<v-stepper-item :value="2" title="Upload" />
				</v-stepper-header>

				<v-stepper-window>
					<v-stepper-window-item :value="1">
						<div>
							<div style="height: 225px;">
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
								<v-btn color="black" variant="flat" class="text-body-2 rounded-lg" @click="goToStep2" >
									Next
								</v-btn>
							</div>
						</div>
					</v-stepper-window-item>

					<v-stepper-window-item :value="2">
						<div>
							<div style="height: 225px;">
								<div v-if="!hasUploaded"
									class="upload-area d-flex flex-column align-center justify-center"
									@dragover.prevent="isDragging = true" @dragleave="isDragging = false"
									@drop.prevent="handleDrop" :class="{ 'drag-over': isDragging }">
									<v-btn height="56" @click="triggerFileInput" variant="flat">
										<v-icon size="50">mdi-file-upload-outline</v-icon>
									</v-btn>
									<p>
										Drop your recording here,
										<a @click="triggerFileInput" style="cursor: pointer">
											<u>or click to browse</u>
										</a>
									</p>
								</div>

								<div v-else>
									<UploadFileCustom :files="uploadedFiles" @remove-file="removeFile" />
								</div>

								<div v-if="!hasUploaded" class="d-flex justify-space-between">
									<div>
										<span class="mt-1 text-caption">&#9432;</span>
										<span class="mt-1 text-caption">
											Supported files: .mp3, .wav
										</span>
									</div>
									<div>
										<span class="mt-1 text-caption">
											Maximum size: 100MB
										</span>
									</div>
								</div>
							</div>

							<div class="d-flex justify-space-between">
								<!-- <v-btn color="black" variant="outlined" class="text-body-2 mr-2 rounded-lg" @click="$emit('close-dialog')">Cancel</v-btn> -->
								<v-btn color="black" variant="flat" class="text-body-2 rounded-lg" @click="step--">
									Previous
								</v-btn>
								<v-btn color="black" variant="flat" class="text-body-2 rounded-lg"
									@click="transcribeUploadedAudio" :loading="isTranscribing" :disabled="!hasUploaded">
									Transcribe
								</v-btn>
							</div>
						</div>
					</v-stepper-window-item>
				</v-stepper-window>
			</v-stepper>
			<input type="file" ref="fileInput" style="display: none" @change="handleFileSelection"
				accept="audio/mp3,audio/wav" />
		</v-card>
	</v-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import UploadFileCustom from "../AudioComponent/UploadFileCustom.vue";

import { useProjectStore } from '@/stores/projects'
import { useTranscriptStore } from "@/stores/transcriptstore";
const transcriptStore = useTranscriptStore();

const isDragging = ref(false);
const hasUploaded = ref(false);
const uploadedFiles = ref([]);
const fileInput = ref(null);

const audioFile = ref(null);
const isTranscribing = ref(false);

const router = useRouter();

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

defineEmits(["close-dialog"]);

const triggerFileInput = () => {
	fileInput.value.click();
};

const handleFiles = (files) => {
	if (files.length > 0) {
		uploadedFiles.value = [...uploadedFiles.value, ...files];
		hasUploaded.value = true;
	}
};

const handleFileSelection = (event) => {
	const files = Array.from(event.target.files);
	audioFile.value = event.target.files[0];

	handleFiles(files);
	event.target.value = "";
};

const handleDrop = (event) => {
	const files = Array.from(event.dataTransfer.files);
	handleFiles(files);
	isDragging.value = false;
};

const removeFile = (index) => {
	uploadedFiles.value.splice(index, 1);

	if (uploadedFiles.value.length === 0) {
		hasUploaded.value = false;
		isDragging.value = false;
	}
};

async function transcribeUploadedAudio() {
	if (!audioFile.value) {
		alert("No recording available to transcribe.");
		return;
	}

	isTranscribing.value = true;
	const formData = new FormData();
	formData.append('file', audioFile.value);

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
.upload-area {
	border: 1px dashed black;
	border-radius: 10px;
	padding: 32px;
	width: 100%;
}

.no-shadow {
	box-shadow: none !important;
}
</style>
