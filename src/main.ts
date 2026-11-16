import { createApp } from 'vue';
import App from '@/app/App.vue';
import { fadeIn } from '@/flows/onboarding/landing/directives/fadeIn';
import { initGa4 } from '@/flows/onboarding/landing/lib/ga4';
import './index.css';

initGa4();

const app = createApp(App);

// Revela seções da landing com fade + slide-up ao entrarem na viewport.
app.directive('fade-in', fadeIn);

app.mount('#root');
