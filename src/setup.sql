-- Drop existing tables if re-creating
DROP TABLE IF EXISTS service_projects CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

-- Create Organizations Table
CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- Create Categories Table
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL
);

-- Create Service Projects Table
CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organizations(organization_id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(category_id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

-- Insert Sample Organizations Data
INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES 
    (
        'BrightFuture Builders',
        'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
        'info@brightfuturebuilders.org',
        'brightfuture-logo.png'
    ),
    (
        'GreenHarvest Growers',
        'An urban farming collective promoting food sustainability and education in local neighborhoods.',
        'contact@greenharvest.org',
        'greenharvest-logo.png'
    ),
    (
        'UnityServe Volunteers',
        'A volunteer coordination group supporting local charities and service initiatives.',
        'hello@unityserve.org',
        'unityserve-logo.png'
    );

-- Insert Sample Categories Data
INSERT INTO categories (name, description, icon)
VALUES
    (
        'Environmental',
        'Tree planting, urban park maintenance, ecological restoration, recycling campaigns, and community garden management.',
        '🌱'
    ),
    (
        'Educational',
        'K-12 tutoring, youth sports coaching, ESL teaching, STEM learning labs, and adult literacy classes.',
        '📚'
    ),
    (
        'Community Service',
        'Food bank sorting, hot meal kitchen prep, neighborhood cleanups, senior support, and emergency relief drives.',
        '🤝'
    ),
    (
        'Health and Wellness',
        'Elderly companionship, nursing home visits, hospital volunteer assistance, blood drives, and wellness workshops.',
        '🏥'
    );

-- Insert Sample Service Projects Data (at least 5 sample projects per organization)
INSERT INTO service_projects (organization_id, category_id, title, description, location, date)
VALUES
    -- Projects sponsored by BrightFuture Builders (Org 1)
    (
        1,
        3,
        'Community Center Ramp Construction',
        'Build ADA accessible mobility ramps and handrails for the Eastside Community Center.',
        '100 East Community Lane, Springfield',
        '2026-10-05'
    ),
    (
        1,
        3,
        'Affordable Housing Painting & Weatherization',
        'Seal drafty windows and repaint exterior weather coatings on five low-income family houses.',
        '452 Oak Terrace, Riverdale',
        '2026-10-18'
    ),
    (
        1,
        1,
        'Playground Renovation Project',
        'Assemble new safety swing sets, repair existing park benches, and lay down woodchips.',
        'Lincoln Memorial Park, Springfield',
        '2026-11-02'
    ),
    (
        1,
        4,
        'Senior Citizen Home Winterization',
        'Install insulation, seal doorway gaps, and inspect smoke detectors for neighborhood seniors.',
        'Maple Grove Senior Living, Oakwood',
        '2026-11-20'
    ),
    (
        1,
        2,
        'Youth STEM Workshop Furniture Assembly',
        'Assemble sturdy workbenches and shelving units for the new youth maker and technology space.',
        '789 Innovation Way, Greenfield',
        '2026-12-08'
    ),

    -- Projects sponsored by GreenHarvest Growers (Org 2)
    (
        2,
        1,
        'Urban Greenhouse Soil Preparation',
        'Prepare organic compost beds, calibrate irrigation drippers, and prepare winter seedlings.',
        '320 Garden Valley Road, Riverdale',
        '2026-09-28'
    ),
    (
        2,
        1,
        'Community Fruit Orchard Planting',
        'Plant 40 native fruit and nut saplings to create a sustainable neighborhood foraging orchard.',
        'Northview Community Commons, Springfield',
        '2026-10-12'
    ),
    (
        2,
        3,
        'Harvest Day & Farm-to-Pantry Packing',
        'Pick fresh organic root vegetables and pack fresh produce crates for delivery to local shelters.',
        'Valley View Farms, Highland Park',
        '2026-10-24'
    ),
    (
        2,
        2,
        'School Gardening & Composting Workshop',
        'Teach elementary students the fundamentals of soil biology and construct raised seed beds.',
        'Washington Elementary School, Greenfield',
        '2026-11-07'
    ),
    (
        2,
        1,
        'Winter Crop Cover & Mulching',
        'Lay straw mulching and protective row covers across community plots ahead of early freezes.',
        'Riverside Plots, Springfield',
        '2026-11-28'
    ),

    -- Projects sponsored by UnityServe Volunteers (Org 3)
    (
        3,
        3,
        'Emergency Food Box Assembly',
        'Package shelf-stable food rations, canned goods, and essential personal hygiene kits.',
        'Unity Logistics Warehouse, Downtown',
        '2026-10-01'
    ),
    (
        3,
        4,
        'Downtown Hot Meal Soup Kitchen',
        'Prepare, cook, and serve hot nutritious lunches and refreshments to homeless neighbors.',
        'Hope Mission Center, Downtown',
        '2026-10-15'
    ),
    (
        3,
        2,
        'Back-to-School Backpack Distribution',
        'Distribute backpacks stocked with notebooks, pencils, and art supplies to students.',
        'Central Youth Pavilion, Riverdale',
        '2026-10-29'
    ),
    (
        3,
        4,
        'Holiday Blanket & Winter Coat Drive',
        'Collect, inspect, sort, and distribute warm coats, thermal gloves, and heavy blankets.',
        'Civic Center Plaza, Springfield',
        '2026-11-14'
    ),
    (
        3,
        3,
        'Thanksgiving Family Feast Prep & Delivery',
        'Package and deliver full Thanksgiving turkey meal packages directly to homebound families.',
        'Community Service Hub, Oakwood',
        '2026-11-26'
    );
