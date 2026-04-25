const API_BASE = "/api/browse";

export async function getBrowseData({
  page = 1,
  pageSize = 100,
  species = "all",
  modification = "all",
  method = "all",
  location = "all",
  keyword = "",
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    species,
    modification,
    method,
    location,
    keyword,
  });
  const res = await fetch(`${API_BASE}/data?${params}`);
  if (!res.ok) throw new Error("Failed to fetch browse data");
  return res.json();
}

export async function getBrowseStats({
  species = "all",
  modification = "all",
  method = "all",
  location = "all",
  keyword = "",
} = {}) {
  const params = new URLSearchParams({
    species,
    modification,
    method,
    location,
    keyword,
  });
  const res = await fetch(`${API_BASE}/stats?${params}`);
  if (!res.ok) throw new Error("Failed to fetch browse stats");
  return res.json();
}

export async function getBrowseFilters() {
  const res = await fetch(`${API_BASE}/filters`);
  if (!res.ok) throw new Error("Failed to fetch browse filters");
  return res.json();
}
