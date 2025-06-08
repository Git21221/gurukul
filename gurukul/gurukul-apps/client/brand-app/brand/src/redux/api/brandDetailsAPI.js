import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBranding = createAsyncThunk(
  "brandDetails/fetchBranding",
  async (_, thunkAPI) => {
    const brandFolder = window.location.pathname.split("/")[1] || "default";
    const brandingUrl = `/branding.json`;
    const response = await fetch(brandingUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch branding data");
    }
    const data = await response.json();
    return data;
  }
);