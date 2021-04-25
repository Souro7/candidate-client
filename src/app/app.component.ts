import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

class Candidate {
  name: string;
  id: string;
  email: string;
  appointmentDate: Date;
  moveForward: boolean;
  interviewTranscription: string;
  actionResult: string;

  constructor(json?: any) {
    if (!json) {
      return;
    }
    this.id = json['_id'] || '';
    this.name = json['name'] || '';
    this.email = json['email'] || '';
    this.appointmentDate = new Date();
    this.moveForward = json['move_forward'] || false;
    this.interviewTranscription = json['interview_transcription'] || '';
    this.actionResult = json['action_result'] || '';
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  candidates = [];
  selectedCandidate = 0;
  selectedDate: Date;

  apiUrl = 'http://localhost:3000/api/candidates';

  constructor(private http: HttpClient) {
    this.getCandidates();
  }

  buildHeaders(argsObject: object): object {
    if (!argsObject) {
      // throw new Error('RequestOptionsArgs not passed to buildHeaders');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    argsObject['headers'] = headers;
    return argsObject;
  }

  getCandidates() {
    this.http.get(this.apiUrl, this.buildHeaders({})).subscribe(response => {
      console.log(response);
      for (const candidate of response['data']) {
        this.candidates.push(new Candidate(candidate));
      }
      console.log(this.candidates);
    }, error => {
      console.error(error);
    });
  }

  selectCandidate(id) {
    this.selectedCandidate = id;
    this.selectedDate = this.candidates[id]['appointmentDate'];
  }

  printDate(event) {
    console.log(event.value);
  }
}
