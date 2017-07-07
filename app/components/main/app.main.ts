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

    addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
        console.log(`Adding article title: ${title.value} and link: ${link.value}`);
        this.days.push(title.value);
        return false;
    }

    sortedDays(): string[]
    {
        return this.days.sort((a: string, b: string) => b === a ? 0 : 1);
    }
}