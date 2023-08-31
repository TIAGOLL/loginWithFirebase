import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.js';

import AfterLogin from './pages/AfterLogin/index';

function RoutesApp() {
  return (
    <main id=''>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/afterlogin" element={<AfterLogin />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default RoutesApp;
