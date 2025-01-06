import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useCheckHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkStorage = () => {
      const value = localStorage.getItem('isDraw');
      if (!value) {
        navigate('/');
      }
    };
    checkStorage();
    window.addEventListener('storage', checkStorage);
    return () => {
      window.removeEventListener('storage', checkStorage);
    };
  }, [navigate]);

  return null;
};

export default useCheckHome;
