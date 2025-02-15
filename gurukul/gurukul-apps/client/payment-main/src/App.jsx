import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <h1>Welcome to the gurukul main Payment App</h1>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <button onClick={() => alert('Button Clicked!')}>Click Me</button>
    </>
  )
}

export default App
