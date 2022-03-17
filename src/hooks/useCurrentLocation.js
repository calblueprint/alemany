/* eslint-disable import/prefer-default-export */
import { useCallback } from 'react';

import * as MapLocation from 'expo-location';

export const useCurrentLocation = () =>
  useCallback(async () => {
    const { status } = await MapLocation.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      /* TODO: Nagivate to error screen instead of throwing Error which breaks app. */
      throw new Error('Permission to access location was denied');
    } else {
      const currentLocation = await MapLocation.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      return {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
    }
  }, []);
