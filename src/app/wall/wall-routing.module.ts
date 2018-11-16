import { RouterModule, Routes } from '@angular/router';
import { WallComponent } from './wall.component';
import { NgModule } from '@angular/core';
import { NewPostComponent } from './post/newpost/newpost.component';

const routes: Routes = [
    {
        path: '',
        component: WallComponent,
    },
    {
        path: 'new',
        component: NewPostComponent,
    },
    {
        path: 'edit',
        component: NewPostComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WallRoutingModule { }
