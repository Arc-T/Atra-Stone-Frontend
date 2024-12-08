import { ChangeEvent } from "react";

export const formatPrice = (event: ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value.replace(/,/g, "");
  if (!isNaN(Number(value))) {
    event.target.value = Number(value).toLocaleString();
  }
};