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

  download(processId) {
    return http.get(`/api/file/download?processId=${processId}`);
  }

  generate(inputData) {
    let url = "/api/file/generate";
    return http.post(url, inputData);
  }

  all(paginationModel) {
    return http.get(
      `/api/file?page=${paginationModel.page + 1}&take=${
        paginationModel.pageSize
      }`,
    );
  }

  updateVTT(id, vtt) {
    return http.patch(`/api/file/${id}`, { vtt });
  }
}
