import { Outlet } from 'react-router-dom';
import Header from './landPage/Header';

const PublicLayout = () => {
  return (
    <>
      <div className="h-16">
        <Header />
      </div>
      <Outlet />
    </>
  );
};

export default PublicLayout;
