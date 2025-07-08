<template>
  <v-app>
    <v-main
      class="d-flex align-center justify-center pa-2"
      :style="{ backgroundImage: `url(${bgImage})` }"
      style="
        min-height: 100vh;
        background-size: cover;
        background-position: center;
        overflow: hidden;
      "
    >
      <v-card
        elevation="6"
        class="pt-12 pb-12 px-12 auth-card w-100"
        max-width="460"
      >
        <v-form @submit.prevent="handleSignIn">
          <!-- Header -->
          <div class="text-center mb-8">
            <h2 class="text-h6 font-weight-bold mb-1">Welcome back!</h2>
            <p class="text-body-2">Please enter your details to sign in</p>
          </div>

          <!-- Username -->
          <v-text-field
            v-model="username"
            label="Username"
            variant="outlined"
            density="compact"
            class="mb-5"
            hide-details
          ></v-text-field>

          <!-- Password -->
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            variant="outlined"
            density="compact"
            class="mb-2"
            hide-details
          >
            <template #append-inner>
              <v-icon
                @click="showPassword = !showPassword"
                class="cursor-pointer"
                color="grey"
              >
                {{ showPassword ? "mdi-eye-off" : "mdi-eye" }}
              </v-icon>
            </template>
          </v-text-field>

          <!-- Remember + Forgot -->
          <div class="d-flex justify-space-between align-center mb-8">
            <v-checkbox
              v-model="rememberMe"
              label="Remember"
              density="compact"
              hide-details
              class="pa-0"
            />
            <a href="#" class="text-caption text-grey-darken-2">
              Forgot Password?
            </a>
          </div>

          <!-- Error -->
          <div v-if="errorMessage" class="text-caption text-red mb-3">
            {{ errorMessage }}
          </div>

          <!-- Sign In -->
          <v-btn
            type="submit"
            color="deep-orange-accent-3"
            block
            height="40"
            class="mb-5 rounded-12"
            :loading="loading"
          >
            Sign in
          </v-btn>

          <!-- Google Sign-In -->
          <v-btn variant="outlined" block height="40" class="mb-2 rounded-12">
            <v-avatar size="18" class="mr-2">
              <v-img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              />
            </v-avatar>
            Sign in with Google
          </v-btn>

          <!-- Sign Up -->
          <div class="text-center mt-2">
            <span class="text-caption text-grey-darken-1">
              Don't have an account?
            </span>
            <a
              href="#"
              class="ml-1 text-deep-orange-accent-4 font-weight-medium text-caption"
            >
              Sign up
            </a>
          </div>
        </v-form>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import bgImage from "@/assets/background.png";

const router = useRouter();
const username = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);
const errorMessage = ref("");
const loading = ref(false);

const handleSignIn = async () => {
  errorMessage.value = "";
  loading.value = true;

  try {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.detail || "Login failed");

    localStorage.setItem("auth_token", result.token);
    localStorage.setItem("user_role", result.role);

    router.push(result.role === "manager" ? "/Homepage" : "/MyTasks4");
  } catch (err) {
    errorMessage.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-card {
  background-color: white;
  border-radius: 28.8px;
  max-height: 100%;
  min-height: 480px; /* 👈 Add this */
}

.cursor-pointer {
  cursor: pointer;
}

/* Make v-text-field input fields more rounded */
::v-deep(.v-text-field .v-field) {
  border-radius: 12px !important; /* Rounded input */
}

/* Optional: Adjust outline hover/focus */
::v-deep(.v-text-field .v-field__outline) {
  border-color: #ccc;
}
::v-deep(.v-text-field.v-field--focused .v-field__outline) {
  border-color: #ff3d00;
}

/* Shared rounded class for buttons */
.rounded-12 {
  border-radius: 12px !important;
}
</style>
