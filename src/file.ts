const fs = require('fs');
const ExcelJS = require('exceljs');

class FileExporter{
    getName(){
        return 'scrap_'+(new Date()).getTime();
    }
    toJson(boxes: any[]){
        fs.appendFile(this.getName()+'.json', JSON.stringify(boxes), (e) =>  {
            if (e) throw e;
        });
    }
    async toExcel(boxes: any[]){
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'MC';
        workbook.created = new Date();
        workbook.views = [
            {
                x: 0, y: 0, width: 4, height: boxes.length + 1,
                firstSheet: 0, activeTab: 1, visibility: 'visible',
            }
        ];
        const sheet = workbook.addWorksheet('Scrapper');
        sheet.columns = [
            { header: 'Author', key: 'author', width: 30 },
            { header: 'Date', key: 'date', width: 10 },
            { header: 'Title', key: 'title', width: 100 },
            { header: 'Link', key: 'link', width: 200 },
        ];
        boxes.forEach(b=>{
            sheet.addRow(b);
        });
        await workbook.xlsx.writeFile(this.getName()+'.xlsx');
    }
}
const fileExporter = new FileExporter;

module.exports = fileExporter;