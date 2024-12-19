import { NextRequest, NextResponse } from "next/server";
import { CosmosClient } from "@azure/cosmos";
import config from "@/lib/config";


// Cosmos DB Client
const client = new CosmosClient({ endpoint: config.endpoint, key: config.key });
const database = client.database(config.database.id);
const container = database.container(config.container.id);

export async function POST(req: NextRequest) {
  try {
    const { email, details } = await req.json();

    // Validate input
    if (!email || !details) {
      return NextResponse.json({ error: "Missing email or details" }, { status: 400 });
    }

    // Prepare and insert data
    const data = {
      email,
      details,
      timestamp: new Date().toISOString(),
    };

    await container.items.create(data);

    return NextResponse.json({ message: "Data saved successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error saving data to Cosmos DB:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
