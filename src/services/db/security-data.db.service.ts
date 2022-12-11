import { SecurityData } from "@/store/chart.store";
import moment from "moment";
import { readFile, writeFile } from "../file.service";

export type SecurityDataFile = {
    created: string;
    securityNumber: string;
    data: SecurityData[]
}

export const readSecurityDataFile = (securityNumber: string): SecurityDataFile => {
    return readFile<SecurityDataFile>(`security-data-${securityNumber}`);
}

export const saveSecurityDataFile = (securityNumber: string, data: SecurityData[]) => {
    const created = moment(new Date).format('DD/MM/yyyy');
    return writeFile(`security-data-${securityNumber}`, { created, securityNumber, data });
}

