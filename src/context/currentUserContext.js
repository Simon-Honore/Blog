import { createContext, useState } from 'react';

export const CurrentUserContext = createContext();

// provider
const CurrentUserContextProvider = props => {
  const [ user, setUser ] = useState(null);
  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;