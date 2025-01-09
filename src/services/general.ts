import { API_ENDPOINT, SERVER_URL } from "../types/url";

export const generateUrl = (
  template: string,
  params: Record<string, string | number>,
  type?: "PAGE" | "API"
): string => {
  
  const baseUrl = type === "API" || null ? API_ENDPOINT : SERVER_URL;

  return (
    baseUrl +
    template.replace(/{(\w+)}/g, (_, key) => {
      if (key in params) {
        return String(params[key]);
      }
      throw new Error(`Missing parameter: ${key}`);
    })
  );
};
