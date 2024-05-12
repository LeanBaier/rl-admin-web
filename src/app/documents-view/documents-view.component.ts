import { Component, Inject } from '@angular/core';
import { throwError } from 'rxjs';
import {
  GetStudyDocumentsData,
  GetStudyDocumentsFilters,
} from '../api/study-documents.api';
import { RlMessage } from '../commons/api-commons';
import { StudyDocumentsService } from '../service/study-documents.service';

@Component({
  selector: 'app-documents-view',
  standalone: true,
  providers: [StudyDocumentsService],
  imports: [],
  templateUrl: './documents-view.component.html',
  styleUrl: './documents-view.component.scss',
})
@Inject
export class DocumentsViewComponent {
  documents: GetStudyDocumentsData;
  messages: RlMessage[];
  filters: GetStudyDocumentsFilters;

  constructor(private studyDocumentsService: StudyDocumentsService) {
    this.documents = new GetStudyDocumentsData([]);
    this.messages = [];
    this.filters = new GetStudyDocumentsFilters(null, null, null, 1, 10);
    this.studyDocumentsService
      .getStudyDocuments(this.filters)
      .subscribe((response) => {
        if (response.data) {
          this.documents = response.data;
        }
        if (response.messages) {
          this.messages = response.messages;
        }
        if (response.error) {
          console.log(response.error);
          throwError(() => response.error);
        }
      });
  }
}
