import { SecurityData } from "@/store/chart.store";
import moment from "moment";
import { SecurityDataFile } from "./db/security-data.db.service";
import { getSecurityHistory } from "./tase.service";

type SupplementedReturnType = {
    modified: boolean;
    data: SecurityData[]
}

export const supplementSecurityDataFile = async (dataFile: SecurityDataFile, securityNumber: string): Promise<SupplementedReturnType> => {
    const currDate = moment().format('DD/MM/yyyy');
    if (dataFile.created === currDate) {
        return { modified: false, data: dataFile.data };
    }

    const returnValue = [...dataFile.data];

    const dateMap = new Set<string>();
    dataFile.data.forEach((it) => dateMap.add(it.tradeDateStr));

    let areAllNew = true;
    let pageNumber = 1;
    while (areAllNew && pageNumber < 6) {
        const newData = await getSecurityHistory(securityNumber, pageNumber);
        newData.forEach((newDataItem) => {
            if (dateMap.has(newDataItem.tradeDateStr)) {
                areAllNew = false;
            } else {
                dateMap.add(newDataItem.tradeDateStr);
                returnValue.push(newDataItem);
            }
        })
        pageNumber++;
    }

    return {
      modified: true,
      data: returnValue,
    };
}
