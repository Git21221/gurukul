import { useNavigate } from 'react-router-dom';
import { Dashboard } from '../../../components/user/home/Dashboard';

export const HomeUser = () => {
  const navigate = useNavigate();

  const handleCourseClick = (course) => {
    console.log('navigating to:', course._id); // TEMP DEBUG
    navigate(`/user/course/${course._id}`);
  };

  return <Dashboard onCourseClick={handleCourseClick} />;
};
