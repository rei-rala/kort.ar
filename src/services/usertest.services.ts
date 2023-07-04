export async function getUserTest() {
  const apiBaseUrl = "http://localhost:3000/api";
  const url = `${apiBaseUrl}/auth`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return data.profile;
  } catch (err) {
    return null;
  }
}
