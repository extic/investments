import { ipcRenderer } from "electron";
import { SecurityData } from "@/store/chart.store";
import moment from "moment";
import { SecurityListItem } from "@/store/security-list.store";

export const getSecurityList = async (): Promise<SecurityListItem[]> => {
  const body = {
    dType: 1,
    TotalRec: 1,
    pageNum: 1,
    oId: "142",
    lang: "0",
  };
  const response = await ipcRenderer.invoke("http:request", "https://api.tase.co.il/api/index/components", body);
  // console.log(response);
  return response.Items.map((it: any) => {
    return {
      number: it.SecurityNumber,
      name: it.ShortName,
    } as SecurityListItem;
  });
};

export const getSecurityHistory = async (securityNumber: string, pageNumber: number): Promise<SecurityData[]> => {
  const body = {
    pType: 7,
    TotalRec: 1,
    pageNum: pageNumber,
    oId: securityNumber,
    lang: "1",
  };
  const response = await ipcRenderer.invoke("http:request", "https://api.tase.co.il/api/security/historyeod", body);
  return response.Items.map((it: any) => {
    return {
      closeRate: it.CloseRate,
      dealsNo: it.DealsNo,
      highRate: it.HighRate,
      lowRate: it.LowRate,
      openRate: it.OpenRate,
      tradeDate: moment(it.TradeDate, 'DD/MM/YYYY'),
      tradeDateStr: it.TradeDate,
      volume: it.OverallTurnOverUnits,
    } as SecurityData;
  });
};
