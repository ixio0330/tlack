import { lazy, Suspense } from 'react';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const SigninView = lazy(() => import('./views/signin'));
const SignupView = lazy(() => import('./views/signup'));
const MainView = lazy(() => import('./views/main'));

function App() {
  return (
    <HistoryRouter history={history}>
      <Suspense fallback={<div>Loading...</div>}>
        <main>
          <Routes>
            <Route path='/' element={<MainView />} />
            <Route path='/signin' element={<SigninView />} />
            <Route path='/signup' element={<SignupView />} />
          </Routes>
        </main>
      </Suspense>
    </HistoryRouter>
  );
}

export default App;
