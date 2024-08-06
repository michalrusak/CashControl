import { AuthState } from '../modules/auth/store/auth.reducer';
import { PreferencesState } from '../modules/preferences/store/preferences.reducer';

export interface AppState {
  auth: AuthState;
  preferences: PreferencesState;
}
