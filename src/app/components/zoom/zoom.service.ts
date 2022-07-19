import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZoomMtg } from '@zoomus/websdk';
import { environment } from '../../../environments/environment';
import { Meeting, ZoomResponse } from '../models/meeting.interface';
import { UserData } from '../models/user.interface';

const { zoomApiKey } = environment;

@Injectable()
export class ZoomService {
  private signatureEndpoint = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Ii1tdmlaWTRmVDU2R1VONUN0c3hNZWciLCJleHAiOjE2ODk3MDMxNDAsImlhdCI6MTY1ODE4MTI0OH0.varaEpPlFA6pmwBDlqlxEBtR5lqRJ_GAAkeC-PYo4YE'; // Add your own signature endpoint here
  private leaveUrl = 'http://onlinedoctor_in6av.com/zoom-meeting/'; // Trivial if using Zoom inside iframe
  
  constructor(
  private http: HttpClient,
  ) { }

  loadZoom() {
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
  }

  private getSignature(meetingNumber: string, role = 0) {
    return this.http.post<{ signature: string }>(this.signatureEndpoint, { meetingNumber, role }).toPromise();
  }

  async startMeeting(meeting: Meeting, user: UserData) {
    const  signature  = {
      apiKey: "-mviZY4fT56GUN5CtsxMeg",
      apiSecret: "M3SHbzGRNDpXkJotcc0Uf42tDXyoteI5Gaty",
      meetingNumber: "98821761790",
      role: 0, 
    };
    return this.initZoomMeeting(signature, meeting, user);
  }

  public initZoomMeeting(signature: any, meeting: Meeting, user: UserData) {
    return new Promise<ZoomResponse>((resolve, reject) => {
      ZoomMtg.init({
        leaveUrl: this.leaveUrl,
        isSupportAV: true,
        success: (_: ZoomResponse) => {
          this.joinMeeting(signature, meeting, user)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        },
        error: (error: ZoomResponse) => reject(error)
      });
    });
  }

  public joinMeeting(signature: any, meeting: Meeting, user: UserData) {
    return new Promise<ZoomResponse>((resolve, reject) => {
      ZoomMtg.join({
        signature,
        meetingNumber: meeting.id,
        apiKey: zoomApiKey,
        userName: user.name,
        userEmail: user.email,
        passWord: meeting.passcode,
        success: (success: ZoomResponse) => {
          resolve(success);
        },
        error: (error: ZoomResponse) => reject(error)
      });
    });
  }
}
