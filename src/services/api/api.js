class Request {
  static API_URL = `https://conduit.productionready.io/api/`;

  async getData(url) {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch ${url}. Response ${res.status}`);
      }

      const body = await res.json();

      return body;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getArticles() {
    const res = await this.getData(`${Request.API_URL}articles`);

    return res;
  }
}

const request = new Request();

export default request;