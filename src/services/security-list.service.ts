import { ipcRenderer } from "electron";

export type Security = {
  securityNumber: string;
  shortName: string;
  symbol: string;
}

export type SecurityData = {
  closeRate: number;
  dealsNo: number;
  highRate: number;
  lowRate: number;
  openRate: number;
  tradeDate: string;
}

export const getSecurityList = async () => {
  const body = {
    dType: 1,
    TotalRec: 1,
    pageNum: 1,
    oId: "142",
    lang: "0",
  };
  const response = await ipcRenderer.invoke('http:request', "https://api.tase.co.il/api/index/components", body);
  console.log(response);
  return response.Items.map((it: any) => {
    return {
      securityNumber: it.SecurityNumber,
      shortName: it.ShortName,
      symbol: it.Symbol,
    } as Security;
  })
}

export const getSecurityHistory = async (securityNumber: string) => {
  const body = {
    pType: 1,
    TotalRec: 1,
    pageNum: 1,
    oId: securityNumber,
    lang: "1",
  };
  const response = await ipcRenderer.invoke('http:request', "https://api.tase.co.il/api/security/historyeod", body);
  return response.Items.map((it: any) => {
    return {
      closeRate: it.CloseRate,
      dealsNo: it.DealsNo,
      highRate: it.HighRate,
      lowRate: it.LowRate,
      openRate: it.OpenRate,
      tradeDate: it.TradeDate,
} as SecurityData;
  })
}
