import LazyImportComponent from "../components/lazyImportComponent";
import { lazy } from "react";

const routes = [
  {
    path: "/login",
    element: (
      <LazyImportComponent lazyChildren={lazy(() => import("../page/login"))} />
    ),
  },
  {
    path: "/",
    element: (
      <LazyImportComponent lazyChildren={lazy(() => import("../page/home"))} />
    ),
  },
];

export default routes;
