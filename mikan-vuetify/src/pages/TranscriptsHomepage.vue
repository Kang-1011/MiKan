 
<template>
    <Sidebar></Sidebar>

    <v-main style="height: 100vh" class="pa-3 unified-background">
        <v-card class="fill-height rounded-v1 border-1" flat>
            <v-card border="0"  flat style="height:100%; overflow-y: auto;">
                <TranscriptDisplay /> 
            </v-card>
        </v-card>
    </v-main>
    <Chatbot />
</template>
 
<style scoped> 
.fill-height {
    height: 100%;
}

.card-1 {
    border: thin solid lightgray;
    box-shadow: none;
}
</style>
