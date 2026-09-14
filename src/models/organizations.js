import db from "./db.js";

/**
 * Get all organizations from the database
 */
export async function getAllOrganizations() {
  try {
    const result = await db.query(
      "SELECT organization_id, name, description, contact_email, logo_filename FROM organizations ORDER BY name ASC;"
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving organizations:", error);
    throw error;
  }
}

/**
 * Get an organization by its ID
 */
export async function getOrganizationById(id) {
  try {
    const result = await db.query(
      "SELECT organization_id, name, description, contact_email, logo_filename FROM organizations WHERE organization_id = $1;",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error(`Error retrieving organization with ID ${id}:`, error);
    throw error;
  }
}

export default {
  getAllOrganizations,
  getOrganizationById,
};
