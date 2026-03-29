import { createRoot } from 'react-dom/client'
import App from './components/App'
import { AuthProvider } from '../../src/context/AuthContext'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
