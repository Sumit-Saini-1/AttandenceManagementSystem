import { useEffect, useState } from 'react';
import './App.css';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from './components/table';

function App() {
  const [authChecking, setAuthChecking] = useState(false);
  
  const auth = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  useEffect(function () {
    if (auth.isloggedIn) {
      setAuthChecking(false);
    }
    else {
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
              <Table/>
            </div>
            :
            <Navigate to={"/login"} />
      }
    </>
  )
}

export default App
