import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MyContextProvider } from './context/index';
import 'semantic-ui-css/semantic.min.css'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './page/auth/Login';
import SignUp from './page/auth/SignUp';
import PrivateRoute from './page/PrivateRoute';
import AgGrid from './page/AgGrid';
import SoketTest from './page/SoketTest';
import NotFound from './page/NotFound';


createRoot(document.getElementById('root')!).render(
  <MyContextProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />

        <Route path="/" element={<PrivateRoute><AgGrid /></PrivateRoute>} />
        <Route path="/SoketTest" element={<PrivateRoute><SoketTest /></PrivateRoute>} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  </MyContextProvider>


)



