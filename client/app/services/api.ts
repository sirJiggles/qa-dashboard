import Service from '@ember/service';
import UserCredentials from 'client/interfaces/user-credentials';
import { inject as service } from '@ember/service';

export default class ApiService extends Service.extend() {
  endPoint = 'http://localhost:3000';

  @service
  session!: any;

  // This can all be cleaned up later to add more complication for now it ok to duplicate
  async register(userData: UserCredentials) {
    try {
      const options = {
        ...this.getDefaultOptions(),
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
        ...this.getDefaultOptions(),
        body: JSON.stringify(userData),
        method: 'POST'
      };
      const response = await fetch(`${this.endPoint}/signin`, options);
      return await this.returnBody(response);
    } catch (err) {
      throw err;
    }
  }

  async getUser() {
    try {
      const response = await fetch(
        `${this.endPoint}/api/user`,
        this.getDefaultOptions()
      );
      return await this.returnBody(response);
    } catch (err) {
      throw err;
    }
  }

  private getDefaultOptions() {
    const bearer = this.session.data.authenticated.token || 'not set';

    return {
      headers: {
        authorization: `Bearer ${bearer}`,
        'Content-Type': 'application/json'
      },
      method: 'GET'
    };
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
