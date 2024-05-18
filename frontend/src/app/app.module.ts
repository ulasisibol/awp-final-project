import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './main/home/home.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppComponent, // AppComponent'i import ediyoruz
        AdminComponent, // AdminComponent'i import ediyoruz
        HomeComponent // HomeComponent'i import ediyoruz
    ]
})
export class AppModule { }