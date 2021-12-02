import { DocumentEntity } from "./document.entity";

export interface DocumentRO {
    document: DocumentEntity;
}
  
export interface DocumentsRO {
    documents: DocumentEntity[];
    documentsCount: number;
}