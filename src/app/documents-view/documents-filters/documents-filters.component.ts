import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormsModule} from "@angular/forms";
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
    NgForOf
  ],
  templateUrl: './documents-filters.component.html',
  styleUrl: './documents-filters.component.scss'
})
export class DocumentsFiltersComponent {
  @Output("onSubmitCallback") onSubmitCallback: EventEmitter<any> = new EventEmitter();
  @Input({required: true}) isSearchingDocuments: boolean = false;
  @Input({required: true}) isLoadingFields: boolean = false;
  @Input({required: true}) filterFields: GetStudyDocumentFieldsDTO | null = null;
  name = new FormControl();
  level = new FormControl();
  topic = new FormControl();
  page = new FormControl(1);
  size = new FormControl(10);
  orderBy = new FormControl();
  order = new FormControl();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isLoading']) {
      this.isSearchingDocuments = changes['isSearchingDocuments'].currentValue;
      this.isLoadingFields = changes['isLoadingFields'].currentValue;
    }
  }

  onSubmit() {
    let filters: GetStudyDocumentsFilters = {
      name: this.name.value,
      level: this.level.value,
      topic: this.topic.value,
      orderBy: this.orderBy.value,
      order: this.order.value,
      page: this.page.value ? this.page.value : 1,
      size: this.size.value ? this.size.value : 10,
    }
    this.onSubmitCallback.emit(filters);
  }

}
