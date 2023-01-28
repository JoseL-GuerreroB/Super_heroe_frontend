import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SesionProvider from './contexts/SesionContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SesionProvider>
      <App />
    </SesionProvider>
  </React.StrictMode>,
)
