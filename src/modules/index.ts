import GarageModule from "@moduleGarage/index";
import WinnersModule from "@moduleWinners/index";

import {RouteObject} from "react-router-dom";

const router: RouteObject[] = [
  ...GarageModule.router,
  ...WinnersModule.router,
]

export default {
  router
}