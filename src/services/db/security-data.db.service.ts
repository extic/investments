import { SecurityData } from "@/store/chart.store";
import moment from "moment";
import { readFile, writeFile } from "../file.service";

export type SecurityDataFile = {
    created: string;
    securityNumber: string;
    data: SecurityData[]
}

export type SavedSecurityData = Omit<SecurityData, "tradeDate">;

export const readSecurityDataFile = (securityNumber: string): SecurityDataFile => {
    const dataFile = readFile<SecurityDataFile>(`security-data-${securityNumber}`)
    dataFile.data.forEach((it) => {
        it.tradeDate = moment(it.tradeDateStr, 'DD/MM/YYYY');
    });
    return dataFile;
}

export const saveSecurityDataFile = (securityNumber: string, data: SecurityData[]) => {
    const created = moment().format('DD/MM/yyyy');
    const dataToSave = [...data].map((it) => {
        let {tradeDate: _, ...rest} = it;
        return rest as SavedSecurityData;
    });
    return writeFile(`security-data-${securityNumber}`, { created, securityNumber, data: dataToSave });
}

