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
    if (filters.orderBy) {
      httpParams = httpParams.set('orderBy', filters.orderBy);
    }
    if (filters.order) {
      httpParams = httpParams.set('order', filters.order);
    }
    httpParams = httpParams.set('page', filters.page.toString())
      .set('size', filters.size.toString());

    return this.http.get<RlResponse<GetStudyDocumentsData>>(this.apiUrl + '/api/v1/study-documents', {
      params: httpParams,
    });
  }

  getStudyDocumentFields(): Observable<RlResponse<GetStudyDocumentFieldsDTO>> {
    return this.http.get<RlResponse<GetStudyDocumentFieldsDTO>>(this.apiUrl + '/api/v1/study-documents/fields',);
  }

  createNewDocument(request: SaveStudyDocumentDTO): Observable<RlResponse<StudyDocumentDTO>> {
    return this.http.post<RlResponse<StudyDocumentDTO>>(this.apiUrl + '/api/v1/study-documents', request);
  }

  updateStudyDocument(request: SaveStudyDocumentDTO): Observable<RlResponse<StudyDocumentDTO>> {
    return this.http.put<RlResponse<StudyDocumentDTO>>(this.apiUrl + '/api/v1/study-documents/' + request.idStudyDocument, request);
  }

  deleteStudyDocument(idStudyDocument: number): Observable<RlResponse<StudyDocumentDTO>> {
    return this.http.delete<RlResponse<StudyDocumentDTO>>(this.apiUrl + '/api/v1/study-documents/' + idStudyDocument);
  }
}

export interface SaveStudyDocumentDTO {
  idStudyDocument: number;
  description: string;
  title: string;
  order: number;
  content: string;
  icon: string;
  documentLevelId: number;
  documentTopicId: number;
}

export interface GetStudyDocumentsFilters {
  name: string | null;
  level: string | null;
  topic: string | null;
  order: string | null;
  orderBy: string | null;
  page: number;
  size: number;

}

export function GetStudyDocumentsFiltersDefault(): GetStudyDocumentsFilters {
  return {
    name: null,
    level: null,
    topic: null,
    order: null,
    orderBy: null,
    page: 1,
    size: 10
  }
}


export interface GetStudyDocumentsData {
  documents: StudyDocumentDTO[];
  totalPages: number | null;
  totalElements: number | null;
  page: number | null;
  elements: number | null;
}

export interface StudyDocumentDTO {
  idStudyDocument: number;
  description: string;
  title: string;
  order: number;
  content: string;
  icon: string;
  modal: string;
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

export interface FieldOrderByFieldDTO {
  name: string
  description: string
}

export interface FieldOrderDirectionDTO {
  order: string
  description: string
}

export interface GetStudyDocumentFieldsDTO {
  topics: StudyDocumentTopicDTO[];
  levels: StudyDocumentLevelDTO[];
  orderByFields: FieldOrderByFieldDTO[];
  orderDirections: FieldOrderDirectionDTO[];

}
