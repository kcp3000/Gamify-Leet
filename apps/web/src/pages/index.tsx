import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const HomePage = lazy(() =>
  import("./layout").then((m) => ({ default: m.HomePage })),
);

export const Route = createFileRoute("/")({
  component: HomePage,
});
