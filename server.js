import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

import { getAllOrganizations } from "./src/models/organizations.js";
import { getAllProjects } from "./src/models/projects.js";
import { getAllCategories } from "./src/models/categories.js";
import { testConnection } from "./src/models/db.js";

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || "production";

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set EJS as the templating engine
app.set("view engine", "ejs");

/**
 * Configure Express middleware
 */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Tell Express where to find your templates
app.set("views", path.join(__dirname, "src/views"));

/**
 * Routes
 */

app.get("/", async (req, res) => {
  const title = "Home";
  res.render("home", { title });
});

app.get("/organizations", async (req, res) => {
  try {
    const title = "Our Partner Organizations";
    const organizations = await getAllOrganizations();
    res.render("organizations", { title, organizations });
  } catch (error) {
    console.error("Error loading organizations:", error);
    res.status(500).send("Error retrieving organizations");
  }
});

app.get("/projects", async (req, res) => {
  try {
    const title = "Service Projects";
    const projects = await getAllProjects();
    console.log("Retrieved Service Projects from DB:", projects);
    res.render("projects", { title, projects });
  } catch (error) {
    console.error("Error loading service projects:", error);
    res.status(500).send("Error retrieving service projects");
  }
});

app.get("/categories", async (req, res) => {
  try {
    const title = "Project Categories";
    const categories = await getAllCategories();
    console.log("Retrieved Categories from DB:", categories);
    res.render("categories", { title, categories });
  } catch (error) {
    console.error("Error loading categories:", error);
    res.status(500).send("Error retrieving categories");
  }
});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
