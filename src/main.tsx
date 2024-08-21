import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { MyContextProvider } from './context/index';
import 'semantic-ui-css/semantic.min.css'
import  { Toaster } from 'react-hot-toast';



createRoot(document.getElementById('root')!).render(
  <MyContextProvider>
    <App />
    <Toaster />
  </MyContextProvider>
)
