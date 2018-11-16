import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsMainComponent } from './contacts-main/contacts-main.component';


const routes: Routes = [
    {
        path: '',
        component: ContactsMainComponent,
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactsRoutingModule { }
