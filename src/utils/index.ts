export async function callApi<T>(url: string, init: object): Promise<T> {
  try {
    const response = await fetch(url, init);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data: T = await response.json();
    return data;

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Fetch error: ${error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}
