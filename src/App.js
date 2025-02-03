import logo from './logo.svg';
import './App.css';
import { NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Weather from './page/forecast/Weather';
import HomePage from './page/Home';

function App() {
  return (
    <div className="App">
      <Routes path="" >
        <Route element={<HomePage />} path='/*' />
        <Route element={<Weather />} path='weather' />
      </Routes>
    </div>
  );
}

export default App;
