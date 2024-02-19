import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Component/style/mobile.css'
import App, { loader } from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root';
import { action } from './Component/Search';
import ErrorPage from './Component/ErrorPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    action: action,
    errorElement: <ErrorPage />
  },
  {
    path: "weather/:cityName",
    element: <App />,
    loader: loader,
    action: action,
    errorElement: <ErrorPage />
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

