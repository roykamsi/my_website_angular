import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SkillsComponent } from './pages/skills/skills.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    title: 'Roy Kamsi Website - Homepage'  // Browser title
  },
  {
    path: 'about-me',
    component: AboutMeComponent,
    title: 'Roy Kamsi Website - About me'
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    title: 'Roy Kamsi Dashboard'
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    title: 'Roy Kamsi Website - Projects'
  },
  {
    path: 'skills',
    component: SkillsComponent,
    title: 'Roy Kamsi Website - Skills'
  },
];
