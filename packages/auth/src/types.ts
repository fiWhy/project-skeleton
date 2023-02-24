import type { Maybe, Nullable } from '@dot-tools/types';
import type { Credentials, FromAppRouter } from '@dot/server';
import type {
  UseGoogleLoginOptionsAuthCodeFlow,
  UseGoogleLoginOptionsImplicitFlow
} from '@react-oauth/google';

export interface AuthContextProps {
  userCredentials: Nullable<Credentials>;
  user?: Maybe<FromAppRouter['users']['currentUser']>;
  onUpdateUserCredentials: (userCredentials: Nullable<Credentials>) => void;
  onUpdateUser: (user: FromAppRouter['users']['currentUser']) => void;
}

type FlowOptions<T> = Omit<T, 'flow'>;

export type CodeFlowOptions = FlowOptions<UseGoogleLoginOptionsAuthCodeFlow>;
export type ImplicitFlowOptions =
  FlowOptions<UseGoogleLoginOptionsImplicitFlow>;
