import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import remoteConfig from '@react-native-firebase/remote-config';

import type { HomeScreenConfig } from '@shared/types/config';
import { mockHomeConfig } from '@shared/constants/mockHomeConfig';

export const remoteConfigApi = createApi({
  reducerPath: 'remoteConfigApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: builder => ({
    getHomeConfig: builder.query<HomeScreenConfig, void>({
      queryFn: async () => {
        try {
          const rc = remoteConfig();
          await rc.setDefaults({
            home_screen_config: JSON.stringify(mockHomeConfig),
          });
          await rc.fetchAndActivate();
          const value = rc.getValue('home_screen_config');
          const config: HomeScreenConfig = JSON.parse(value.asString());
          return { data: config };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: String(error) } };
        }
      },
    }),
  }),
});

export const { useGetHomeConfigQuery } = remoteConfigApi;
