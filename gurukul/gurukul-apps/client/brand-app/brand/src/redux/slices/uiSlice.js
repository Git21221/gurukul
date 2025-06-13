import { createSlice } from '@reduxjs/toolkit';
import { set } from 'react-hook-form';

const initialState = {
  isSidebarOpen: false,
  isMobileMenuOpen: false,
  isSearchBarOpen: false,
  isNotificationPanelOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state) => {
      state.isSidebarOpen = open;
    },
    setSidebarClosed: (state) => {
      state.isSidebarOpen = false;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    toggleSearchBar: (state) => {
      state.isSearchBarOpen = !state.isSearchBarOpen;
    },
    toggleNotificationPanel: (state) => {
      state.isNotificationPanelOpen = !state.isNotificationPanelOpen;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setSidebarClosed,
  toggleMobileMenu,
  toggleSearchBar,
  toggleNotificationPanel,
} = uiSlice.actions;
export default uiSlice;
