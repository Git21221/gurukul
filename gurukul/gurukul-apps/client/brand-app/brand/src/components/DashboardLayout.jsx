import { Outlet } from 'react-router-dom';
import Header from './landPage/Header';
import { Sidebar } from './sidebar/Sidebar';
import { useSelector } from 'react-redux';

const DashboardLayout = () => {
  const { isSidebarOpen } = useSelector((state) => state.ui);

  return (
    <div className="flex h-screen">
      <div className="w-20">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
