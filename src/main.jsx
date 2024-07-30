import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CurrentImage from './pages/CurrentImage.jsx'
import Favorites from './pages/Favorites.jsx'
import Error from './pages/Error.jsx'
import { ApiContextProvider } from './contexts/ApiContext.jsx'
import Search from './pages/Search.jsx'
/* 
    Below is a route containing:
      - Main page --> App
      - Error element
      - Children:
        + Home page
        + Current image --> presents the selected image in large screen
        + Current topic --> presents images related to the selected topic
        + Search -->        presents the search result 
*/
const router = createBrowserRouter([
  {
    path: '/',
    element: <ApiContextProvider><App/></ApiContextProvider>,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/photo/:photoId',
        element: <CurrentImage/>
      },
      {
        path: '/favorites',
        element: <Favorites/>
      },
      {
        path: '/s/photos/:searchInput',
        element: <Search/>
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
  // <React.StrictMode>
  // </React.StrictMode>,
)
// 