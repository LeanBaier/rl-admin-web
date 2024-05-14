import {Component} from '@angular/core';
import {throwError} from 'rxjs';
import {GetStudyDocumentsData, GetStudyDocumentsFilters,} from '../api/study-documents.api';
import {RlMessage} from '../commons/api-commons';
import {StudyDocumentsService} from '../service/study-documents.service';

@Component({
  selector: 'app-documents-view',
  standalone: true,
  imports: [],
  templateUrl: './documents-view.component.html',
  styleUrl: './documents-view.component.scss',
})
export class DocumentsViewComponent {
  documents: GetStudyDocumentsData;
  messages: RlMessage[];
  filters: GetStudyDocumentsFilters;

  constructor(private studyDocumentsService: StudyDocumentsService) {
    this.documents = {
      documents: [],
    }
    this.messages = [];
    this.filters = {
      name: null,
      level: null,
      topic: null,
      page: 1,
      size: 10
    };
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
