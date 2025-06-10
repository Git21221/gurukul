import { useSelector } from 'react-redux';
import { Sidebar } from '../components/sidebar/Sidebar';

export const LandPage = () => {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);
  console.log('gurukul details:', isAuthenticated, userRole);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  const styles = {
    hero: {
      textAlign: 'center',
      padding: '4rem 2rem',
      backgroundColor: '#f4f4f4',
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
    },
    subtitle: {
      fontSize: '1.2rem',
      marginBottom: '2rem',
    },
    button: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
    },
  };

  return (
    // <div className="land-page">
    //   <p>
    //     Authentication: {isAuthenticated ? 'true' : 'false'} and role is:{' '}
    //     {userRole}
    //   </p>
    //   <h1>Welcome to Gurukul Brand App {branding?.brandName}</h1>
    //   <p style={{ color: branding?.brandColor }}>
    //     This is the landing page for the brand application.
    //   </p>
    //   <p>
    //     Customize this page as per your branding requirements.
    //     {branding?.brandLogo}
    //   </p>
    //   <Sidebar />
    // </div>
    <section style={styles.hero}>
      <h2 style={styles.title}>Learn Anytime, Anywhere</h2>
      <p style={styles.subtitle}>
        Explore thousands of courses from top instructors.
      </p>
      <button style={styles.button}>Get Started</button>
    </section>
  );
};
