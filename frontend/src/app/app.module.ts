import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './main/home/home.component';
import { AdminSignUpComponent } from './admin-sign-up/admin-sign-up.component';
import { AboutMeComponent } from './main/about-me/about-me.component';
import { WorksComponent } from './main/works/works.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ContactComponent } from './main/contact/contact.component';

@NgModule({
    providers: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppComponent,
        AdminComponent,
        HomeComponent,
        AdminSignUpComponent,
        AboutMeComponent,
        WorksComponent,
        NavbarComponent,
        FooterComponent,
        ContactComponent,
    ],
})
export class AppModule {
}