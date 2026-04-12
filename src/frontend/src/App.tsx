import { router } from "@/routes/index";
import { RouterProvider } from "@tanstack/react-router";

export default function App() {
  return <RouterProvider router={router} />;
}
