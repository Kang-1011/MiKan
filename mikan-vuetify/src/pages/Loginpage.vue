<template>
  <v-app>
    <div class="center-wrapper" :style="{ backgroundImage: `url(${bgImage})` }">
      <div class="auth-card">
        <!-- Auth Form Section -->
        <div class="signin-form" style="width: 100%; max-width: 604.8px">
          <!-- Welcome Header -->
          <div class="text-center mb-14">
            <h2 class="welcome-title mb-5">Welcome back!</h2>
            <p class="welcome-subtitle">Please enter your details to sign in</p>
          </div>

          <!-- Sign In Form -->
          <v-form @submit.prevent="handleSignIn">
            <!-- Email/Username Field -->
            <div class="mb-8">
              <label class="field-label mb-4">Username</label>
              <v-text-field
                v-model="username"
                placeholder="Enter your username"
                variant="outlined"
                density="comfortable"
                class="custom-input-field"
                hide-details
              />
            </div>

            <!-- Password Field -->
            <div class="mb-2">
              <label class="field-label mb-4">Password</label>
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                variant="outlined"
                density="comfortable"
                class="custom-input-field"
                hide-details
              >
                <template v-slot:append-inner>
                  <v-icon
                    @click="showPassword = !showPassword"
                    class="cursor-pointer"
                    color="grey"
                  >
                    {{ showPassword ? "mdi-eye-off" : "mdi-eye" }}
                  </v-icon>
                </template>
              </v-text-field>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="d-flex justify-space-between align-center mb-12">
              <v-checkbox
                v-model="rememberMe"
                label="Remember me"
                density="compact"
                class="remember-checkbox"
                hide-details
              />
              <a href="#" class="forgot-link">Forgot password</a>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="error-message mb-6">
              {{ errorMessage }}
            </div>

            <!-- Sign In Button -->
            <v-btn
              type="submit"
              block
              size="large"
              class="signin-btn mb-8"
              elevation="0"
              :loading="loading"
            >
              Sign in
            </v-btn>

            <!-- Google Sign In Placeholder -->
            <v-btn
              block
              size="large"
              variant="outlined"
              class="google-btn mb-2"
              elevation="0"
            >
              <div class="google-icon-container mr-3">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              Sign in with Google
            </v-btn>

            <!-- Sign Up Link -->
            <div class="text-center">
              <span class="signup-text">Don't have an account? </span>
              <a href="#" class="signup-link">Sign up</a>
            </div>
          </v-form>
        </div>
      </div>
    </div>
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

    if (!response.ok) {
      throw new Error(result.detail || "Login failed");
    }

    // Store token
    localStorage.setItem("auth_token", result.token);
    localStorage.setItem("user_role", result.role);

    console.log("Login successful:", result);

    // Example role-based redirect
    if (result.role === "manager") {
      router.push("/Homepage");
    } else {
      router.push("MyTasks4");
    }
  } catch (err) {
    errorMessage.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.center-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 1.44rem;
}

.auth-card {
  background: white;
  border-radius: 28.8px; /* 24px → 28.8px */
  padding: 4.32rem; /* 3.6rem → 4.32rem */
  box-shadow: 0 14.4px 57.6px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 604.8px; /* 504px → 604.8px */
}

.welcome-title {
  font-size: 2.88rem; /* 2.4rem → 2.88rem */
  font-weight: 700;
  color: #1f2937;
  font-family: "Inter", sans-serif;
  margin: 0;
  line-height: 1.2;
}

.welcome-subtitle {
  color: #6b7280;
  font-size: 1.44rem; /* 1.2rem → 1.44rem */
  font-family: "Inter", sans-serif;
  margin: 0;
  line-height: 1.4;
}

.field-label {
  display: block;
  font-size: 1.32rem; /* 1.1rem → 1.32rem */
  font-weight: 500;
  color: #374151;
  font-family: "Inter", sans-serif;
}

.custom-input-field :deep(.v-field) {
  border-radius: 12px !important; /* 10px → 12px */
  background-color: white;
  min-height: 67.2px; /* 56px → 67.2px */
}

.custom-input-field :deep(.v-field__outline) {
  border-color: #d1d5db !important;
}

.custom-input-field :deep(.v-field__outline):hover {
  border-color: #9ca3af !important;
}

.custom-input-field :deep(.v-field--focused .v-field__outline) {
  border-color: #25a18e !important;
  border-width: 2px !important;
}

.custom-input-field :deep(.v-field__input) {
  font-family: "Inter", sans-serif;
  font-size: 1.32rem; /* 1.1rem → 1.32rem */
  padding-top: 21.6px; /* 18px → 21.6px */
  padding-bottom: 21.6px;
}

.remember-checkbox :deep(.v-label) {
  font-size: 1.2rem; /* 1rem → 1.2rem */
  color: #4b5563;
  font-family: "Inter", sans-serif;
}

.remember-checkbox :deep(.v-selection-control__input) {
  color: #25a18e;
}

.forgot-link {
  color: #374151;
  text-decoration: none;
  font-size: 1.2rem;
  font-family: "Inter", sans-serif;
  font-weight: 500;
}

.forgot-link:hover {
  text-decoration: underline;
}

.signin-btn {
  background-color: #ff3d00 !important;
  color: white !important;
  border-radius: 12px !important;
  font-family: "Inter", sans-serif !important;
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  font-size: 1.32rem !important;
  height: 74.4px !important; /* 62px → 74.4px */
}

.signin-btn:hover {
  background-color: #ec5d1b !important;
}

.google-btn {
  border-color: #dadce0 !important;
  color: #3c4043 !important;
  border-radius: 12px !important;
  font-family: "Inter", sans-serif !important;
  font-weight: 500 !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  font-size: 1.32rem !important;
  height: 74.4px !important;
  background-color: white !important;
}

.google-btn:hover {
  background-color: #f8f9fa !important;
  box-shadow: 0 1.2px 3.6px rgba(0, 0, 0, 0.12),
    0 1.2px 2.4px rgba(0, 0, 0, 0.24) !important;
}

.signup-text {
  color: #6b7280;
  font-size: 1.2rem;
  font-family: "Inter", sans-serif;
}

.signup-link {
  color: #ff3d00;
  text-decoration: none;
  font-size: 1.2rem;
  font-family: "Inter", sans-serif;
  font-weight: 600;
}

.signup-link:hover {
  text-decoration: underline;
}

.google-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px; /* 20px → 24px */
  height: 24px;
}

.cursor-pointer {
  cursor: pointer;
}

.error-message {
  color: red;
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
}
</style>
