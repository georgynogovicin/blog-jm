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

  async getArticles(currentPage) {
    const res = await this.getData(`${Request.API_URL}articles?offset=${currentPage}&limit=10`);

    return res;
  }

  async getSingleArticle(slug) {
    const res = await this.getData(`${Request.API_URL}articles/${slug}`);

    return res;
  }
}

const request = new Request();

export default request;
