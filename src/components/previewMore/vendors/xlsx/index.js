import ExcelJS from "exceljs";
import {createApp} from "vue";
import Table from "./Table.vue";
import "handsontable/dist/handsontable.full.min.css";

/**
 * 渲染excel
 */
export default async function render(buffer, target) {
    const workbook = await new ExcelJS.Workbook().xlsx.load(buffer);
    return createApp(Table, {
        workbook: workbook
    }).mount(target);
}
