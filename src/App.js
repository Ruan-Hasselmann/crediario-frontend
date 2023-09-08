import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateClient from './pages/CreateClient';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import ListAll from './pages/ListAll'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateClient />} />
          <Route path="/list" element={<ListAll />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
