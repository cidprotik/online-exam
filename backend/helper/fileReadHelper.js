import xlsx from 'xlsx';
import { parse } from 'csv-parse';
import fs from 'fs';  // Use fs.promises for async file operations

export const csvRead = async (req, res) => {
    console.log(req.file)
    try {
        if (!req.file) {
            return { err: 1, errMsg: "No file uploaded." };
        }

        const fileData = [];
        const fileType = req.file.originalname.split('.').pop().toLowerCase();

        if (fileType === 'xlsx' || fileType === 'xls') {
            const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            fileData.push(xlsx.utils.sheet_to_json(sheet));
            return { fileData, err: 0, errMsg: "" };
        } else if (fileType === 'csv') {
            const csvString = req.file.buffer.toString();
            const records = await new Promise((resolve, reject) => {
                parse(csvString, { columns: true }, (err, records) => {
                    if (err) reject(err);
                    resolve(records);
                });
            });
            fileData.push(records);
            return { fileData, err: 0, errMsg: "" };
        } else {
            return { err: 1, errMsg: "Invalid file type. Supported types are xlsx and csv." };
        }
    } catch (error) {
        console.error('Error reading file:', error.message);
        return { err: 1, errMsg: "Error reading file: " + error.message };
    }
};
