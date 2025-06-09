export const apiClient = async (
  dispatch,
  url,
  method,
  options = {},
  source
) => {
  console.log(
    `apiClient called with url: ${url}, method: ${method}, options:`,
    options,
    `source: ${source}`
  );

  try {
    // Show loader
    const env = import.meta.env.VITE_ENVIRONMENT;
    console.log(import.meta.env);

    let base_url = '';

    if (env === 'development') {
      const port =
        source === 'main'
          ? import.meta.env.VITE_MAIN_SERVER_PORT
          : import.meta.env.VITE_BRAND_SERVER_PORT;
      base_url = `http://localhost:${port}`;
    } else {
      base_url =
        source === 'main'
          ? import.meta.env.VITE_MAIN_BASE_API_PROD_URL
          : import.meta.env.VITE_BRAND_BASE_API_PROD_URL;
    }

    const fullUrl = `${base_url}/api/v1/${source}/${url}`;

    const resposne = await fetch(fullUrl, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data = await resposne.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    // console.log(`Error in apiClient: ${error.message}`);
  }
  // finally {
  //   //hide loader
  // }
};
