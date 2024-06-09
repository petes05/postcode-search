import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PostcodeLookupPostcodesIo from './services/PostcodeLookupPostcodesIo'
import type PostcodeLookupService from './types/PostcodeLookupService';

const app = createApp(App);
app.provide<PostcodeLookupService>('postcodeLookupService', new PostcodeLookupPostcodesIo());
app.mount('#app');