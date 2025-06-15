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
    // Determine environment
    const env = import.meta.env.VITE_ENVIRONMENT;
    console.log('Environment:', env);

    // Set base URL
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

    // Detect if request body is FormData
    const isFormData = options?.body instanceof FormData;
    console.log('Is FormData:', isFormData);
    const response = await fetch(fullUrl, {
      method,
      credentials: 'include',
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();

    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error in apiClient:', error.message);
    throw error;
  }
};
