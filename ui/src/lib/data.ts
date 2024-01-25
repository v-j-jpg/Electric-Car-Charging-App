import Axios from "axios";
const PORT = 3001;
const API_SERVER_URL_BASE = `http://localhost:${PORT}/api/`;

export async function getChargers() {
  try {
    return Axios.get(`${API_SERVER_URL_BASE}/chargers`).then((res) => { return (res.data) });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredChargers(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    return Axios.post(`${API_SERVER_URL_BASE}/chargers/search`, { query, offset, ITEMS_PER_PAGE }).then((res) => { return (res.data) });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch chargers.');
  }
}
//Returns total number of pages for the given fillter
export async function fetchChargersPages(query: string) {
  try {
    const count = await Axios.post(`${API_SERVER_URL_BASE}/chargers/count`, { query }).then((res) => { return (res.data) })
    const total = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return total;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of chargers.');
  }
}
export async function getChargersById(id: Number) {
  try {
    return await Axios.get(`${API_SERVER_URL_BASE}/chargers/${id}`).then((res) => { return (res.data) });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
}

export async function getUsers() {
  try {
    return await Axios.get(`${API_SERVER_URL_BASE}/users`).then((res) => { return (res.data) });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
}
export async function getUserById(id: Number) {
  try {
    return await Axios.get(`${API_SERVER_URL_BASE}/users/${id}`).then((res) => { return (res.data) });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
}

export async function getUserByEmail(email: any) {
  try {
    return await Axios.post(`${API_SERVER_URL_BASE}/users/email`, { email }).then((res) => {
      return (res.data);
    });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}