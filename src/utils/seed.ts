import { Payload } from "payload";
import path from "path";
import fs from "fs";

export async function seedAsset(
    payload: Payload,
    baseDir: string,
    fileName: string,
    alt: string
) {
    const filePath = path.join(baseDir, "assets", fileName);
    if (!fs.existsSync(filePath)) {
        console.warn(`Warning: Seed asset not found at ${filePath}`);
        return null;
    }

    const fileBuffer = fs.readFileSync(filePath);

    return await payload.create({
        collection: "media",
        data: { alt },
        file: {
            data: fileBuffer,
            name: fileName,
            mimetype: "image/png",
            size: fileBuffer.length,
        },
    });
}
