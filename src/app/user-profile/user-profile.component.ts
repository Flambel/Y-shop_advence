import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    note: any;

    constructor(private notification: NotificationsService) {
    }

    ngOnInit() {
        this.note = this.notification;
    }

    showNotification(from, align, typMsg) {
        this.note.showNotification(from, align, typMsg);
    }
}
