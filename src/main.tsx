import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { MyContextProvider } from './context/index';


createRoot(document.getElementById('root')!).render(
  <MyContextProvider>
    <App />
  </MyContextProvider>
)
