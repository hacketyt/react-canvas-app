// src/api/drawingApi.js
const baseUrl = '/api/drawings';

export async function fetchDrawings() {
  const response = await fetch(baseUrl);
  return await response.json();
}

export async function saveDrawing(drawing) {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(drawing),
  });
  return await response.json();
}
