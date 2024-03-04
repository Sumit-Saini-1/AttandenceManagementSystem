import { useEffect, useState } from 'react';
import './App.css';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout, login } from './states/reducers/authReducer';
import DataTable from './components/DataTable';
import Header from './components/Header';
import { CheckAuthentication } from '../ApiRequests/auth';

function App() {
  const [authChecking, setAuthChecking] = useState(true);
  
  const auth = useSelector((state) => state.auth.value);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(function () {
    if (auth.isloggedIn) {
      setAuthChecking(false);
    }
    else {
      // navigate("/login")
      checkIsLoggedIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isloggedIn]);

  async function checkIsLoggedIn() {
    try {
      const result = await CheckAuthentication();
      if (result) {
        dispatch(login());
        dispatch(setUser(JSON.parse(window.sessionStorage.getItem("user"))));
      }
      else {
        window.sessionStorage.removeItem("user");
        dispatch(logout());
      }
      
      setAuthChecking(false);
    }
    catch {
      dispatch(logout());
      setAuthChecking(false);
    }
  }

  return (
    <>
      {
        authChecking ? <div>loading..</div> :
          auth.isloggedIn ?
            <div className='App'>
              <Header/>
              <DataTable/>
            </div>
            :
            <Navigate to={"/login"} />
      }
    </>
  )
}

export default App
