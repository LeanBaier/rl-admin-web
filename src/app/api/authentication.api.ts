import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../enviroment';

@Injectable({
  providedIn: 'root',
})
export class StudyDocumentsService {
  private apiUrl = environment.apiStudyDocumentsUrl;

  constructor(private http: HttpClient) {
  }


}
