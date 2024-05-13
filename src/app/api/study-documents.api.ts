import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {RlResponse} from '../commons/api-commons';
import {environment} from '../enviroment';

@Injectable({
  providedIn: 'root',
})
export class StudyDocumentsApi {
  private apiUrl = environment.apiStudyDocumentsUrl;

  constructor(private http: HttpClient) {
  }

  getStudyDocuments(filters: GetStudyDocumentsFilters): Observable<RlResponse<GetStudyDocumentsData>> {
    const httpParams = new HttpParams();
    if (filters.name) {
      httpParams.append('name', filters.name);
    }
    if (filters.level) {
      httpParams.append('level', filters.level);
    }
    if (filters.topic) {
      httpParams.append('topic', filters.topic);
    }
    httpParams.append('page', filters.page.toString());
    httpParams.append('size', filters.size.toString());
    return this.http
      .get<RlResponse<GetStudyDocumentsData>>(this.apiUrl, {
        params: httpParams,
      })
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      );
  }
}

export interface GetStudyDocumentsFilters {
  name: string | null;
  level: string | null;
  topic: string | null;
  page: number;
  size: number;
}

export interface GetStudyDocumentsData {
  documents: StudyDocumentDTO[];
}

export interface StudyDocumentDTO {
  idStudyDocument: number;
  description: string;
  title: string;
  order: number;
  content: string;
  icon: string;
  level: StudyDocumentLevelDTO;
  topic: StudyDocumentTopicDTO;
}

export interface StudyDocumentLevelDTO {
  idLevel: number;
  name: string;
  description: string;
}

export interface StudyDocumentTopicDTO {
  idTopic: number;
  name: string;
  description: string;
}
