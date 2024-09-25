export const callApi = async (url: string, init: object): Promise<any> => {
  try {
    const res = await fetch(url, init);
    if (res.ok) {
      return res?.json();
    } else {
      return Promise.reject(res)
    }
  } catch(e) {
    console.error(`Failed to get response from endpoint ${url}`);
    return 
  }
};