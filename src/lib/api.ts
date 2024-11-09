const API_URL = 'http://localhost:5000/api';

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
}

export async function register(email: string, password: string, name: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  return response.json();
}

export async function getProducts() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/products`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
}

export async function createProduct(productData: any) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });
  return response.json();
}

export async function getSocialMetrics() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/social/metrics`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
}

export async function createSocialPost(postData: any) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/social/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(postData)
  });
  return response.json();
}