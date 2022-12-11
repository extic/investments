import { generateChartPanes } from "@/chart/chart-generator.service";
import { useChartStore } from "@/store/chart.store";
import moment from "moment";
import { readSecurityDataFile, saveSecurityDataFile, SecurityDataFile } from "./db/security-data.db.service";
import { supplementSecurityDataFile } from "./security-data-supplementor.service";

export const selectSecurity = async (securityNumber: string): Promise<void> => {
    const fileData = readDataFile(securityNumber);

    const { modified, data: newData } = await supplementSecurityDataFile(fileData, securityNumber);
    newData.sort((a, b): number => a.tradeDate.diff(b.tradeDate));
    if (modified) {
        saveSecurityDataFile(securityNumber, newData);
    }

    const chartStore = useChartStore();
    chartStore.setSecurityData(newData);

    generateChartPanes(newData);
}

function readDataFile(securityNumber: string): SecurityDataFile {
    try {
        return readSecurityDataFile(securityNumber);
    } catch (err) {
        return {
            created: "",
            securityNumber,
            data: [],
        }
    }
}
