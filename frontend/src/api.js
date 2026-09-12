const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";
let token = localStorage.getItem("reto_token");
export const setToken = (value) => { token = value; if (value) localStorage.setItem("reto_token", value); else localStorage.removeItem("reto_token"); };
const request = async (path, options = {}) => { const headers = new Headers(options.headers); if (token) headers.set("Authorization", `Bearer ${token}`); const response = await fetch(`${API_URL}${path}`, { ...options, headers }); if (!response.ok) { const body = await response.json().catch(() => ({})); throw new Error(body.detail || "The request could not be completed."); } return response; };
export const checkBackend = () => request("/health").then((r) => r.json());
export async function login(username, password) { const body = new URLSearchParams({ username, password }); const data = await request("/auth/login", { method: "POST", body }).then((r) => r.json()); setToken(data.access_token); return me(); }
export async function register(payload) { await request("/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); return login(payload.username, payload.password); }
export const me = () => request("/auth/me").then((r) => r.json());
export const createPatient = (payload) => request("/patients", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then((r) => r.json());
export const listPatients = () => request("/patients").then((r) => r.json());
export const patientScans = (id) => request(`/patients/${id}/scans`).then((r) => r.json());
export const uploadScan = (file, patientId, patientName) => { const form = new FormData(); form.append("file", file); form.append("patient_id", patientId); form.append("patient_name", patientName); return request("/scans", { method: "POST", body: form }).then((r) => r.json()); };
export const facilities = () => request("/facilities").then((r) => r.json());
export const createReferral = (scanId, payload) => request(`/scans/${scanId}/referral`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then((r) => r.json());
export const downloadUrl = (path) => `${API_URL}${path}`;
