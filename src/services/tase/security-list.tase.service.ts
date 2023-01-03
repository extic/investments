import { Security } from "@/types/types";
import { ipcRenderer } from "electron";

export const getSecurityList = async (): Promise<Security[]> => {
  const list: Security[] = [];

  let pageNumber = 1;
  let done = false;
  while (!done) {
    console.log(`Getting page ${pageNumber} (records: ${list.length})`);
    const { data, total } = await getPage(pageNumber);
    list.push(...data);
    done = list.length >= total;
    pageNumber++;
  }
  console.log("Done getting security list");

  return list;
}

const getPage = async (pageNumber: number): Promise<{ data: Security[], total: number }> => {
  const body = { dType: 1, TotalRec: 1, pageNum: pageNumber, cl1: "0", lang: "0" };

  const response = await ipcRenderer.invoke("http:request", "post", "https://api.tase.co.il/api/security/securitiesinfo", body);
  const data = response.Items.map((it: any) => {
    return {
      id: it.Id,
      name: it.NameHeb,
      type: it.SubTypeHeb,
      indices: (it.IndicesListHeb ?? []).map((index: any) => index.Name),
    } as Security;
  });
  return { data, total: response.TotalRec };
};
