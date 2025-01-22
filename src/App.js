import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Weather from './page/Weather';

function App() {
  return (
    <div className="App">
      <Routes path="/">
        <Route element={<Weather />} path='weather' />

      </Routes>
    </div>
  );
}

export default App;
