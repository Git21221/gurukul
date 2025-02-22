import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [branding, setBranding] = useState(null);

  useEffect(() => {
    // Extract brand name dynamically from URL
    const brandFolder = window.location.pathname.split("/")[1] || "default";

    // Construct full URL to branding.json
    const brandingUrl = `/${brandFolder}/branding.json`;

    fetch(brandingUrl)
      .then((response) => response.json())
      .then((data) => setBranding(data))
      .catch((error) => console.error("Error loading branding:", error));
  }, [branding]);
  return (
    <>
      <p>our logo {branding?.logo}</p>
      <h1 style={{ color: branding?.color }}>
        Welcome to our brand's official website. {branding?.name}
      </h1>
      <div className="content">
        <button onClick={() => alert("Button Clicked!")}>Click Me</button>
      </div>
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </>
  );
}

export default App;
