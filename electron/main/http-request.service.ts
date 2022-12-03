import axios from "axios";
import { IpcMainInvokeEvent } from "electron";

export async function handleHttpRequest(event: IpcMainInvokeEvent, url: string, body: string): Promise<string> {
  const response = await axios.post(
    url,
    body,
    { headers: { referer: "https://www.tase.co.il", Accept: 'application/json', 'Accept-Encoding': 'identity' } }
  );
  return response.data;
}

