import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './layout/Main';
import AllContacts from './pages/AllContacts';
import AddContact from './pages/AddContact';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <AllContacts></AllContacts>
      },
      {
        path: "/addContact",
        element: <AddContact></AddContact>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
