import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { RlResponse } from '../commons/api-commons';
import { environment } from '../enviroment';

@Injectable()
export class StudyDocumentsApi {
  private apiUrl = environment.apiStudyDocumentsUrl;

  constructor(private http: HttpClient) {}

  getStudyDocuments(
    filters: GetStudyDocumentsFilters
  ): Observable<RlResponse<GetStudyDocumentsData>> {
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

export class GetStudyDocumentsFilters {
  name: string | null;
  level: string | null;
  topic: string | null;
  page: number;
  size: number;

  constructor(
    name: string | null,
    level: string | null,
    topic: string | null,
    page: number,
    size: number
  ) {
    this.name = name;
    this.level = level;
    this.topic = topic;
    this.page = page;
    this.size = size;
  }
}

export class GetStudyDocumentsData {
  documents: StudyDocumentDTO[];

  constructor(documents: StudyDocumentDTO[]) {
    this.documents = documents;
  }
}

export class StudyDocumentDTO {
  idStudyDocument: number;
  description: string;
  title: string;
  order: number;
  content: string;
  icon: string;
  level: StudyDocumentLevelDTO;
  topic: StudyDocumentTopicDTO;

  constructor(
    idStudyDocument: number,
    description: string,
    title: string,
    order: number,
    content: string,
    icon: string,
    level: StudyDocumentLevelDTO,
    topic: StudyDocumentTopicDTO
  ) {
    this.idStudyDocument = idStudyDocument;
    this.description = description;
    this.title = title;
    this.order = order;
    this.content = content;
    this.icon = icon;
    this.level = level;
    this.topic = topic;
  }
}

export class StudyDocumentLevelDTO {
  idLevel: number;
  name: string;
  description: string;

  constructor(idLevel: number, name: string, description: string) {
    this.idLevel = idLevel;
    this.name = name;
    this.description = description;
  }
}

export class StudyDocumentTopicDTO {
  idTopic: number;
  name: string;
  description: string;

  constructor(idTopic: number, name: string, description: string) {
    this.idTopic = idTopic;
    this.name = name;
    this.description = description;
  }
}
