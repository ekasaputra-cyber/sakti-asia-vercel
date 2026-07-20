import { google } from "googleapis";

/**
 * Membuat authenticated client untuk Google Sheets & Drive API
 * menggunakan Service Account credentials dari environment variables.
 */
function getAuth() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_EMAIL atau GOOGLE_PRIVATE_KEY belum di-set di environment variables"
    );
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
    ],
  });
}

export function getSheetsClient() {
  const auth = getAuth();
  return google.sheets({ version: "v4", auth });
}

export function getDriveClient() {
  const auth = getAuth();
  return google.drive({ version: "v3", auth });
}

/**
 * Menambahkan satu baris baru ke sheet tertentu.
 * @param sheetName nama tab/sheet, misal "Contact" atau "Pendaftaran"
 * @param row array nilai kolom, urut sesuai header sheet
 */
export async function appendRow(sheetName: string, row: (string | number)[]) {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEET_ID belum di-set di environment variables");
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:Z`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [row],
    },
  });
}

/**
 * Upload satu file ke folder Google Drive tertentu. Izin akses file
 * otomatis mengikuti izin folder tujuan (folder sudah di-share
 * "siapa saja dengan link bisa lihat"), jadi tidak perlu set permission
 * per-file lagi — ini yang bikin proses upload jauh lebih cepat.
 *
 * @param folderId ID folder tujuan di Google Drive (bisa folder di Shared Drive)
 * @returns URL Drive untuk file yang baru diupload
 */
export async function uploadFileToDrive(
  fileName: string,
  mimeType: string,
  buffer: Buffer,
  folderId: string
): Promise<string> {
  const drive = getDriveClient();

  if (!folderId) {
    throw new Error("folderId tujuan upload tidak diberikan");
  }

  const { Readable } = await import("stream");
  const stream = Readable.from(buffer);

  const uploadResponse = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: stream,
    },
    fields: "id",
    supportsAllDrives: true,
  });

  const fileId = uploadResponse.data.id;
  if (!fileId) {
    throw new Error("Gagal upload file ke Drive: tidak ada file ID yang dikembalikan");
  }

  return `https://drive.google.com/file/d/${fileId}/view`;
}