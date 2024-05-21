import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        CommonModule
    ]
})
export class AppModule { }