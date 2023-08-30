import axios from "axios";

export class APIClient {
    constructor() {
        this.apiClient = this.getApiClient(this.config);
    }

    getApiClient(config) {
        const initialConfig = {
          baseURL: process.env.NEXT_PUBLIC_API_URL,
        };
        const client = axios.create(initialConfig);
        return client;
    }

    upload(fileData) {
        const formData = new FormData();
        let url = '/upload';
        for (let key in fileData) {
          formData.append(key, fileData[key])
        }
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        return  this.apiClient.post(url, formData, config)
    }

    download(processId) {
      return this.apiClient.get(`/download?processId=${processId}`)
    }
}