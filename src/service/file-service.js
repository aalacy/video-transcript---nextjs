import { random } from "@/utils/byte-to-size.js";
import http from "./http.js";

export class FileService {
  async resumableUpload(visitorId, fileData, setProgress) {
    const { file, lang, width, height } = fileData;
    const key = random();

    const chunkSize = 2 * 1024 * 1024; // 5MB (adjust based on your requirements)
    const totalChunks = Math.ceil(file.size / chunkSize);
    const chunkProgress = 10 / totalChunks;
    let chunkNumber = 0;
    let start = 0;
    let end = file.size > chunkSize ? chunkSize : file.size;

    let url = `/api/file/upload?visitorId=${visitorId}`;

    const uploadNextChunk = async () => {
      if (chunkNumber < totalChunks) {
        const chunk = file.slice(start, end);
        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("chunkNumber", chunkNumber);
        formData.append("totalChunks", totalChunks);
        formData.append("originalname", file.name);
        formData.append("type", file.type);
        formData.append("lang", lang);
        formData.append("visitorId", visitorId);
        formData.append("width", width);
        formData.append("height", height);
        formData.append("key", key);

        console.log("===============");
        await http.request({
          method: "POST",
          url,
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
          },
          onUploadProgress: (ProgressEvent) =>
            setProgress(Number((chunkNumber + 1) * chunkProgress).toFixed(2)),
        });
        setProgress(Number((chunkNumber + 1) * chunkProgress).toFixed(2));
        chunkNumber++;
        start = end;
        end = start + chunkSize;
        await uploadNextChunk();
      } else {
        setProgress(10);
      }
    };

    await uploadNextChunk();
  }

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

  saveAndDownload(fileId, rawVtt, metadata, visitorId = undefined) {
    return http.post(`/api/file/save-and-download`, {
      fileId,
      rawVtt,
      metadata,
      visitorId,
    });
  }

  generateTranscription(inputData) {
    return http.post("/api/file/generate-transcription", inputData);
  }

  saveProject(fileId, rawVtt, metadata) {
    return http.post("/api/file/save-project", {
      fileId,
      rawVtt,
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
