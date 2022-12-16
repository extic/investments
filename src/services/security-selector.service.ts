import { generateChartPanes } from "@/chart/chart-generator.service";
import router from "@/router";
import { useChartStore } from "@/store/chart.store";
import { SelectedSecurity } from "@/types/types";
import moment from "moment";
import { readSecurityDataFile, saveSecurityDataFile, SecurityDataFile } from "./db/security-data.db.service";
import { supplementSecurityDataFile } from "./security-data-supplementor.service";

export const selectSecurity = async (selectedSecurity: SelectedSecurity): Promise<void> => {
  if (selectedSecurity) {
    router.push("securityChart");

    const fileData = readDataFile(selectedSecurity.number);

    const { modified, data: newData } = await supplementSecurityDataFile(fileData, selectedSecurity.number);
    newData.sort((a, b): number => a.tradeDate.diff(b.tradeDate));
    if (modified) {
        saveSecurityDataFile(selectedSecurity.number, newData);
    }

    const chartStore = useChartStore();
    chartStore.setSecurityData(newData);
    chartStore.setSelectedSecurity(selectedSecurity);

    generateChartPanes(newData);
  }
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
