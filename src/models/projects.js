import db from "./db.js";

/**
 * Get all service projects along with their sponsoring organization names
 */
export async function getAllProjects() {
  try {
    const queryText = `
      SELECT 
        p.project_id,
        p.organization_id,
        p.category_id,
        p.title,
        p.description,
        p.location,
        p.date,
        o.name AS organization_name,
        o.logo_filename,
        c.name AS category_name
      FROM service_projects p
      JOIN organizations o ON p.organization_id = o.organization_id
      LEFT JOIN categories c ON p.category_id = c.category_id
      ORDER BY p.date ASC;
    `;
    const result = await db.query(queryText);
    return result.rows;
  } catch (error) {
    console.error("Error retrieving service projects:", error);
    throw error;
  }
}

/**
 * Get a single service project by ID with its organization name
 */
export async function getProjectById(id) {
  try {
    const queryText = `
      SELECT 
        p.project_id,
        p.organization_id,
        p.title,
        p.description,
        p.location,
        p.date,
        o.name AS organization_name,
        o.logo_filename
      FROM service_projects p
      JOIN organizations o ON p.organization_id = o.organization_id
      WHERE p.project_id = $1;
    `;
    const result = await db.query(queryText, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error retrieving project with ID ${id}:`, error);
    throw error;
  }
}

export default {
  getAllProjects,
  getProjectById,
};
