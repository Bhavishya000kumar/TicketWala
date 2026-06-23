import { useAuth as useAuthContext } from '../context/AuthContext';

/**
 * Custom hook to access CineVerse authentication actions & state
 * @returns {{ user: Object, loading: boolean, login: Function, loginWithFirebase: Function, logout: Function, register: Function }}
 */
export const useAuth = () => {
  return useAuthContext();
};

export default useAuth;
