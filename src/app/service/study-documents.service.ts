import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GetStudyDocumentsData, GetStudyDocumentsFilters, StudyDocumentsApi,} from '../api/study-documents.api';
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
}
