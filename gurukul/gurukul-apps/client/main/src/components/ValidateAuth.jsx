import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { verifyEducatorToken, verifyEducatorRole } from '../redux/api/authAPI';

export const ValidateAuth = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const validate = async () => {
      try {
        await dispatch(verifyEducatorToken({ dispatch }));
        await dispatch(verifyEducatorRole({ dispatch }));
      } catch (err) {
        console.error('Auth verification error:', err);
      } finally {
        setLoaded(true);
      }
    };
    validate();
  }, [dispatch]);

  if (!loaded) return null;

  return <Outlet />;
};
