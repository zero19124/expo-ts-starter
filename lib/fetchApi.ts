// api.js
const localUrl = "http://10.147.18.1:8000";
const tesBASE_URLtUrl = "http://104.219.251.173:8000/swagger";
// const BASE_URL = process.env.NODE_ENV === "development" ? localUrl : testUrl;
const BASE_URL = "http://10.147.18.1:8000";
interface ErrorResponse {
  message: string;
}
interface ResponseType {
  code: number;
  data: any;
  message: string;
}
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  // console.log(response, "response");
  return response.json();
};

const fetchApi = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<ResponseType> => {
  const url = `${BASE_URL}${endpoint}`;
  console.log(options, "options");
  try {
    if (options?.method === "POST") {
      options.body = JSON.stringify(options.body);
    }
    const extra = {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    };
    const response = await fetch(url, extra);
    return handleResponse<ResponseType>(response);
  } catch (error) {
    throw new Error("Network error");
  }
};

export default fetchApi;
