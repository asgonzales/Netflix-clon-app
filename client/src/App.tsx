import { Route, Router, Routes, useLocation, useParams } from 'react-router-dom';
import './App.css';
// import MiniCard from './components/MiniCard/MiniCard';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Landing from './pages/Landing/Landing';
import { Test } from './pages/Test/Test';

function App() {
  const { pathname } = useLocation()
  return (
    <div className="App">
      {
        pathname === '/browse' ?
        <NavBar /> : <></>
      }
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/browse' element={<Home />} />
        <Route path='/test' element={<Test />} />
      </Routes>
      {/* <MiniCard /> */}
    </div>
  );
}

export default App;
