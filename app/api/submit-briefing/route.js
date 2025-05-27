import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const fields = Object.fromEntries(formData);

    const imageFile = formData.get("image");

    let savedFilePath = null;

    if (imageFile && typeof imageFile === "object" && imageFile.name) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${uuidv4()}-${imageFile.name}`;
      const filepath = path.join(process.cwd(), "public", "uploads", filename);

      await writeFile(filepath, buffer);
      savedFilePath = `/uploads/${filename}`;
    }

    // 👇 hier kun je alles loggen of opslaan
    console.log("Briefing ontvangen:", fields);
    if (savedFilePath) console.log("Afbeelding opgeslagen op:", savedFilePath);

    return NextResponse.json({ success: true, imagePath: savedFilePath });
  } catch (error) {
    console.error("Fout bij uploaden:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
