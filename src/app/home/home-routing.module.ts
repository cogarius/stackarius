import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { NewNoteComponent } from './notes/newnote/newnote.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'new',
        component: NewNoteComponent,
    },
    {
        path: 'edit',
        component: NewNoteComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
