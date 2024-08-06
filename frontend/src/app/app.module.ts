import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { HomeModule } from './modules/home/home.module';
import { AuthModule } from './modules/auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './modules/auth/store/auth.reducer';
import { AuthEffects } from './modules/auth/store/auth.effects';
import { NotifierOptions, NotifierModule } from 'angular-notifier';
import { PreferencesModule } from './modules/preferences/preferences.module';
import { SettingsModule } from './modules/settings/settings.module';
import { FinanceModule } from './modules/finance/finance.module';
import { preferencesReducer } from './modules/preferences/store/preferences.reducer';
import { PreferencesEffects } from './modules/preferences/store/preferences.effects';

const customNotifier: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    AuthModule,
    PreferencesModule,
    SettingsModule,
    FinanceModule,
    StoreModule.forRoot({ auth: authReducer, preferences: preferencesReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot(AuthEffects, PreferencesEffects),
    NotifierModule.withConfig(customNotifier),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
