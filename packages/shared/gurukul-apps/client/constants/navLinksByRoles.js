// src/constants/navLinksByRole.js
export const navLinksByRole = {
  user: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Courses', href: '/courses' },
    { name: 'Profile', href: '/profile' },
  ],
  educator: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Manage Classes', href: '/classes' },
    { name: 'Reports', href: '/reports' },
  ],
  founder: [
    { name: 'Admin Panel', href: '/founder' },
    { name: 'Users', href: '/founder/users' },
    { name: 'Settings', href: '/founder/settings' },
  ],
};
