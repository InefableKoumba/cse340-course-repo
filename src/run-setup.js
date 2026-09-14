import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import db from "./models/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runSetup() {
  try {
    const sqlPath = path.join(__dirname, "setup.sql");
    const sql = fs.readFileSync(sqlPath, "utf-8");
    console.log("Running setup.sql on the database...");
    await db.query(sql);
    console.log("Database setup completed successfully!");

    const orgs = await db.query("SELECT * FROM organizations;");
    console.log("Organizations currently in DB:");
    console.table(orgs.rows);

    const cats = await db.query("SELECT * FROM categories;");
    console.log("Categories currently in DB:");
    console.table(cats.rows);

    const projs = await db.query(
      `SELECT p.project_id, p.title, p.location, p.date, o.name AS organization_name, c.name AS category_name
       FROM service_projects p 
       JOIN organizations o ON p.organization_id = o.organization_id
       LEFT JOIN categories c ON p.category_id = c.category_id;`
    );
    console.log(`Service projects currently in DB (${projs.rows.length} records):`);
    console.table(projs.rows);
  } catch (err) {
    console.error("Error setting up database:", err);
  } finally {
    if (db.close) {
      await db.close();
    } else if (db.pool?.end) {
      await db.pool.end();
    } else if (db.end) {
      await db.end();
    }
  }
}

runSetup();
