import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { HomeScreenConfig } from '@shared/types/config';
import { mockHomeConfig } from '@shared/constants/mockHomeConfig';

export const remoteConfigApi = createApi({
  reducerPath: 'remoteConfigApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: builder => ({
    getHomeConfig: builder.query<HomeScreenConfig, void>({
      /**
       * In a real app this would call Firebase Remote Config.
       * For this assignment, we return strongly typed mock data.
       */
      queryFn: async () => {
        return { data: mockHomeConfig };
      },
    }),
  }),
});

export const { useGetHomeConfigQuery } = remoteConfigApi;
