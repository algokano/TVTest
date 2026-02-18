import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@store/index';
import { useGetHomeConfigQuery } from '@store/services/remoteConfigApi';
import { selectOrderedSections } from '@store/slices/catalogSlice';
import { setHomeCatalogFromConfig } from '@store/slices/catalogSlice';
import { setHomeConfig, setLoading, setError } from '@store/slices/configSlice';

export const useHomeSections = () => {
  const dispatch = useAppDispatch();
  const sections = useAppSelector(selectOrderedSections);

  const { data, isLoading, isError, error } = useGetHomeConfigQuery();

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading());
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (isError) {
      const message =
        (typeof error === 'object' && error !== null && 'status' in error
          ? String((error as any).status)
          : 'Failed to load config') || 'Failed to load config';
      dispatch(setError(message));
    }
  }, [dispatch, error, isError]);

  useEffect(() => {
    if (data) {
      dispatch(setHomeConfig(data));
      dispatch(setHomeCatalogFromConfig(data));
    }
  }, [data, dispatch]);

  return {
    sections,
    isLoading,
    isError,
  };
};
