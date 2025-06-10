<template>
  <div class="bordered-section d-flex flex-column gap-4 rounded-xl px-6 py-8">
    <div class="d-flex justify-space-between align-center">
      <h3 class="text-h6 font-weight-bold text-black">Uploaded Files</h3>

      <v-btn color="primary" variant="text" @click="$emit('addMore')">
        <v-icon left>mdi-plus</v-icon>

        Add More
      </v-btn>
    </div>

    <v-list class="rounded-lg" style="background-color: #f5f5f5">
      <v-list-item
        v-for="(file, index) in files"
        :key="index"
        class="mb-2 rounded-lg bg-white"
        elevation="1"
      >
        <template v-slot:prepend>
          <v-icon color="primary">mdi-file-music</v-icon>
        </template>
        <v-list-item-title class="clickable" @click="$emit('openFile', file)">
          {{ file.name }}
        </v-list-item-title>

        <v-list-item-subtitle>{{
          file.size ? (file.size / 1024 / 1024).toFixed(2) + " MB" : "N/A"
        }}</v-list-item-subtitle>

        <template v-slot:append>
          <v-btn
            icon="mdi-close"
            variant="text"
            density="comfortable"
            @click="$emit('removeFile', index)"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>

    <v-btn
      class="start-recording-button mt-4"
      block
      height="56"
      rounded="xl"
      :disabled="files.length === 0"
      @click="$emit('convert')"
    >
      <span class="mr-2">Convert to Meeting Minutes</span>

      <v-icon right size="24">mdi-text-box-check</v-icon>
    </v-btn>
  </div>
</template>

<script setup>
defineProps({
  files: {
    type: Array,
    required: true,
  },
});

defineEmits(["addMore", "removeFile", "convert"]);

const openFile = (file) => {
  const fileURL = URL.createObjectURL(file);

  if (file.type.startsWith("audio/")) {
    const audioWindow = window.open("", "_blank");
    audioWindow.document.write(`
      <html><head><title>${file.name}</title></head>
      <body style="margin:0;padding:2rem;font-family:sans-serif;">
        <h3>Now Playing: ${file.name}</h3>
        <audio controls autoplay style="width:100%;">
          <source src="${fileURL}" type="${file.type}">
          Your browser does not support the audio element.
        </audio>
      </body></html>
    `);
  } else if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
    window.open(fileURL, "_blank");
  } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
    window.open(fileURL, "_blank");
  } else {
    alert("Unsupported file type.");
  }
};
</script>

<style scoped>
.start-recording-button {
  background-color: #ff3d00 !important;
  color: white !important; /* Added to
  text-transform: none; /* Prevent default button uppercase */
  letter-spacing: 0.015em; /* Corresponds to tracking-[0.015em] */
  font-weight: bold; /* Corresponds to font-bold */
  font-size: 1.1rem;
}

.clickable {
  color: #1976d2;
  cursor: pointer;
  text-decoration: underline;
}
</style>
