import Service from '@ember/service';

export default class ApiService extends Service.extend() {
  endPoint = 'http://localhost:3000/api';

  // This can all be cleaned up later to add more complication for now it ok to duplicate
  async register(userData: FormData) {
    try {
      const resp = await fetch(`${this.endPoint}/user`, {
        body: userData,
        method: 'put'
      });
      return resp;
    } catch (err) {
      throw err;
    }
  }

  async login(userData: FormData) {
    try {
      const resp = await fetch(`${this.endPoint}/user`, {
        body: userData,
        method: 'get'
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
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    api: ApiService;
  }
}
