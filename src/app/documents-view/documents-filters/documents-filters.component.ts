import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {GetStudyDocumentFieldsDTO, GetStudyDocumentsFilters} from "../../api/study-documents.api";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-documents-filters',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgClass,
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './documents-filters.component.html',
  styleUrl: './documents-filters.component.scss'
})
export class DocumentsFiltersComponent {
  @Output("onSubmitCallback") onSubmitCallback: EventEmitter<GetStudyDocumentsFilters> = new EventEmitter();
  @Input({required: true}) isSearchingDocuments: boolean = false;
  @Input({required: true}) isLoadingFields: boolean = false;
  @Input({required: true}) filterFields: GetStudyDocumentFieldsDTO | null = null;
  @Input({required: true}) totalPages: number = 0;

  filterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      name: [null],
      level: [null],
      topic: [null],
      orderBy: [null],
      order: [null],
      page: [1],
      size: [10]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isLoading']) {
      this.isSearchingDocuments = changes['isSearchingDocuments'].currentValue;
      this.isLoadingFields = changes['isLoadingFields'].currentValue;
    }
  }

  onSubmit() {
    let filters: GetStudyDocumentsFilters = {
      name: this.filterForm.get('name')?.value,
      level: this.filterForm.get('level')?.value,
      topic: this.filterForm.get('topic')?.value,
      orderBy: this.filterForm.get('orderBy')?.value,
      order: this.filterForm.get('order')?.value,
      page: this.filterForm.get('page')?.value,
      size: this.filterForm.get('size')?.value
    }
    this.onSubmitCallback.emit(filters);
  }

  updatePage(page: number) {
    this.filterForm.get('page')?.setValue(page);
    this.onSubmit();
  }

}
