// src/utils/constants.js

export const BASE_URL =
  import.meta.env.MODE === "production"
    ? "/api"
    : "http://localhost:9000";
