/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
// TODO: add strong typing for react navigation props
export type RootStackParamList = {
  AuthLoading: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  TreeDetails: any;
  Login: undefined;
  Verify: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Trees: undefined;
  Login: undefined;
  Add: undefined;
  Search: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type Tree = {
  id: string;
  name: string | null;
  location: Location | null;
  planted: Planted | null;
  uuid: string;
};

export type Location = {
  latitude: number;
  longitude: number;
};

export type Planted = {
  seconds: number;
  nanoseconds: number;
};

export type Comment = {
  uuid: string;
  [key: string]: string;
};

export type Additional = {
  uuid: string;
  [key: string]: string;
};

export interface Dictionary {
  [key: string]: any;
}
