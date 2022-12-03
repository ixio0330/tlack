import { lazy, Suspense } from 'react';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Snackbar from './components/snackbar/snackbar';
import { createBrowserHistory } from 'history';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { resetSnackbar } from './store/app';
export const history = createBrowserHistory();

const SigninView = lazy(() => import('./views/signin'));
const SignupView = lazy(() => import('./views/signup'));
const MainView = lazy(() => import('./views/main'));

function App() {
  const { message, show, timeout, type } = useSelector((state: RootState) => state.app.snackbar);
  const dispatch = useDispatch();
  return (
    <HistoryRouter history={history}>
      <Suspense fallback={<div>Loading...</div>}>
        <main>
          <Snackbar 
            show={show} 
            message={message}
            type={type}
            timeout={timeout}
            resetSnackbar={() => dispatch(resetSnackbar())}
          />
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
