import db from "./db.js";

/**
 * Get all service projects along with their sponsoring organization names
 */
async function getAllProjects() {
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
async function getProjectById(id) {
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

/**
 * Get all service projects associated with an organization
 */
const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      date
    FROM service_projects
    WHERE organization_id = $1
    ORDER BY date;
  `;
  
  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

// Export the model functions
/**
 * Retrieve the next upcoming service projects from the database
 */
const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    SELECT 
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM service_projects p
    JOIN organizations o ON p.organization_id = o.organization_id
    WHERE p.date >= CURRENT_DATE
    ORDER BY p.date ASC
    LIMIT $1;
  `;

  const queryParams = [number_of_projects];
  const result = await db.query(query, queryParams);
  return result.rows;
};

/**
 * Retrieve a single service project by its ID
 */
const getProjectDetails = async (id) => {
  const query = `
    SELECT 
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM service_projects p
    JOIN organizations o ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;

  const queryParams = [id];
  const result = await db.query(query, queryParams);
  return result.rows.length > 0 ? result.rows[0] : null;
};

/**
 * Retrieve all categories for a given service project
 */
const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT 
      c.category_id,
      c.name,
      c.description,
      c.icon
    FROM categories c
    JOIN service_projects p ON c.category_id = p.category_id
    WHERE p.project_id = $1;
  `;
  const result = await db.query(query, [projectId]);
  return result.rows;
};

/**
 * Retrieve all service projects for a given category
 */
const getProjectsByCategoryId = async (categoryId) => {
  const query = `
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
  const result = await db.query(query, [categoryId]);
  return result.rows;
};

export { 
  getAllProjects, 
  getProjectsByOrganizationId, 
  getUpcomingProjects, 
  getProjectDetails, 
  getProjectById,
  getCategoriesByProjectId,
  getProjectsByCategoryId
};

export default {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  getProjectById,
  getCategoriesByProjectId,
  getProjectsByCategoryId,
};



