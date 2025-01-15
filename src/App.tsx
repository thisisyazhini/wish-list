import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/home-page';
import { PreviewList } from './components/preview-list';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<HomePage />} />
        <Route path="/preview/:id" element={<PreviewList />} />
      </>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
