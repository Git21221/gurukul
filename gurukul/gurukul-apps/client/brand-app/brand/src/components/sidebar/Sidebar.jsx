import { NavLink } from 'react-router-dom';
import { sidebarBrandList } from '../../data/SidebarData';
import { useSelector } from 'react-redux';
export const Sidebar = () => {
  const { userRole } = useSelector((state) => state.auth);
  return (
    <div className="sidebar flex flex-col max-w-[265px] font-medium text-[15px]">
      {sidebarBrandList.map(({ title, component: Item, path }, index) => (
        <NavLink
          to={`${userRole}/${path}`}
          className={({ isActive }) =>
            `sidebar-item flex items-center gap-7 ${isActive ? 'bg-[var(--brand-course-box)]' : ''} p-5 rounded-tr-full rounded-br-full`
          }
          key={index}
        >
          <div className="sidebar-icon">
            <Item />
          </div>
          <span className="sidebar-title">{title}</span>
        </NavLink>
      ))}
    </div>
  );
};
