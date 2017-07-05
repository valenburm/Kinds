import {Component, OnInit } from '@angular/core';

@Component({
    selector : 'main',
    templateUrl: './app.main.html'
})

export class MainComponent implements OnInit {
    varsion: string;
    days: string[];

    constructor(){
        this.varsion = '1.0.2';
        this.days = ['Mon', 'Wen', 'Sat'];
    }

    ngOnInit(){

    }
}