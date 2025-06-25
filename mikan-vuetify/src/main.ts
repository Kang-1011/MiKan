/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import { createPinia } from "pinia";

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';

import { AVPlugin } from "vue-audio-visual";

// Styles
import "unfonts.css";

const app = createApp(App);
const pinia = createPinia();

registerPlugins(app);

app.use(pinia);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(ToastService);

app.use(AVPlugin);

app.mount("#app");
