import { LineDrawingData } from "@/chart/drawings/line.drawing";
import { Quote } from "@/store/chart.store";
import { useSecurityListStore } from "@/store/security-list.store";
import { DateTime } from "luxon";
import { createFolder, isFolderExists, readFile, writeFile } from "../file.service";

export type MetaDataFile = {
  lastUpdated: string;
  securityNumber: string;
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

export const readMetaDataFile = (securityNumber: string): MetaDataFile => {
  return readFile<MetaDataFile>(`${getSecurityFolder(securityNumber)}/meta`)
}

export const readQuotesDataFile = (securityNumber: string): QuoteDataFile => {
    return readFile<QuoteDataFile>(`${getSecurityFolder(securityNumber)}/quotes`)
}

export const readDrawingDataFile = (securityNumber: string): DrawingDataFile => {
  return readFile<DrawingDataFile>(`${getSecurityFolder(securityNumber)}/drawings`)
}

export const saveMetaDataFile = (securityNumber: string, securityName: string, lastUpdated?: string) => {
  const content =  {
    lastUpdated: lastUpdated ?? DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'),
    securityNumber,
    securityName,
  }
  writeFile<MetaDataFile>(`${getSecurityFolder(securityNumber)}/meta`, content);
}

export const saveQuotesDataFile = (securityNumber: string, quotes: Quote[], lastUpdated?: string) => {
  const content = {
    lastUpdated: lastUpdated ?? DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'),
    quotes,
  };
  writeFile<QuoteDataFile>(`${getSecurityFolder(securityNumber)}/quotes`, content);
}

export const saveDrawingsDataFile = (securityNumber: string, drawings: DrawingData[], lastUpdated?: string) => {
  const content = {
    lastUpdated: lastUpdated ?? DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'),
    drawings,
  };
  writeFile<DrawingDataFile>(`${getSecurityFolder(securityNumber)}/drawings`, content);
}

export const assureSecurityFolderExists = (securityNumber: string): void => {
  if (isFolderExists(getSecurityFolder(securityNumber))) {
    return;
  }

  createFolder(getSecurityFolder(securityNumber));

  const store = useSecurityListStore();
  const security = store.list.find((it) => it.number === securityNumber)!!;
  lastUpdated: DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'),

  saveMetaDataFile(securityNumber, security.name, 'never');
  saveQuotesDataFile(securityNumber, [], 'never');
  saveDrawingsDataFile(securityNumber, [], 'never');
}

const getSecurityFolder = (securityNumber: string): string => {
  return `securities/${securityNumber}`;
}
