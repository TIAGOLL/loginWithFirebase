import { Routes, Route } from 'react-router-dom'

import Register from '../pages/Register/index';
import SignIn from '../pages/SignIn/index.js';
import Dashboard from '../pages/Dashboard/index';
import NoteById from '../pages/Dashboard/[id]';
import Note from '../pages/Dashboard/create';
import Private from './private.js';


function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
      <Route path='/dashboard/:id' element={<Private><NoteById/></Private>} />
      <Route path='/dashboard/create' element={<Private><Note/></Private>} />
      <Route path='/register' element={<Register />} />
      <Route path="*" element={<h1>Not Found 404</h1>} />
    </Routes>
  )
}

export default RoutesApp;
