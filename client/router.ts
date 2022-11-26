import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './components/Home/HomePage.vue';
import AboutPage from './components/About/AboutPage.vue';
import ProjectsGalleryPage from './components/Project/ProjectsGalleryPage.vue';
import ProjectPage from './components/Project/ProjectPage.vue';
import NotFound from './NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', name: 'Home', component: HomePage},
  {path: '/about', name: 'About', component: AboutPage},
  {path: '/works', name: 'Works', component: ProjectsGalleryPage},
  {path: '/works/:project?', name: ' ', component: ProjectPage},
  {path: '*', name: 'Not Found', component: NotFound},
];

const router = new VueRouter({routes});

export default router;
