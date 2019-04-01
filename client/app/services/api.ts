import Service from '@ember/service';
import UserCredentials from 'client/interfaces/user-credentials';

export default class ApiService extends Service.extend() {
  endPoint = 'http://localhost:3000';
  headers = {
    'Content-Type': 'application/json'
  };

  // This can all be cleaned up later to add more complication for now it ok to duplicate
  async register(userData: UserCredentials) {
    try {
      const resp = await fetch(`${this.endPoint}/signup`, {
        body: this.wrapBody(userData),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
      return resp;
    } catch (err) {
      throw err;
    }
  }

  async login(userData: UserCredentials) {
    try {
      const resp = await fetch(`${this.endPoint}/signin`, {
        body: JSON.stringify(userData),
        headers: this.headers,
        method: 'POST'
      });
      return resp;
    } catch (err) {
      throw err;
    }
  }

  async testAccess() {
    try {
      const resp = await fetch(`${this.endPoint}/test`);
      return resp;
    } catch (err) {
      throw err;
    }
  }

  private wrapBody(obj: any): string {
    return JSON.stringify(obj);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    api: ApiService;
  }
}
