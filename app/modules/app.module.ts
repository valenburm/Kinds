import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MainComponent} from "../components/main/app.main";
import {DayComponent} from "../components/day/bvm.day-item";

@NgModule({
    imports:        [BrowserModule],   // import Angular's BrowserModule
    bootstrap:      [MainComponent],   // indicate the bootstrap component
    declarations:   [MainComponent, DayComponent],   // register our component with the module
    providers:      []
})

export class AppModule { }