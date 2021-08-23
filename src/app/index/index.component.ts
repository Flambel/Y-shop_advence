import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    date = new Date();
    time: string = '';
    numDay: number;
    weekDay: string = '';
    month: string = '';
    constructor() { }

    ngOnInit(): void {
        this.date_time();
    }

    date_time() {
        let date = new Date;
        let year = date.getFullYear();
        let month = date.getMonth();
        let months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
        let d = date.getDate();
        let day = date.getDay();
        let days = new Array('Sunday', 'monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        let h: any = date.getHours();
        if (h < 10) {
            h = "0" + h;
        }
        let m: any = date.getMinutes();
        if (m < 10) {
            m = "0" + m;
        }
        let s: any = date.getSeconds();
        if (s < 10) {
            s = "0" + s;
        }
        this.numDay = d;
        this.weekDay = days[day];
        this.month = months[month];
        this.time = h + ':' + m + ':' + s;
        setInterval(() => this.date_time(), 1000);
        return true;
    }


}
