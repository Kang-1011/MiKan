<template>
    <!-- New Task Draft V2 -->
    <!-- <v-card flat border class="mx-auto rounded-lg">
        <v-card @click="openEditDialog" hover flat :ripple="false">
            <v-card-title class="text-truncate">
                {{ props.title }}
            </v-card-title>
            <v-divider class="mx-2" />

            <v-card-text>
                <v-row>
                    <v-col>
                        <div class="text-caption text-medium-emphasis">Due Date</div>
                        <strong>{{ props.dueDate }}</strong>
                    </v-col>
                    <v-col>
                        <div class="text-caption text-medium-emphasis">Assignee</div>
                        <strong>{{ props.assignee }}</strong>
                    </v-col>
                </v-row>
                <div class="text-caption pt-4 text-medium-emphasis">Description</div>
                <div style="white-space: pre-wrap; min-height: 80px; max-height: 80px; overflow: hidden;">
                    <strong>{{ props.description }}</strong>
                </div>
            </v-card-text>
        </v-card>
        <v-divider />

        <v-card-actions class="px-4">
            <v-row no-gutters class="w-100" style="gap: 20px;">
                <v-col>
                    <v-btn block color="black" variant="outlined" @click="openRejectDialog">
                        <v-icon left>mdi-close</v-icon>
                        Decline
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn block color="black" variant="flat" @click="openApproveDialog">
                        <v-icon left>mdi-check</v-icon>
                        Confirm
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-actions>
    </v-card>
    <TaskDraftApproveOneTaskButton @task-approved="handleTaskApproved" ref="approveDialogRef" />
    <TaskDraftDeleteOneTaskButton @task-deleted="handleTaskDeleted" ref="deleteDialogRef" /> -->
    <!-- <TaskDraftEditOneTaskButton @task-edited="handleTaskEdited" ref="editDialogRef" /> -->

    <!-- New Task Draft V3 -->
    <!-- <v-card flat border class="mx-auto rounded-lg">
        <v-card @click="openEditDialog" hover flat :ripple="false">
            <v-card-title class="text-truncate">
                <v-row class="align-center text-truncate">
                    <v-col cols="10" class="text-truncate">
                        {{props.title}}
                    </v-col>
                    <v-col cols="2">
                        <div class="d-flex justify-end">
                            <TaskDraftApproveOneTaskButton @task-approved="handleTaskApproved" />
                            <TaskDraftDeleteOneTaskButton @task-deleted="handleTaskDeleted" />
                            <TaskDraftEditOneTaskButton @task-edited="handleTaskEdited" ref="editDialogRef"/>
                        </div>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-divider class="mx-2" />

            <v-card-text>
                <v-row>
                    <v-col>
                        <div class="text-caption text-medium-emphasis">Due Date</div>
                        <strong>{{ props.dueDate }}</strong>
                    </v-col>
                    <v-col>
                        <div class="text-caption text-medium-emphasis">Assignee</div>
                        <strong>{{ props.assignee }}</strong>
                    </v-col>
                </v-row>
                <div class="text-caption pt-4 text-medium-emphasis">Project</div>
                        <strong>{{ props.project }}</strong>
                <div class="text-caption pt-4 text-medium-emphasis">Description</div>
                <div style="white-space: pre-wrap; min-height: 80px; max-height: 80px; overflow: hidden;">
                    <strong>{{ props.description }}</strong>
                </div>
            </v-card-text>
        </v-card>
    </v-card> -->
</template>