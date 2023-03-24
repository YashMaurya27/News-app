import { CircularProgress } from '@mui/material';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
// import Panel from './components/Panel/Panel';

const Auth = lazy(() => import('./components/Auth/Auth'));
const Panel = lazy(() => import('./components/Panel/Panel'));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path='/auth'
          element={
            <Suspense fallback={<CircularProgress />}>
              <Auth />
            </Suspense>
          }
        />
        <Route
          path='/panel/*'
          element={
            <Suspense fallback={<CircularProgress />}>
              <Panel />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={<Navigate to={'/panel'} />}
        />
      </Routes>
    </div>
  );
}

export default App;
