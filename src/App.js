import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Swap from './components/Swap';
import Home from './components/Home/Home';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/swap" element={<Swap />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
