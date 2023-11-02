import http from "./http.js";

export class FileService {
  upload(fileData) {
    const formData = new FormData();
    let url = "/api/file/upload";
    for (let key in fileData) {
      formData.append(key, fileData[key]);
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return http.post(url, formData, config);
  }

  download({ visitorId }) {
    return http.post(`/api/file/download`, { visitorId });
  }

  saveAndDownload(fileId, vtt, metadata) {
    return http.post(`/api/file/save-and-download`, { fileId, vtt, metadata });
  }

  generateTranscription(inputData) {
    return http.post("/api/file/generate-transcription", inputData);
  }

  saveProject(fileId, vtt, metadata) {
    return http.post("/api/file/save-project", {
      fileId,
      vtt,
      metadata,
    });
  }

  all(paginationModel, filterModel) {
    const query = filterModel.quickFilterValues.join(" ");
    return http.get(
      `/api/file?page=${paginationModel.page + 1}&take=${
        paginationModel.pageSize
      }&query=${query}`,
    );
  }

  get(id) {
    return http.get(`/api/file/${id}`);
  }

  delete(id) {
    return http.delete(`/api/file/${id}`);
  }

  updateVTT(id, vtt) {
    return http.patch(`/api/file/${id}`, { vtt });
  }
}
