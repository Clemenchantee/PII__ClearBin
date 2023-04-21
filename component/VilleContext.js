
import React from 'react';

const VilleContext = React.createContext();

export const VilleProvider = ({ children }) => {
  const [villeSelectionnee, setVilleSelectionnee] = React.useState('');

  return (
    <VilleContext.Provider value={{ villeSelectionnee, setVilleSelectionnee }}>
      {children}
    </VilleContext.Provider>
  );
};

export default VilleContext;

