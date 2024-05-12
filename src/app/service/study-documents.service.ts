import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GetStudyDocumentsData,
  GetStudyDocumentsFilters,
  StudyDocumentsApi,
} from '../api/study-documents.api';
import { RlResponse } from '../commons/api-commons';
import { environment } from '../enviroment';

@Injectable()
export class StudyDocumentsService {
  private apiUrl = environment.apiStudyDocumentsUrl;

  constructor(private studyDocumentsApi: StudyDocumentsApi) {}

  getStudyDocuments(
    filters: GetStudyDocumentsFilters
  ): Observable<RlResponse<GetStudyDocumentsData>> {
    return this.studyDocumentsApi.getStudyDocuments(filters);
  }
}
