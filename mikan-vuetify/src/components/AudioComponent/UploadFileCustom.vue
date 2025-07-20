<template>
  <div class="d-flex flex-column gap-4 rounded-xl px-6 py-8">
    <div class="d-flex justify-space-between align-center"></div>

    <v-list>
      <v-list-item
        v-for="(file, index) in files"
        :key="index"
        class="mb-2 py-2 rounded-lg border-md bg-white"
      >
        <template v-slot:prepend>
          <v-icon size="24">mdi-file</v-icon>
        </template>
        <v-list-item-title @click="openFile(file)">
          {{ file.name }}
        </v-list-item-title>

        <v-list-item-subtitle>{{
          file.size ? (file.size / 1024 / 1024).toFixed(2) + " MB" : "N/A"
        }}</v-list-item-subtitle>

        <template v-slot:append>
          <v-btn icon variant="flat" class="border-md">
            <v-icon size="24" @click="$emit('removeFile', index)"
              >mdi-delete</v-icon
            >
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
defineProps({
  files: {
    type: Array,

    required: true,
  },
});

defineEmits(["removeFile"]);

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
  } else {
    alert("Unsupported file type.");
  }
};
</script>

<style scoped>
.clickable {
  color: #1976d2;
  cursor: pointer;
  text-decoration: underline;
}
</style>
