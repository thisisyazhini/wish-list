import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/home-page';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route index element={<HomePage />} />)
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
