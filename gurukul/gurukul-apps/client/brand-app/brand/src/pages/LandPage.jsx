import { useSelector } from "react-redux";

export const LandPage = () => {
  const {branding, loading, error} = useSelector((state) => state.brandDetails);
  const {isAuthenticated, userRole} = useSelector((state) => state.auth);
  console.log("Branding details:", isAuthenticated, userRole);
  
  if(loading) {
    return <div>Loading...</div>;
  }
  if(error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="land-page">
      <p>Authentication: {isAuthenticated ? "true" : "false"} and role is: {userRole}</p>
      <h1>Welcome to Gurukul Brand App {branding?.brandName}</h1>
      <p style={{color: branding?.brandColor}}>This is the landing page for the brand application.</p>
      <p>Customize this page as per your branding requirements.{branding?.brandLogo}</p>
    </div>
  );
}