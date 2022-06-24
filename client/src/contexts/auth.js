import { createContext } from 'react';

const AuthContext = createContext({
  user: {},
  logout: () => {},
});

export default AuthContext; 


