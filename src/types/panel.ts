const STORED_COLOR = localStorage.getItem("primary_color");

export const PRIMARY_COLOR = STORED_COLOR !== null ? STORED_COLOR : "success";
