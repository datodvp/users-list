import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import User from './pages/User';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="user/:id" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
