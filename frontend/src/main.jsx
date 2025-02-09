import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ThemeProvider from './context/ThemeContext.jsx'
import RegisterProvider from './context/RegisterContext.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/rtk query/store.js'

createRoot(document.getElementById('root')).render(
    <RegisterProvider>
        <ThemeProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </RegisterProvider>
)
