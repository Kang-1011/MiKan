 
<template>
    <Sidebar3></Sidebar3>

    <v-main style="height: 100vh" class="pa-3 bg-grey-lighten-4">
        <v-card class="fill-height rounded-lg card-1" flat>
            <v-card border="0"  flat style="height:100%; overflow-y: auto;">
                <TranscriptDisplay  /> 
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
