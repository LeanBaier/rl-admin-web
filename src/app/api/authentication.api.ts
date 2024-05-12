import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../enviroment';
import { RlResponse } from '../commons/api-commons';

@Injectable()
export class StudyDocumentsService {
  private apiUrl = environment.apiStudyDocumentsUrl;

  constructor(private http: HttpClient) {}

  getStudyDocuments(
    token: string
  ): Observable<RlResponse<GetStudyDocumentsData>> {
    return this.http.get<RlResponse<GetStudyDocumentsData>>(this.apiUrl).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
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
