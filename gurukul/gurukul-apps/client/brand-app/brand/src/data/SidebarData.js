import {
  ArticleLogo,
  CourseLogo,
  HomeLogo,
  UpdatesLogo,
} from '@gurukul/shared-client';
import { RiVideoUploadLine } from 'react-icons/ri';

export const sidebarBrandList = [
  {
    title: 'Home',
    component: HomeLogo,
    path: 'home',
    roles: ['founder', 'user', 'educator', 'public'],
  },
  {
    title: 'Courses',
    component: CourseLogo,
    path: 'courses',
    roles: ['user', 'educator', 'founder'],
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
  {
    title: 'Upload',
    component: RiVideoUploadLine,
    path: 'upload-video',
    roles: ['educator'],
  },
];
