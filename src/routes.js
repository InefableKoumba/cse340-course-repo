import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage } from './controllers/organizations.js';
import { 
    showProjectsPage, 
    showProjectDetailsPage, 
    showEditProjectForm, 
    processEditProjectForm 
} from './controllers/projects.js';
import { 
    showCategoriesPage, 
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

// Routes for creating a new category
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', processNewCategoryForm);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Route for project details page
router.get('/project/:id', showProjectDetailsPage);

// Routes for editing a project
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', processEditProjectForm);

// Route for category details page
router.get('/category/:id', showCategoryDetailsPage);

// Routes for editing a category
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', processEditCategoryForm);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;
