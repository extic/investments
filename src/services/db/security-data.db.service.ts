import { SecurityData } from "@/store/chart.store";
import { readFile, writeFile } from "../file.service";
import { DateTime } from "luxon"

export type SecurityDataFile = {
    created: string;
    securityNumber: string;
    data: SecurityData[]
}

export type SavedSecurityData = Omit<SecurityData, "tradeDate">;

export const readSecurityDataFile = (securityNumber: string): SecurityDataFile => {
    const dataFile = readFile<SecurityDataFile>(`security-data-${securityNumber}`)
    dataFile.data.forEach((it) => {
        it.tradeDate = DateTime.fromFormat(it.tradeDateStr, 'dd/MM/yyyy', {zone: 'UTC'}).toMillis();
    });
    return dataFile;
}

export const saveSecurityDataFile = (securityNumber: string, data: SecurityData[]) => {
    const created = DateTime.now().toFormat('dd/MM/yyyy');
    const dataToSave = [...data].map((it) => {
        let {tradeDate: _, ...rest} = it;
        return rest as SavedSecurityData;
    });
    return writeFile(`security-data-${securityNumber}`, { created, securityNumber, data: dataToSave });
}

