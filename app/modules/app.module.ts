import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BvmTestComponent} from "./../components/test001/bvm.testComponent";

@NgModule({
    imports:        [BrowserModule],      // import Angular's BrowserModule
    bootstrap:      [BvmTestComponent],   // indicate the bootstrap component
    declarations:   [BvmTestComponent],   // register our component with the module
    providers:      []
})

export class AppModule { }