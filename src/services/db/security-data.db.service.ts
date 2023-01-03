import { LineDrawingData } from "@/chart/drawings/line.drawing";
import { Quote } from "@/store/chart.store";
import { useSecurityListStore } from "@/store/security-list.store";
import { DateTime } from "luxon";
import { createFolder, isFolderExists, readFile, writeFile } from "../file.service";

export type MetaDataFile = {
  lastUpdated: string;
  securityId: string;
  securityName: string;
}

export type QuoteDataFile = {
  lastUpdated: string;
  quotes: Quote[];
}

export type DrawingDataFile = {
  lastUpdated: string;
  drawings: DrawingData[];
}

export type DrawingData = {
  type: string;
  chartName: string;
  data: LineDrawingData
}

export const readMetaDataFile = (securityId: string): MetaDataFile => {
  return readFile<MetaDataFile>(`${getSecurityFolder(securityId)}/meta`)
}

export const readQuotesDataFile = (securityId: string): QuoteDataFile => {
    return readFile<QuoteDataFile>(`${getSecurityFolder(securityId)}/quotes`)
}

export const readDrawingDataFile = (securityId: string): DrawingDataFile => {
  return readFile<DrawingDataFile>(`${getSecurityFolder(securityId)}/drawings`)
}

export const saveMetaDataFile = (securityId: string, securityName: string, lastUpdated?: string) => {
  const content =  {
    lastUpdated: lastUpdated ?? DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'),
    securityId,
    securityName,
  }
  writeFile<MetaDataFile>(`${getSecurityFolder(securityId)}/meta`, content);
}

export const saveQuotesDataFile = (securityId: string, quotes: Quote[], lastUpdated?: string) => {
  const content = {
    lastUpdated: lastUpdated ?? DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'),
    quotes,
  };
  writeFile<QuoteDataFile>(`${getSecurityFolder(securityId)}/quotes`, content);
}

export const saveDrawingsDataFile = (securityId: string, drawings: DrawingData[], lastUpdated?: string) => {
  const content = {
    lastUpdated: lastUpdated ?? DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'),
    drawings,
  };
  writeFile<DrawingDataFile>(`${getSecurityFolder(securityId)}/drawings`, content);
}

export const assureSecurityFolderExists = (securityId: string): void => {
  if (isFolderExists(getSecurityFolder(securityId))) {
    return;
  }

  createFolder(getSecurityFolder(securityId));

  const store = useSecurityListStore();
  const security = store.list.find((it) => it.id === securityId)!!;

  saveMetaDataFile(securityId, security.name, 'never');
  saveQuotesDataFile(securityId, [], 'never');
  saveDrawingsDataFile(securityId, [], 'never');
}

const getSecurityFolder = (securityId: string): string => {
  return `securities/${securityId}`;
}
