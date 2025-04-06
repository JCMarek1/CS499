/* GET travel view */
const travel = async (req, res) => {
    // API configuration
    const tripsEndpoint = 'http://localhost:3000/api/trips';
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        // Fetch data from API
        const response = await fetch(tripsEndpoint, options);
        
        // Handle HTTP errors (e.g., 404, 500)
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        // Parse JSON and validate structure
        const data = await response.json();
        
        // Check if data is an array
        if (!Array.isArray(data)) {
            throw new Error('Invalid data format: Expected an array of trips');
        }

        // Check if array is empty
        if (data.length === 0) {
            throw new Error('No trips found in the database');
        }

        // Render view with validated data
        res.render('travel', { 
            title: 'Travlr Getaways', 
            trips: data 
        });

    } catch (err) {
        console.error('Travel controller error:', err);
        
        // Send appropriate error response
        res.status(500).render('error', {
            title: 'Error',
            error: err.message
        });
    }
};

module.exports = { travel };