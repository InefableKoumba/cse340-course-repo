// Import any needed model functions
import { 
    getAllCategories, 
    getCategoryDetails, 
    getProjectsByCategoryId,
    createCategory,
    updateCategory
} from '../models/categories.js';

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};  

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryDetails(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = category ? `${category.name} Projects` : 'Category Details';

    res.render('category', { 
        title, 
        category, 
        categoryDetails: category, 
        projects 
    });
};

/**
 * Display the Create New Category form
 */
const showNewCategoryForm = (req, res) => {
    res.render('new-category', {
        title: 'Create New Category',
        errors: [],
        formData: { name: '', description: '' }
    });
};

/**
 * Process the Create New Category form submission
 */
const processNewCategoryForm = async (req, res, next) => {
    try {
        const rawName = req.body.name || '';
        const rawDescription = req.body.description || '';
        const trimmedName = rawName.trim();
        const trimmedDescription = rawDescription.trim();
        const errors = [];

        // Server-side validation
        if (!trimmedName) {
            errors.push('Category name is required.');
        } else {
            if (trimmedName.length < 3) {
                errors.push('Category name must be at least 3 characters in length.');
            }
            if (trimmedName.length > 100) {
                errors.push('Category name cannot exceed 100 characters.');
            }
        }

        if (errors.length > 0) {
            return res.render('new-category', {
                title: 'Create New Category',
                errors,
                formData: { name: rawName, description: rawDescription }
            });
        }

        await createCategory({ name: trimmedName, description: trimmedDescription });
        res.redirect('/categories');
    } catch (error) {
        next(error);
    }
};

/**
 * Display the Edit Category form
 */
const showEditCategoryForm = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryDetails(categoryId);

        if (!category) {
            const error = new Error('Category Not Found');
            error.status = 404;
            throw error;
        }

        res.render('edit-category', {
            title: `Edit Category: ${category.name}`,
            category,
            errors: [],
            formData: { name: category.name, description: category.description || '' }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Process the Edit Category form submission
 */
const processEditCategoryForm = async (req, res, next) => {
    const categoryId = req.params.id;
    try {
        const rawName = req.body.name || '';
        const rawDescription = req.body.description || '';
        const trimmedName = rawName.trim();
        const trimmedDescription = rawDescription.trim();
        const errors = [];

        // Server-side validation
        if (!trimmedName) {
            errors.push('Category name is required.');
        } else {
            if (trimmedName.length < 3) {
                errors.push('Category name must be at least 3 characters in length.');
            }
            if (trimmedName.length > 100) {
                errors.push('Category name cannot exceed 100 characters.');
            }
        }

        if (errors.length > 0) {
            const category = await getCategoryDetails(categoryId);
            return res.render('edit-category', {
                title: category ? `Edit Category: ${category.name}` : 'Edit Category',
                category: category || { category_id: categoryId, name: rawName, description: rawDescription },
                errors,
                formData: { name: rawName, description: rawDescription }
            });
        }

        await updateCategory(categoryId, { name: trimmedName, description: trimmedDescription });
        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        next(error);
    }
};

// Export any controller functions
export { 
    showCategoriesPage, 
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
};

