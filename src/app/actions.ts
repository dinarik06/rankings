"use server";

import { db } from "@/db";

export async function getTracks() {
  const result = await db.query.tracksTable.findMany({
    columns: { id: true, link: true, name: true },
  });

  return result;
}
