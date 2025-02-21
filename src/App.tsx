import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/home-page';
import { PreviewListPage } from './pages/preview-list-page';
import NotFoundPage from './pages/not-found-page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<HomePage />} />
      <Route path="/preview/:id" element={<PreviewListPage />} />
      <Route path="" element={<NotFoundPage />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
