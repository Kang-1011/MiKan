<template>
	<v-dialog max-width="500px" min-height="350px">
		<v-card class="rounded-xl pa-2">
			<v-card-title class="ml-3">Upload Recording</v-card-title>

			<v-card-text>
				<div v-if="!hasUploaded" class="upload-area d-flex flex-column align-center justify-center"
					@dragover.prevent="isDragging = true" @dragleave="isDragging = false" @drop.prevent="handleDrop"
					:class="{ 'drag-over': isDragging }">
					<v-btn class="mt-5" height="56" @click="triggerFileInput" variant="flat">
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
					<UploadfileCustom :files="uploadedFiles" @remove-file="removeFile" />
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
			</v-card-text>

			<v-card-actions class="justify-end mb-2">
				<v-btn color="black" variant="outlined" class="text-body-2 mr-2 rounded-lg" @click="$emit('close-dialog')">Cancel</v-btn>
				<v-btn color="black" variant="flat" class="text-body-2 mr-4 rounded-lg" @click="transcribeUploadedAudio"
					:loading="isTranscribing">Transcribe</v-btn>
			</v-card-actions>
			<input type="file" ref="fileInput" style="display: none" @change="handleFileSelection"
				accept="audio/mp3,audio/wav" />
		</v-card>
	</v-dialog>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import UploadfileCustom from "../AudioComponent/UploadfileCustom.vue";

const isDragging = ref(false);
const hasUploaded = ref(false);
const uploadedFiles = ref([]);
const fileInput = ref(null);

const audioFile = ref(null);
const isTranscribing = ref(false);

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
.upload-area {
	border: 1px dashed black;
	border-radius: 10px;
	padding: 32px;
	width: 100%;
}
</style>
