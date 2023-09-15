import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateClient from './pages/CreateClient';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import ListAll from './pages/ListAll'
import CreateVendedor from './pages/CreateVendedor';
import ListVendedor from './pages/ListVendedor';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='content'>
          <div>
            <Sidebar />
          </div>
          <div className='conteudo'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateClient />} />
              <Route path="/list" element={<ListAll />} />
              <Route path="/createVendedor" element={<CreateVendedor />} />
              <Route path="/listVendedor" element={<ListVendedor />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
