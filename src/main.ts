import { createApp } from 'vue';
import App from '@/app/App.vue';
import { initGa4 } from '@/flows/onboarding/landing/lib/ga4';
import './index.css';

initGa4();

const app = createApp(App);

app.mount('#root');
