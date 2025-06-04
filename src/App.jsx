import { Routes, Route, Link } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Redirect from './Pages/Redirect/Redirect'
import Analytics from "./Pages/Analytics/Analytics"

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:link" element={<Redirect />} />
        <Route path="/a/:link" element={<Analytics />} />
      </Routes>
  )
}

export default App
