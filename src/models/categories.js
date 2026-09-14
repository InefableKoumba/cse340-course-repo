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
    return result.rows[0];
  } catch (error) {
    console.error(`Error retrieving category with ID ${id}:`, error);
    throw error;
  }
}

export default {
  getAllCategories,
  getCategoryById,
};
