import {Component, Input} from '@angular/core';
import {StudyDocumentDTO} from "../../api/study-documents.api";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-documents-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './documents-table.component.html',
  styleUrl: './documents-table.component.scss'
})
export class DocumentsTableComponent {

  @Input({required: true}) documents: StudyDocumentDTO[] = [];
}
