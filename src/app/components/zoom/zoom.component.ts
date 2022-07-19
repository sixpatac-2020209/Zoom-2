import { Component, OnInit } from '@angular/core';
import { UserData } from '../models/user.interface';
import { ActivatedRoute } from '@angular/router';
import { ZoomService } from './zoom.service';
import { Meeting } from '../models/meeting.interface';

@Component({
  selector: 'app-zoom',
  template: ``,
  styles: []
})
export class ZoomComponent implements OnInit {
  meeting!: string;
  passcode!: string;
  private user: UserData = { // You can get the user's data in some other way, like a UserService
    name: 'onlinedoctor',
    email: 'onlinedoctor_in6av@hotmail.com'
  };
  constructor(
    private route: ActivatedRoute,
    private zoomServ: ZoomService,
  ) { }

  ngOnInit() {
    this.meeting = this.route.snapshot.paramMap.get('meeting') || '';
    this.passcode = this.route.snapshot.paramMap.get('passcode') || '';
    this.zoomServ.loadZoom();
    return this.startMeeting();
  }
  
  startMeeting() {
    const meeting: Meeting = {
      id: this.meeting,
      passcode: this.passcode,
      name: 'Carlitos'
    };
    return this.zoomServ.startMeeting(meeting, this.user);
  }
}
