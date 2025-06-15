import {
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { sidebarBrandList } from '../../data/SidebarData';
import { setSidebarClosed, toggleSidebar } from '../../redux/slices/uiSlice';

export function Sidebar() {
  // Get role from Redux (adjust this based on your setup)
  const { userRole } = useSelector((state) => state.auth);
  const { isSidebarOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { branding } = useSelector((state) => state.brandDetails);

  // Filter based on role
  const visibleItems = sidebarBrandList.filter((item) =>
    item.roles.includes(userRole || 'public')
  );

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-30 z-40 transition-opacity duration-300"
          style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
          onClick={() => dispatch(setSidebarClosed())}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className="fixed left-0 z-50 h-full bg-white overflow-hidden transition-[width] duration-300 ease-in-out"
        style={{
          width: isSidebarOpen ? '16rem' : '4.5rem', // 64 => 256px, 18 => 72px
          // boxShadow: `0 6px 4px ${branding.brandColor}`,
        }}
      >
        <nav className={`pt-4 ${isSidebarOpen ? '' : 'pr-1'}`}>
          {visibleItems.map(({ title, path, component: IconComponent }) => (
            <NavLink
              key={title}
              to={`/${userRole}/${path}`}
              className={({ isActive }) =>
                `flex items-center p-2 space-x-7 transition-colors duration-200 text-xs font-medium ${
                  isSidebarOpen
                    ? 'rounded-tr-full rounded-br-full'
                    : 'rounded-md'
                } ${isActive ? 'font-semibold' : ''}`
              }
              style={({ isActive }) => ({
                backgroundColor:
                  isActive && isSidebarOpen
                    ? `${branding.brandColor}20`
                    : 'transparent',
              })}
              onClick={() =>
                isSidebarOpen ? dispatch(setSidebarClosed()) : null
              }
            >
              {({ isActive }) => (
                <div
                  className={`p-2 flex items-center transition-all duration-300 ease-in-out ${
                    isSidebarOpen
                      ? 'flex-row gap-3'
                      : 'flex-col gap-1 justify-center'
                  }`}
                >
                  <IconComponent
                    className="w-5 h-5"
                    color={isActive ? branding.brandColor : undefined}
                  />
                  <span
                    className={`transition-all duration-300 ease-in-out whitespace-nowrap ${
                      isSidebarOpen
                        ? 'text-sm font-medium opacity-100'
                        : 'text-[10px] opacity-80'
                    }`}
                    style={{
                      color: isActive ? branding.brandColor : undefined,
                    }}
                  >
                    {title}
                  </span>
                </div>
              )}
            </NavLink>
          ))}
        </nav>
        {/* Bottom Collapse Toggle */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="absolute bottom-4 right-5 w-10 h-10 flex items-center justify-center z-50"
        >
          {isSidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
        </button>
      </div>
    </>
  );
}
