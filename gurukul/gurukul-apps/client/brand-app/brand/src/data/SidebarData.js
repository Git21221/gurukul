import {
  ArticleLogo,
  CourseLogo,
  HomeLogo,
  UpdatesLogo,
} from '@gurukul/shared-client';

export const sidebarBrandList = [
  {
    title: 'Home',
    component: HomeLogo,
    path: 'home',
    roles: ['founder', 'user', 'public'], // Visible to everyone
  },
  {
    title: 'Courses',
    component: CourseLogo,
    path: 'courses',
    roles: ['user'], // Only for 'user'
  },
  {
    title: 'Articles',
    component: ArticleLogo,
    path: 'articles',
    roles: ['founder', 'user'],
  },
  {
    title: 'Updates',
    component: UpdatesLogo,
    path: 'updates',
    roles: ['founder'],
  },
];
