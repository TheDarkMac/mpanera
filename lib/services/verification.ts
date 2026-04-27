import { api } from "@/lib/api";
import type {
  UploadVerificationDocumentBody,
  VerificationDocumentResponse,
} from "@/types/api";

export const verificationService = {
  list: () => api.get<VerificationDocumentResponse[]>("/verification/documents"),
  upload: (body: UploadVerificationDocumentBody) => {
    const fd = new FormData();
    fd.append("type", body.type);
    fd.append("file", body.file);
    return api.upload<VerificationDocumentResponse>("/verification/documents", fd);
  },
};
