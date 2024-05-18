import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { WorksComponent } from './main/works/works.component';
import { AboutMeComponent } from './main/about-me/about-me.component';
import { ContactComponent } from './main/contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { AdminSignUpComponent } from './admin/admin-sign-up/admin-sign-up.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'works', component: WorksComponent },
    { path: 'about-me', component: AboutMeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'signUp', component: AdminSignUpComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }