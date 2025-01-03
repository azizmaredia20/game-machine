export async function callApi<T>(url: string, init?: object): Promise<T> {
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

export const formatDate = (date: Date | null, locale: string = "en-US") : string => new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(date);

export const getPastDate = (date: Date = new Date(), noOfDays: number) => {
  const past2DayMill =  (new Date(date)).getTime() - (noOfDays * 24 * 60 * 60 * 1000);
  return new Date(past2DayMill)
}