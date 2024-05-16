import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {GetStudyDocumentFieldsDTO, StudyDocumentDTO} from "../../api/study-documents.api";
import {NgForOf, NgIf} from "@angular/common";
import {DocumentFormComponent} from "../document-form/document-form.component";
import {Modal} from 'bootstrap';

@Component({
  selector: 'app-documents-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DocumentFormComponent
  ],
  templateUrl: './documents-table.component.html',
  styleUrl: './documents-table.component.scss'
})
export class DocumentsTableComponent {

  @Output("onEditDocumentCallback") onEditDocumentCallback: EventEmitter<any> = new EventEmitter();
  @Output("onDeleteDocumentCallback") onDeleteDocumentCallback: EventEmitter<any> = new EventEmitter();
  @Input({required: true}) isLoadingFields: boolean = false;
  @Input({required: true}) filterFields: GetStudyDocumentFieldsDTO | null = null;
  @Input({required: true}) documents: StudyDocumentDTO[] = [];
  @ViewChild(DocumentFormComponent) documentForm: DocumentFormComponent | null = null;
  editModal: Modal | null = null;
  documentToEdit: StudyDocumentDTO = this.defaultDocument();

  editDocument(id: number) {
    this.documentToEdit = this.documents.find(x => x.idStudyDocument == id)!;
    this.documentForm?.setDocument(this.documentToEdit);
    if (this.documentToEdit) {
      this.editModal = new Modal(document.getElementById('editDocumentModal')!, {keyboard: false});
      this.editModal.show();
    }
  };

  saveDocumentCallback(StudyDocumentDTO: StudyDocumentDTO) {
    this.onEditDocumentCallback.emit(StudyDocumentDTO);
    this.editModal?.hide();
  }

  deleteDocument(id: number) {
    const result = confirm("Desea eliminar el documento con id: " + id);
    if (result) {
      this.onDeleteDocumentCallback.emit(id);
    }
  }

  defaultDocument(): StudyDocumentDTO {
    return {
      idStudyDocument: 0,
      title: '',
      description: '',
      content: '',
      level: {
        idLevel: 0,
        name: '',
        description: ''
      },
      topic: {
        idTopic: 0,
        name: '',
        description: ''
      },
      modal: '',
      icon: '',
      order: 0
    }
  }
}
