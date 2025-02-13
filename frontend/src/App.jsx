import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import './assets/checkbox.css'
import './assets/fonts.css'
import ROUTES from './Routers/router'
import 'bootstrap/dist/css/bootstrap.min.css';


const routerr = createBrowserRouter(ROUTES)
function App() {
  return <RouterProvider router={routerr}/>
}

export default App
