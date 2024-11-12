import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {

      staleTime: 10 * 60 * 1000, // 10 minutes

      refetchOnWindowFocus: false,

      refetchOnMount: false,

      retry: 2,

      // Automatically retry queries that fail due to network errors
      networkMode: 'online', // Only run queries when the network is online
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
