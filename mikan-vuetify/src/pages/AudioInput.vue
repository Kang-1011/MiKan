<template>
    <Sidebar></Sidebar>
    <v-app>
    <v-main style="height: 100vh" class="pa-3 unified-background">
        <v-card class="fill-height rounded-v1 border-1 " flat>
            <v-card border="0" flat style="height: 100%;" class="page-background">
                <v-card-title class="d-flex align-center justify-space-between">
                    <div>New Meeting</div>
                </v-card-title>

                <v-container class="fill-height">
                    <!-- <div class="text-center mb-12">
                        <h1 class="text-h4 text-md-h3 font-weight-bold mb-3">Create a Story</h1>
                        <h2 class="text-h6 text-md-h5 font-weight-regular text-grey-lighten-1 mb-4">
                            How Do You Want to Start Your Story?
                        </h2>
                        <a href="#" class="text-blue-lighten-2">
                            Learn more about creating a story <v-icon size="small">mdi-arrow-right</v-icon>
                        </a>
                    </div> -->
                    <AudioRecordDialog v-model="audioRecordDialog" />
                    <AudioUploadDialog v-model="audioUploadDialog" @close-dialog="audioUploadDialog = false"/>

                    <v-row class="d-flex align-center justify-center ">
                        <!-- Live Transcription Card -->
                        <v-col cols="12" md="5" lg="4">
                            <v-card class="story-card rounded-xl pa-4 text-center d-flex flex-column" height="100%"
                                @click="audioRecordDialog = true">
                                <!-- Red Glowing Icon -->
                                <div class="icon-container">
                                    <!-- <div class="glow-circle outer-glow glow-red"></div>
                                    <div class="glow-circle middle-circle border-red"></div>
                                    <div class="glow-circle inner-circle"> -->
                                    <div class="glow-circle"></div>
                                    <div class="glow-circle middle-circle"></div>
                                    <div class="glow-circle inner-circle">
                                    <v-icon color="black" size="40">mdi-microphone-outline</v-icon>
                                </div>
                                </div>

                                <v-card-title class="font-weight-bold text-h5">Live Transcription</v-card-title>
                                <v-card-text class="text-grey-lighten-1 flex-grow-1">
                                    Transcribe audio in real time using your microphone. Ideal for capturing
                                    discussions as they happen.
                                </v-card-text>

                                <v-card-actions class="mt-4">
                                    <v-btn block size="large" class="text-capitalize rounded-lg" color="#4a4959"
                                        outlined @click="audioRecordDialog = true">
                                        Start Live Recording
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>

                        <!-- Audio Upload Card -->
                        <v-col cols="12" md="5" lg="4">
                            <v-card class="story-card rounded-xl pa-4 text-center d-flex flex-column" height="100%"
                                @click="audioUploadDialog = true">
                                <!-- Blue Glowing Icon -->
                                <div class="icon-container">
                                    <!-- <div class="glow-circle outer-glow glow-blue"></div>
                                    <div class="glow-circle middle-circle border-blue"></div>
                                    <div class="glow-circle inner-circle"> -->
                                    <div class="glow-circle"></div>
                                    <div class="glow-circle middle-circle"></div>
                                    <div class="glow-circle inner-circle">
                                        <v-icon color="black" size="40">mdi-upload-outline</v-icon>
                                    </div>
                                </div>

                                <v-card-title class="font-weight-bold text-h5">Transcribe Recording</v-card-title>
                                <v-card-text class="text-grey-lighten-1 flex-grow-1">
                                    Upload an existing audio file to generate a transcript from a previous meeting,
                                    interview, or voice memo.
                                </v-card-text>

                                <v-card-actions class="mt-4">
                                    <v-btn block size="large" class="text-capitalize rounded-lg" color="#4a4959"
                                        outlined @click="audioUploadDialog = true">
                                        Upload Audio File
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-card>
    </v-main>
</v-app>
</template>

<script setup lang="ts">
const audioRecordDialog = ref(false);
const audioUploadDialog = ref(false);
</script>

<style scoped>
/* --- Base Styling and Custom Theme --- */
/* In a real project, some of these might be global styles */
/* :global(.v-application) {
    background-color: #21202c !important;
    font-family: 'Inter', sans-serif;
} */
/* :global(.v-application) {
    font-family: 'Inter', sans-serif;
} */

/* Custom card styling */
/* .story-card {
    background-color: #2c2b3a !important;
    border: 1px solid #3e3d4e !important;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
} */
.story-card {
    border: 1px solid #3e3d4e !important;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.story-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* --- Icon Glow Effect --- */
.icon-container {
    position: relative;
    width: 140px;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 24px;
}

.glow-circle {
    position: absolute;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* The outer-most glowing circle */
.outer-glow {
    width: 100%;
    height: 100%;
}

.glow-red {
    box-shadow: 0 0 45px 5px rgba(255, 77, 77, 0.4);
}

.glow-blue {
    box-shadow: 0 0 45px 5px rgba(59, 130, 246, 0.4);
}

/* The middle, darker circle */
.middle-circle {
    width: 110px;
    height: 110px;
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid;
}

.border-red {
    border-color: rgba(255, 77, 77, 0.3);
}

.border-blue {
    border-color: rgba(59, 130, 246, 0.3);
}

/* The inner circle holding the icon */
.inner-circle {
    width: 80px;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.2);
}

.fill-height {
    height: 100%;
    /* Make sure it fills the full screen */
}

.card-1 {
    border: thin solid lightgray;
    box-shadow: none;
}
</style>