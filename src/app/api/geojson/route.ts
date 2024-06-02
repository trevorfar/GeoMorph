import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const geojsonDir = path.join(process.cwd(), 'public', 'geojson');
    const files = fs.readdirSync(geojsonDir);

    const geojsonFiles = files.filter(file => file.endsWith('.geo.json'));
    const geojsonData = geojsonFiles.map(file => {
      const filePath = path.join(geojsonDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(fileContents);

      const name = jsonData.features[0].properties.name;
      return { name, path: `/geojson/${file}` };
    });

    return NextResponse.json(geojsonData);
  } catch (error) {
    return NextResponse.error();
  }
}
