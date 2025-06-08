import { useState } from 'react';
import './App.css';
import { Input } from '@gurukul/shared-client';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Welcome to our gurukul main website.</h1>
      <div className="content">
        <button onClick={() => alert('Button Clicked!')}>Click Me</button>
        <p>Current count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increase Count</button>
      </div>
      <Input />
    </>
  );
}

export default App;
