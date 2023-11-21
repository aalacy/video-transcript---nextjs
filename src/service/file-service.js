import http from "./http.js";

export class FileService {
  upload(visitorId, fileData, setProgress) {
    const formData = new FormData();
    let url = `/api/file/upload?visitorId=${visitorId}`;
    for (let key in fileData) {
      formData.append(key, fileData[key]);
    }

    return http.request({
      method: "POST",
      url,
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
      onUploadProgress: (ProgressEvent) =>
        setProgress(
          parseFloat((ProgressEvent.loaded / ProgressEvent.total) * 10).toFixed(
            2,
          ),
        ),
    });
  }

  download({ visitorId }) {
    return http.post(`/api/file/download`, { visitorId });
  }

  saveAndDownload(fileId, vtt, metadata, visitorId = undefined) {
    return http.post(`/api/file/save-and-download`, {
      fileId,
      vtt,
      metadata,
      visitorId,
    });
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

  get(id, visitorId) {
    return http.post(`/api/file/get`, { id, visitorId });
  }

  delete(id) {
    return http.delete(`/api/file/${id}`);
  }

  updateVTT(id, vtt) {
    return http.patch(`/api/file/${id}`, { vtt });
  }
}
