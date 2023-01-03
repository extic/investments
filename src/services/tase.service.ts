import { ipcRenderer } from "electron";
import { SecurityInfo } from "@/store/portfolio.store";
import { DateTime } from "luxon";
import { Quote } from "@/store/chart.store";

export const getSecurityHistory = async (securityId: string, pageNumber: number): Promise<Quote[]> => {
  const body = {
    pType: 7,
    TotalRec: 1,
    pageNum: pageNumber,
    oId: securityId,
    lang: "1",
  };
  const response = await ipcRenderer.invoke("http:request", "post", "https://api.tase.co.il/api/security/historyeod", body);
  return response.Items.map((it: any) => {
    return {
      closeRate: it.CloseRate,
      dealsNo: it.DealsNo,
      highRate: it.HighRate,
      lowRate: it.LowRate,
      openRate: it.OpenRate,
      tradeDate: it.TradeDate,
      tradeDateMillis: DateTime.fromFormat(it.TradeDate, 'dd/MM/yyyy').toUTC().toMillis(),
      volume: it.OverallTurnOverUnits,
    } as Quote;
  });
};

export const getSecurityInfo = async (id: string): Promise<SecurityInfo> => {
  const url = `https://api.tase.co.il/api/company/securitydata?securityId=${id}&lang=0`;
  const response = await ipcRenderer.invoke("http:request", "get", url);
  return {
    number: parseInt(response.Id, 10).toString(),
    lastRate: response.LastRate,
    baseRate: response.BaseRate,
  } as SecurityInfo;
};
