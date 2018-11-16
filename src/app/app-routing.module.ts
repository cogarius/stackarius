import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'welcome', pathMatch: 'full'
    },
    {
        path: 'notes', loadChildren: './home/home.module#HomeModule',
    },
    {
        path: 'welcome', component: WelcomeComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'wall', loadChildren: './wall/wall.module#WallModule',
    },
    {
        path: 'contacts', loadChildren: './contacts/contacts.module#ContactsModule', data: { preload: true }
    },
];

@NgModule({
    imports: [
        CommonModule,

        RouterModule.forRoot(
            routes,
            {
                useHash: false,
                enableTracing: false,
                preloadingStrategy: PreloadAllModules
            } // rem: set tracing to false before going to prod
            // useHash <-- avoiding HashLocationStrategy, LocationStrategy
            // enableTracing <-- debugging purposes only
        )
    ],
    declarations: []
})
export class AppRoutingModule { }
