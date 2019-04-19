import EmberRouter from "@ember/routing/router";
import config from "./config/environment";
import AppRoute from "./enums/app-route";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route(AppRoute.dashboard);
  this.route(AppRoute.users);
  this.route(AppRoute.settings);
  this.route(AppRoute.login);
  this.route(AppRoute.register);
});

export default Router;
