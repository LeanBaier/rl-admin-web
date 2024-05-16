import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {GetStudyDocumentFieldsDTO} from "../../api/study-documents.api";

@Component({
  selector: 'app-document-form',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './document-form.component.html',
  styleUrl: './document-form.component.scss'
})
export class DocumentFormComponent {

  @Output("onCreateDocumentCallback") onCreateDocumentCallback: EventEmitter<any> = new EventEmitter();
  @Input({required: true}) isLoadingFields: boolean = false;
  @Input({required: true}) fields: GetStudyDocumentFieldsDTO | null = null;
  @Input({required: true}) inputId: string = '';
  @Input() isEditing: boolean = false;

  documentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.documentForm = this.formBuilder.group({})
    this.cleanForm();
  }

  cleanForm() {
    this.documentForm = this.formBuilder.group({
      title: null,
      content: null,
      level: null,
      topic: null,
      modal: null,
      icon: null,
      order: null,
    });
  }

  onSubmit() {
    console.log('submit');
    this.onCreateDocumentCallback.emit({
      description: this.documentForm.get('title')?.value,
      title: this.documentForm.get('title')?.value,
      order: this.documentForm.get('order')?.value,
      content: this.documentForm.get('content')?.value,
      icon: this.documentForm.get('icon')?.value,
      documentLevelId: this.documentForm.get('level')?.value,
      documentTopicId: this.documentForm.get('topic')?.value,
      modal: this.documentForm.get('modal')?.value
    })
  }

}
