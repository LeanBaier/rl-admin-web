import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
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
    let httpParams = new HttpParams();
    if (filters.name) {
      httpParams = httpParams.set('name', filters.name);
    }
    if (filters.level) {
      httpParams = httpParams.set('level', filters.level);
    }
    if (filters.topic) {
      httpParams = httpParams.set('topic', filters.topic);
    }
    httpParams = httpParams.set('page', filters.page.toString())
      .set('size', filters.size.toString());

    return this.http.get<RlResponse<GetStudyDocumentsData>>(this.apiUrl + '/api/v1/study-documents', {
      params: httpParams,
    });
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
