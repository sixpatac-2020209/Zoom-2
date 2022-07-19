import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meeting } from '../models/meeting.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit, OnDestroy {
  activeMeeting!: Meeting;
  url = '';
  private meetings: Meeting[] = [
    { name: 'meeting1', id: '98821761790', passcode: '12345' },
    { name: 'meeting2', id: '', passcode: '' },
    { name: 'meeting3', id: '', passcode: '' },
  ];
  public destroy = new Subject();
  constructor(
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy)).subscribe(
      ({ meeting }) => this.validateMeeting(meeting)
    );

  }
  ngOnDestroy() {
    this.destroy.next('');
    this.destroy.complete();
  }

  public validateMeeting(meetingName: string) {
    const meeting = this.meetings.find(meeting => meeting.name === meetingName);
    return meeting
      ? this.setMeetingUrl(meeting)
      : this.router.navigateByUrl('/home');
  }

  public setMeetingUrl(meeting: Meeting) {
    this.activeMeeting = meeting;
    this.url = `/zoom/${ meeting.id }/${ meeting.passcode }`;
  }
}
