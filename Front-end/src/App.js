import React from 'react';
import Routes from './components/Routes/index';
import { useJwt } from "react-jwt";
import { useDispatch } from 'react-redux';
import { getUser} from './actions/user.actions';

export function convertTime(isoDate) {
  
  const newDate = new Date(isoDate);

    let transformedDate = newDate.toLocaleString('fr-FR',{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'});

    return transformedDate;

}

const App = () => {
  
  const dispatch = useDispatch();

  // Récupération du cookie et décodage du token pour récupérer l'user Id 
  const readCookie = document.cookie;
  const token = readCookie.split('jwt=')[1];
  const { decodedToken } = useJwt(token);
  let userId = {};

  if (decodedToken !== null) {
    userId = decodedToken.userId
  }

  const UserIdContext = React.createContext();

  dispatch(getUser(userId));

  return (
    <UserIdContext.Provider value={decodedToken}>
      <Routes />
    </ UserIdContext.Provider>
  );
}

export default App;
