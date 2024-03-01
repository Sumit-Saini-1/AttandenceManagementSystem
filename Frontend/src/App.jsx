import { useEffect, useState } from 'react';
import './App.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from './components/DataTable';
import Header from './components/Header';

function App() {
  const [authChecking, setAuthChecking] = useState(true);
  
  const auth = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(function () {
    if (auth.isloggedIn) {
      setAuthChecking(false);
    }
    else {
      navigate("/login")
      // checkIsLoggedIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isloggedIn]);


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
