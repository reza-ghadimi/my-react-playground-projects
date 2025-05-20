import fs from 'node:fs/promises';

export const isNullOrWhitespace = content =>
    content == null || content == undefined || content.trim() == '';

export function mapResult({ isSucceed, data = null, message = null }) {
    return { isSucceed, data, message };
}

export async function readFile({ path, defaultValue }) {
    try {
        const jsonData = await fs.readFile(path, 'utf-8');

        if (isNullOrWhitespace(jsonData)) {
            return defaultValue;
        }

        return JSON.parse(jsonData);
    } catch (err) {
        console.error(`Failed to read file at ${path}:`, err.message);

        return defaultValue;
    }
}

export async function writeFile({ path, value }) {
    await fs.writeFile(path, JSON.stringify(value, null, 2))
}
