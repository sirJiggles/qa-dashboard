import Service from '@ember/service';
import UserCredentials from 'client/interfaces/user-credentials';

export default class ApiService extends Service.extend() {
  endPoint = 'http://localhost:3000';

  defaultOptions = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  };

  // This can all be cleaned up later to add more complication for now it ok to duplicate
  async register(userData: UserCredentials) {
    try {
      const options = {
        ...this.defaultOptions,
        body: JSON.stringify(userData),
        method: 'POST'
      };
      const response = await fetch(`${this.endPoint}/signup`, options);
      return await this.returnBody(response);
    } catch (err) {
      throw err;
    }
  }

  async login(userData: UserCredentials) {
    try {
      const options = {
        ...this.defaultOptions,
        body: JSON.stringify(userData),
        method: 'POST'
      };
      const response = await fetch(`${this.endPoint}/signin`, options);
      return await this.returnBody(response);
    } catch (err) {
      throw err;
    }
  }

  async testAccess() {
    try {
      const response = await fetch(`${this.endPoint}/test`);
      return await this.returnBody(response);
    } catch (err) {
      throw err;
    }
  }

  // Used to format the body a little so we can throw nice errors
  private async returnBody(response: Response) {
    const result = await response;
    const text = await result.text();
    const body = JSON.parse(text);
    if (result.ok) {
      return body;
    } else {
      throw body;
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    api: ApiService;
  }
}
