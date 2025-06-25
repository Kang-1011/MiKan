<template>
    <v-app>

        <v-main class="d-flex align-center justify-center">
            <v-container>
                <div class="text-center mb-12">
                    <h1 class="text-h4 text-md-h3 font-weight-bold mb-3">Create a Story</h1>
                    <h2 class="text-h6 text-md-h5 font-weight-regular text-grey-lighten-1 mb-4">
                        How Do You Want to Start Your Story?
                    </h2>
                    <a href="#" class="text-blue-lighten-2">
                        Learn more about creating a story <v-icon size="small">mdi-arrow-right</v-icon>
                    </a>
                </div>
                <AudioRecordDialog v-model="audioRecordDialog"/>
                <!-- <AudioUploadDialog v-model="audioUploadDialog"/> -->

                <v-row justify="center">
                    <!-- Script Card -->
                    <v-col cols="12" md="5" lg="4">
                        <v-card class="story-card rounded-xl pa-4 text-center d-flex flex-column" height="100%">
                            <!-- Red Glowing Icon -->
                            <div class="icon-container">
                                <div class="glow-circle outer-glow glow-red"></div>
                                <div class="glow-circle middle-circle border-red"></div>
                                <div class="glow-circle inner-circle">
                                    <v-icon color="#ff4d4d" size="40">mdi-script-text-outline</v-icon>
                                </div>
                            </div>

                            <v-card-title class="font-weight-bold text-h5">Script</v-card-title>
                            <v-card-text class="text-grey-lighten-1 flex-grow-1">
                                Start with a script, then record your video with script prompts for easy step-by-step
                                recording.
                            </v-card-text>

                            <v-card-actions class="mt-4">
                                <v-btn block size="large" class="text-capitalize rounded-lg" color="#4a4959" @click="audioRecordDialog = true">
                                    Start with Script
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>

                    <!-- Storyboard Card -->
                    <v-col cols="12" md="5" lg="4">
                        <v-card class="story-card rounded-xl pa-4 text-center d-flex flex-column" height="100%">
                            <!-- Blue Glowing Icon -->
                            <div class="icon-container">
                                <div class="glow-circle outer-glow glow-blue"></div>
                                <div class="glow-circle middle-circle border-blue"></div>
                                <div class="glow-circle inner-circle">
                                    <v-icon color="#3b82f6" size="40">mdi-view-dashboard-variant-outline</v-icon>
                                </div>
                            </div>

                            <v-card-title class="font-weight-bold text-h5">Storyboard</v-card-title>
                            <v-card-text class="text-grey-lighten-1 flex-grow-1">
                                Create your storyboard, adding segments of video or images for a visual brief of your
                                project.
                            </v-card-text>

                            <v-card-actions class="mt-4">
                                <v-btn block size="large" class="text-capitalize rounded-lg" color="#4a4959"  @click="audioUploadDialog = true">
                                    Start with Storyboard
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
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
:global(.v-application) {
    font-family: 'Inter', sans-serif;
}

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
</style>
