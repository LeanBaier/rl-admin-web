import {Component} from '@angular/core';
import {catchError, throwError} from 'rxjs';
import {
  GetStudyDocumentFieldsDTO,
  GetStudyDocumentsData,
  GetStudyDocumentsFilters,
  GetStudyDocumentsFiltersDefault,
  SaveStudyDocumentDTO,
} from '../api/study-documents.api';
import {RlMessage} from '../commons/api-commons';
import {DocumentsFiltersComponent} from "./documents-filters/documents-filters.component";
import {StudyDocumentsService} from "../service/study-documents.service";
import {DocumentsTableComponent} from "./documents-table/documents-table.component";

@Component({
  selector: 'app-documents-view',
  standalone: true,
  imports: [
    DocumentsFiltersComponent,
    DocumentsTableComponent
  ],
  templateUrl: './documents-view.component.html',
  styleUrl: './documents-view.component.scss',
})
export class DocumentsViewComponent {
  documents: GetStudyDocumentsData = {documents: [], totalPages: 0, totalElements: 0, page: 0, elements: 0};
  messages: RlMessage[] = [];
  filters: GetStudyDocumentsFilters = GetStudyDocumentsFiltersDefault();
  isSearchingDocuments = false;
  isLoadingFields = false;
  filterFields: GetStudyDocumentFieldsDTO | null = null;

  constructor(private studyDocumentsService: StudyDocumentsService) {
  }

  ngOnInit() {
    this.searchStudyDocuments(this.filters);
    this.loadFilterFields();
  }

  searchStudyDocuments(filters: GetStudyDocumentsFilters) {
    this.isSearchingDocuments = true;
    this.filters = filters;
    this.studyDocumentsService
      .getStudyDocuments(filters)
      .pipe(catchError((error) => {
        this.isSearchingDocuments = false;
        return throwError(() => error)
      }))
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
        this.isSearchingDocuments = false
      });
  }

  loadFilterFields() {
    this.isLoadingFields = true;
    this.studyDocumentsService
      .getStudyDocumentFields()
      .pipe(catchError((error) => {
        this.isLoadingFields = false;
        return throwError(() => error)
      }))
      .subscribe((response) => {
        if (response.data) {
          this.filterFields = response.data;
        }
        if (response.messages) {
          this.messages = response.messages;
        }
        if (response.error) {
          console.log(response.error);
          throwError(() => response.error);
        }
        this.isLoadingFields = false
      });
  }

  createNewDocument(request: SaveStudyDocumentDTO) {
    this.studyDocumentsService.createNewDocument(request).pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    ).subscribe(response => {
      if (response.data) {
        this.searchStudyDocuments(GetStudyDocumentsFiltersDefault())
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
