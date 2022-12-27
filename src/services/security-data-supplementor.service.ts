import { Quote } from "@/store/chart.store";
import { DateTime } from "luxon";
import { QuoteDataFile } from "./db/security-data.db.service";
import { getSecurityHistory } from "./tase.service";

type SupplementedReturnType = {
    modified: boolean;
    quotes: Quote[]
}

export const supplementSecurityDataFile = async (dataFile: QuoteDataFile, securityNumber: string): Promise<SupplementedReturnType> => {
    const currDate = DateTime.now().toFormat('dd/MM/yyyy');
    const lastUpdated = dataFile.lastUpdated === 'never' ? 'never' : DateTime.fromFormat(dataFile.lastUpdated, 'dd/MM/yyyy HH:mm:ss').toFormat('dd/MM/yyyy')
    if (lastUpdated === currDate) {
        return { modified: false, quotes: dataFile.quotes };
    }

    const returnValue = [...dataFile.quotes];

    const dateMap = new Set<string>();
    dataFile.quotes.forEach((it) => dateMap.add(it.tradeDate));

    let areAllNew = true;
    let pageNumber = 1;
    while (areAllNew && pageNumber < 6) {
        const newData = await getSecurityHistory(securityNumber, pageNumber);
        newData.forEach((newDataItem) => {
            if (dateMap.has(newDataItem.tradeDate)) {
                areAllNew = false;
            } else {
                dateMap.add(newDataItem.tradeDate);
                returnValue.push(newDataItem);
            }
        })
        pageNumber++;
    }

    return {
      modified: true,
      quotes: returnValue,
    };
}
