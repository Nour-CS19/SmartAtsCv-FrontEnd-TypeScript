const API_BASE_URL = import.meta.env.VITE_API_URL || "https://smartcvats.runasp.net";

export interface AuthResponse {
  token?: string;
  user?: {
    id?: string;
    email?: string;
    fullName?: string;
  };
  message?: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName?: string;
  targetRole?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// ================= AUTH API =================

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Invalid credentials");
  }

  const data = await response.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", payload.email);
  }
  return data;
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/Auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Registration failed");
  }

  const data = await response.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", payload.email);
  }
  return data;
}

// ================= CV API =================

export async function getAllCVs() {
  const response = await fetch(`${API_BASE_URL}/api/Cv`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch CVs");
  }

  return response.json();
}

export async function getCVById(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/Cv/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch CV with ID ${id}`);
  }

  return response.json();
}

export async function createCV(cvData: any) {
  const response = await fetch(`${API_BASE_URL}/api/Cv`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(cvData),
  });

  if (!response.ok) {
    throw new Error("Failed to create CV");
  }

  return response.json();
}

export async function updateCV(id: string, cvData: any) {
  const response = await fetch(`${API_BASE_URL}/api/Cv/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(cvData),
  });

  if (!response.ok) {
    throw new Error("Failed to update CV");
  }

  return response.json();
}

export async function deleteCV(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/Cv/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete CV");
  }

  return true;
}

export async function downloadCVPdf(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/Cv/${id}/pdf`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to download PDF from server");
  }

  return response.blob();
}
