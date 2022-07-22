import React from 'react';
import Routes from './components/Routes/index';

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

  return ( 
      <Routes />
  );
}

export default App;
