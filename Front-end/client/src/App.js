import React from 'react';
import Routes from './components/Routes/index';
import { useJwt } from "react-jwt";
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';

const App = () => {
  
  const dispatch = useDispatch();
  
  // useEffect(()=> {
  //   function getToken() {
  //     console.log("bonjour");
  //   }
  //   getToken();
  // }, [])

  // Récupération du cookie et décodage du token pour récupérer l'user Id 
  const readCookie = document.cookie;
  const token = readCookie.split('jwt=')[1];
  const { decodedToken } = useJwt(token);
  let userId = {};

  if (decodedToken !== null) {
    userId = decodedToken.userId
  }

  const UserIdContext = React.createContext();
  
  dispatch(getUser(userId))

  return (
    <UserIdContext.Provider value={decodedToken}>
      <Routes />
    </ UserIdContext.Provider>
  );
}

export default App;
