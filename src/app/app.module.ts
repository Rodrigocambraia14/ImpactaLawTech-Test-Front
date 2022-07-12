import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesComponent } from './pages/pages.component';
import { AuthComponent } from './pages/auth/auth.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/app.states';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuardService } from './services/auth-guard.service';
import { ToastService } from './services/toast.service';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule, 
    BrowserAnimationsModule,
    EffectsModule.forRoot([AuthEffects]),
        StoreModule.forRoot(reducers, { metaReducers }),
  ],
  providers: [AuthGuardService,
    ToastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
