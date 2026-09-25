import db from "./db.js";

/**
 * Get all organizations from the database
 */
async function getAllOrganizations() {
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
async function getOrganizationById(id) {
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

/**
 * Get the details of a specific organization
 */
const getOrganizationDetails = async (organizationId) => {
  const query = `
    SELECT
      organization_id,
      name,
      description,
      contact_email,
      logo_filename
    FROM organizations
    WHERE organization_id = $1;
  `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  // Return the first row of the result set, or null if no rows are found
  return result.rows.length > 0 ? result.rows[0] : null;
};

// Export the model functions
export { getAllOrganizations, getOrganizationDetails, getOrganizationById };

export default {
  getAllOrganizations,
  getOrganizationDetails,
  getOrganizationById,
};

