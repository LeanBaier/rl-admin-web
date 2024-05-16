import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {GetStudyDocumentFieldsDTO, StudyDocumentDTO} from "../../api/study-documents.api";

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

  @Output("onSubmitCallback") onSubmitCallback: EventEmitter<any> = new EventEmitter();
  @Input({required: true}) isLoadingFields: boolean = false;
  @Input({required: true}) fields: GetStudyDocumentFieldsDTO | null = null;
  @Input({required: true}) inputId: string = '';
  @Input({transform: booleanAttribute}) isEditing: boolean = false;

  documentForm: FormGroup;
  document: StudyDocumentDTO | null = null;

  constructor(private formBuilder: FormBuilder) {
    this.documentForm = this.formBuilder.group({})
    this.cleanForm();
  }

  setDocument(document: StudyDocumentDTO) {
    this.document = document;
    this.isEditing = true;
    this.loadFormFromDocument();
  }

  loadFormFromDocument() {
    this.documentForm = this.formBuilder.group({
      title: this.document?.title,
      content: this.document?.content,
      level: this.document?.level.idLevel,
      topic: this.document?.topic.idTopic,
      modal: this.document?.modal,
      icon: this.document?.icon,
      order: this.document?.order
    });
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
    this.onSubmitCallback.emit({
      idStudyDocument: this.document?.idStudyDocument,
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
