class Request {
  static API_URL = `https://conduit.productionready.io/api/`;

  async getData(url, options = null) {
    // try {
    //   const res = await fetch(url, options);

    //   if (!res.ok) {
    //     throw new Error(`Failed to fetch ${url}. Response ${res.status}`);
    //   }

    //   const body = await res.json();

    //   return body;
    // } catch (error) {
    //   throw new Error(error);
    // }
    const res = await fetch(url, options);
    const body = await res.json();
    return body;
  }

  async getArticles(currentPage) {
    const res = await this.getData(`${Request.API_URL}articles?offset=${currentPage}&limit=10`);

    return res;
  }

  async getSingleArticle(slug) {
    const res = await this.getData(`${Request.API_URL}articles/${slug}`);

    return res;
  }

  async isUserNameFree(username) {
    try {
      const res = await this.getData(`${Request.API_URL}profiles/${username}`);

      if (res.profile) return false;
    } catch (error) {
      if (error.name === 'Error') return true;
    }
    return true;
  }

  async registerUser(data) {
    const { name: username, email, password } = data;

    const regUserData = {
      user: {
        username,
        email,
        password,
      },
    };

    const regUserOptions = {
      method: 'POST',
      headers: {
        'Content-Type': `application/json;charset=utf-8`,
      },
      body: JSON.stringify(regUserData),
    };

    const res = await this.getData(`${Request.API_URL}users`, regUserOptions);

    return res;
  }

  async userAuth(data) {
    const { email, password } = data;

    const userData = {
      user: {
        email,
        password,
      },
    };

    const authOptions = {
      method: 'POST',
      headers: {
        'Content-Type': `application/json;charset=utf-8`,
      },
      body: JSON.stringify(userData),
    };

    const res = await this.getData(`${Request.API_URL}users/login`, authOptions);

    return res;
  }

  async getCurrentUser(token) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    };

    const res = await this.getData(`${Request.API_URL}user`, options);

    return res;
  }

  async editUser(data, token) {
    const { email, password, name, avatar } = data;

    const userData = {
      user: {
        email,
        password,
        username: name,
        image: avatar,
      },
    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(userData),
    };

    const res = await this.getData(`${Request.API_URL}user`, options);

    return res;
  }

  async createArticle(data, token) {
    const { title, description, text: body, tag: tagList } = data;

    const articleData = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(articleData),
    };

    const res = await this.getData(`${Request.API_URL}articles`, options);

    return res;
  }

  async deleteArticle(slug, token) {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    };

    await this.getData(`${Request.API_URL}articles/${slug}`, options);

    return 'Deleted';
  }
}

const request = new Request();

export default request;
