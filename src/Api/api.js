const PORT = 3333;
const URL = "http://localhost";
import { jwtDecode } from "jwt-decode";

export function GET_ALL(tableName) {
  return {
    url: `${URL}:${PORT}/${tableName}`,
    options: {
      method: "GET",
      Headers: {
        Accept: "application/json",
      },
    },
  };
}

export function GET_ALL_USERS(tableName,token) {
  return {
    url: `${URL}:${PORT}/${tableName}`,
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token} `
      }
    },
  };
}


export function GET_TO_ID(tableName, id) {
  return {
    url: `${URL}:${PORT}/${tableName}/${id}`,
    options: {
      method: "GET",
      Headers: {
        Accept: "application/json",
      },
    },
  };
}

export function POST_DATA_USER(tableName, data) {
  return {
    url: `${URL}:${PORT}/${tableName}/auth/register`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  };
}

export function POST_LOGIN(tableName, data) {
  return {
    url: `${URL}:${PORT}/${tableName}/auth/login`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  };
}

export function GET_AUTH_USER(tableName, token,id) {
  return {
    url: `${URL}:${PORT}/${tableName}/${id}`,
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token} `
      }
    },
  };
}

export function POST_DATA(tableName, data) {
  return {
    url: `${URL}:${PORT}/${tableName}`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  };
}

export function UPDATE_DATA(tableName, updateData, id,token) {

  return {
    url: `${URL}:${PORT}/${tableName}/${id}`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `
      },
      body: JSON.stringify(updateData),
    },
  };
}

export function DELETE_DATA(tableName, id) {
  return {
    url: `${URL}:${PORT}/${tableName}/${id}`,
    options: {
      method: "DELETE",
    },
  };
}
