import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ThemeProvider from './context/ThemeContext.jsx'
import RegisterProvider from './context/RegisterContext.jsx'

createRoot(document.getElementById('root')).render(
    <RegisterProvider>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </RegisterProvider>
)
