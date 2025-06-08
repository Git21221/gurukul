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
  },
  {
    title: 'Courses',
    component: CourseLogo,
    path: 'courses',
  },
  {
    title: 'Articles',
    component: ArticleLogo,
    path: 'articles',
  },
  {
    title: 'Updates',
    component: UpdatesLogo,
    path: 'updates',
  },
];
