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

  download(id) {
    return http.get(`/api/file/download?id=${id}`);
  }

  generateTranscription(inputData) {
    return http.post("/api/file/generate-transcription", inputData);
  }

  generateVideo(id, vtt, metadata) {
    return http.post("/api/file/generate-video", {
      id,
      vtt,
      metadata,
    });
  }

  all(paginationModel) {
    return http.get(
      `/api/file?page=${paginationModel.page + 1}&take=${
        paginationModel.pageSize
      }`,
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
