import http from "./http.js";

export class FaqService {
  all() {
    return http.get(`/api/faq`);
  }
}
