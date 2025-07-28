<template>
    <v-dialog max-width="500px">
        <v-card class="rounded-xl pa-3 px-6">
            <v-card-title>Approve All Tasks?</v-card-title>
            <div align="center" class="mb-2">
                <v-icon size="60">mdi-alert-circle-check-outline</v-icon>
            </div>
            <v-card-subtitle align="center">
                Are you sure you want to approve all tasks?<br />This cannot be
                undone.
            </v-card-subtitle>

            <v-card-actions class="my-2">
                <v-btn  variant="outlined" class="text-body-2 mr-2 stage-button-cancel" rounded="xl" @click="closeDialog">
                    Cancel
                </v-btn>
                <v-btn  variant="flat" class="text-body-2 mr-2 stage-button-create-dialog" rounded="xl" @click="approveAllDrafts">
                    Approve
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
const emit = defineEmits(["approve-all-drafts", "close-approve-dialog"]);

const closeDialog = () => emit("close-approve-dialog");

const approveAllDrafts = () => {
    emit("approve-all-drafts");
};
</script>

<style scoped>

</style>
