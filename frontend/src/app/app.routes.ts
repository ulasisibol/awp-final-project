import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { WorksComponent } from './main/works/works.component';
import { AboutMeComponent } from './main/about-me/about-me.component';
import { ContactComponent } from './main/contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminSignUpComponent } from './admin-sign-up/admin-sign-up.component';
import { LoginGuard } from './auth/login.control';



export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'works', component: WorksComponent },
    { path: 'about-me', component: AboutMeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'login', component: AdminSignUpComponent, canActivate: [LoginGuard] },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }