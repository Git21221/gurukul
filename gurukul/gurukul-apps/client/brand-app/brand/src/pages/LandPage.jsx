import { useSelector } from 'react-redux';
import { Sidebar } from '../components/sidebar/Sidebar';
import Header from '../components/landPage/Header';
import Hero from '../components/landPage/Hero';
import FeaturedCourses from '../components/landPage/FeaturedCourses';
import EducatorSection from '../components/landPage/EducatorSection';
import Testimonials from '../components/landPage/Testimonial';
import Pricing from '../components/landPage/Pricing';
import Footer from '../components/landPage/Footer';

export const LandPage = () => {
  const { branding, loading, error } = useSelector(
    (state) => state.brandDetails
  );
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);
  console.log('Branding details:', isAuthenticated, userRole);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <FeaturedCourses />
        <EducatorSection />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};
