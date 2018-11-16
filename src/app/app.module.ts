import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthBlockstackModule } from './auth-blockstack/auth-blockstack.module';
import { EffectsModule } from '@ngrx/effects';
import { RoutingEffects } from './store/navigation';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        LoginComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule, // appcomponent uses router-outlet
        StoreModule.forRoot(reducers, { metaReducers }), !environment.production ? StoreDevtoolsModule.instrument() : [],
        // Connects RouterModule with StoreModule
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router', // defined router reducer key
        }),
        ClarityModule,
        BrowserAnimationsModule,
        EffectsModule.forRoot([RoutingEffects]),
        AuthBlockstackModule, // no lazy loading for login module
        AppRoutingModule,
        CoreModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

        // TODO: limit StoreDevtoolsModule to logOnly for production
        // StoreDevtoolsModule.instrument({
        //     maxAge: 25, // Retains last 25 states
        //     logOnly: environment.production, // Restrict extension to log-only mode
        //   }),
