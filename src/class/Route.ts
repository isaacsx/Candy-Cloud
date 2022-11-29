export class Route {
  constructor(routeOptions: RouteType) {
    Object.assign(this, routeOptions);
  }
}

export type RouteType = {
  path: string;
  method: "get" | "post" | "put" | "delete";
};
