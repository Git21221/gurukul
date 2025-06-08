import { sidebarBrandList } from '../../data/SidebarData';
export const Sidebar = () => {
  return (
    <div className="sidebar flex flex-col max-w-[265px] font-medium text-[15px]">
      {sidebarBrandList.map(({ title, component: Item }, index) => (
        <div
          className="sidebar-item flex items-center gap-7 bg-[var(--brand-course-box)] p-5 rounded-tr-full rounded-br-full"
          key={index}
        >
          <div className="sidebar-icon">
            <Item />
          </div>
          <span className="sidebar-title">{title}</span>
        </div>
      ))}
    </div>
  );
};
