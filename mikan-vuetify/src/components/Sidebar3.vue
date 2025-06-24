<template>
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" rail-width="80" border="0">
        <v-card class="pa-3 fill-height bg-grey-lighten-4">
            <v-card class="fill-height rounded-lg card-1" flat>

                <v-list>
                    <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider">
                        <template v-slot:append>
                            <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>

                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
                    <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
                    <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
                </v-list>
            </v-card>
        </v-card>
    </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(true)
</script>

<style scoped>
.fill-height {
    height: 100%;
    /* Make sure it fills the full screen */
}

.card-1 {
    border: thin solid lightgray;
    box-shadow: none;
}
</style>