import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  GetStudyDocumentFieldsDTO,
  GetStudyDocumentsData,
  GetStudyDocumentsFilters,
  SaveStudyDocumentDTO,
  StudyDocumentDTO,
  StudyDocumentsApi,
} from '../api/study-documents.api';
import {RlResponse} from '../commons/api-commons';

@Injectable({
  providedIn: 'root',
})
export class StudyDocumentsService {
  constructor(private studyDocumentsApi: StudyDocumentsApi) {
  }

  getStudyDocuments(filters: GetStudyDocumentsFilters): Observable<RlResponse<GetStudyDocumentsData>> {
    return this.studyDocumentsApi.getStudyDocuments(filters);
  }

  getStudyDocumentFields(): Observable<RlResponse<GetStudyDocumentFieldsDTO>> {
    return this.studyDocumentsApi.getStudyDocumentFields();
  }

  createNewDocument(request: SaveStudyDocumentDTO): Observable<RlResponse<StudyDocumentDTO>> {
    return this.studyDocumentsApi.createNewDocument(request);
  }
}
