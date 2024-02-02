import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, { loader } from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root';
import { action } from './Component/Search';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "weather/:cityName",
    element: <App />,
    loader: loader,
    action: action,
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

