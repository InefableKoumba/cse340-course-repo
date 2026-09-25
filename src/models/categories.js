import db from "./db.js";

/**
 * Get all categories from the database
 * Optionally calculates active project counts per category
 */
export async function getAllCategories() {
  try {
    const queryText = `
      SELECT 
        c.category_id,
        c.name,
        c.description,
        c.icon,
        COUNT(p.project_id)::int AS project_count
      FROM categories c
      LEFT JOIN service_projects p ON c.category_id = p.category_id
      GROUP BY c.category_id, c.name, c.description, c.icon
      ORDER BY c.category_id ASC;
    `;
    const result = await db.query(queryText);
    return result.rows;
  } catch (error) {
    console.error("Error retrieving categories:", error);
    throw error;
  }
}

/**
 * Get a single category by ID
 */
export async function getCategoryById(id) {
  try {
    const result = await db.query(
      "SELECT category_id, name, description, icon FROM categories WHERE category_id = $1;",
      [id]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error(`Error retrieving category with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Retrieve a single category by its ID
 */
export async function getCategoryDetails(id) {
  return getCategoryById(id);
}

/**
 * Retrieve all categories for a given service project
 */
export async function getCategoriesByProjectId(projectId) {
  try {
    const queryText = `
      SELECT 
        c.category_id,
        c.name,
        c.description,
        c.icon
      FROM categories c
      JOIN service_projects p ON c.category_id = p.category_id
      WHERE p.project_id = $1;
    `;
    const result = await db.query(queryText, [projectId]);
    return result.rows;
  } catch (error) {
    console.error(`Error retrieving categories for project ${projectId}:`, error);
    throw error;
  }
}

/**
 * Retrieve all service projects for a given category
 */
export async function getProjectsByCategoryId(categoryId) {
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
        o.name AS organization_name
      FROM service_projects p
      JOIN organizations o ON p.organization_id = o.organization_id
      WHERE p.category_id = $1
      ORDER BY p.date ASC;
    `;
    const result = await db.query(queryText, [categoryId]);
    return result.rows;
  } catch (error) {
    console.error(`Error retrieving projects for category ${categoryId}:`, error);
    throw error;
  }
}

export default {
  getAllCategories,
  getCategoryById,
  getCategoryDetails,
  getCategoriesByProjectId,
  getProjectsByCategoryId,
};
