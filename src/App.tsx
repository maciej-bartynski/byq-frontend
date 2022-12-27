import Navbar from 'components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Dashboard from 'views/Dashboard';
import BoardDetail from 'views/BoardDetail';
import { Provider } from 'react-redux';
import { store } from 'reduxStorage/store';
import RouteWorkspace from 'components/RouteWorkspace';
import { Paths } from 'lib/services/usePaths/usePaths';
import { useEffect } from 'react';
import UsersApi from 'lib/services/apiServices/UsersApi';
import BoardsApi from 'lib/services/apiServices/BoardsApi';
import LayoutDataManager from 'components/LayoutDataManager';

function App() {
  useEffect(() => {
    UsersApi.fetchUsers();
    BoardsApi.fetchBoards();
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path={Paths.Dashboard}
            element={<LayoutDataManager><Dashboard /></LayoutDataManager>}
          />
          <Route
            path={Paths.BoardDetail}
            element={
              <LayoutDataManager>
                <RouteWorkspace>
                  <BoardDetail />
                </RouteWorkspace>
              </LayoutDataManager>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
