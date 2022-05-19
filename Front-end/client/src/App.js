import React from 'react';
import Routes from './components/Routes/index';
import { useJwt } from "react-jwt";
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';

function App() {
  
  const dispatch = useDispatch();
  
  // Récupération du cookie et décodage du token pour récupérer l'user Id 
  const readCookie = document.cookie;
  const token = readCookie.split('jwt=')[1];
  const { decodedToken } = useJwt(token);
  // console.log(decodedToken.userId);
  const UserIdContext = React.createContext();
  
  dispatch(getUser({decodedToken}))

  return (
    <UserIdContext.Provider value={decodedToken}>
      <Routes />
    </ UserIdContext.Provider>
  );
}

export default App;
