import axios, { AxiosRequestConfig } from "axios";
import { IpcMainInvokeEvent } from "electron";

export async function handleHttpRequest(event: IpcMainInvokeEvent, method: string, url: string, body?: string): Promise<string> {
  const requestConfig: AxiosRequestConfig = {
    method,
    url,
    headers: { referer: "https://www.tase.co.il", Accept: "application/json", "Accept-Encoding": "identity" },
  };
  if (body) {
    requestConfig.data = body;
  }

  const response = await axios.request(requestConfig);
  return response.data;
}
