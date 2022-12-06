import { lazy, Suspense } from 'react';

// Router
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Store
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { resetSnackbar } from './store/app';

// Components
import Snackbar from './components/snackbar/snackbar';
import Spinner from './components/loading/spinner';

export const history = createBrowserHistory();

// lazy loading
const SigninView = lazy(() => import('./views/signin'));
const SignupView = lazy(() => import('./views/signup'));
const MainView = lazy(() => import('./views/main'));
const WorkspaceView = lazy(() => import('./views/workspace'));
const ChannelView = lazy(() => import('./views/channel'));

function App() {
  const { message, show, timeout, type } = useSelector((state: RootState) => state.app.snackbar);
  const dispatch = useDispatch();
  return (
    <HistoryRouter history={history}>
      <Suspense fallback={<Spinner />}>
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
            <Route path='/:workspace_id' element={<WorkspaceView />}>
              <Route path='/:workspace_id/:channel_id' element={<ChannelView />} />
            </Route>
            <Route path='/signin' element={<SigninView />} />
            <Route path='/signup' element={<SignupView />} />
          </Routes>
        </main>
      </Suspense>
    </HistoryRouter>
  );
}

export default App;
