# Makersharks Supplier Search API

This project is a proof of concept (POC) for the Makersharks Supplier Search API, which allows buyers to search for manufacturers based on customized requirements such as location, nature of business, and manufacturing processes.

## Project Structure

- **controllers/**: Contains the controller logic for handling API requests.
- **datamodels/**: Contains the Mongoose model definitions for MongoDB.
- **routes/**: Contains the route definitions for the API endpoints.
- **index.js**: The main application file that sets up the Express server.

## Prerequisites

- **Node.js**: Ensure that Node.js (v14 or later) is installed on your system.
- **MongoDB**: A running instance of MongoDB. You can use a local instance or connect to a cloud MongoDB service like MongoDB Atlas.

## Installation

1. **Clone the repository:**
   
   ```bash
   git clone https://github.com/Vigneshmunikannan/Makersharks-search-API.git

2. **Install dependencies:**
   
    ```bash
    npm install

3. **Set up environment variables:**
   if needed change the .env data 
4. **Running the Application**

   ```bash
   npm start
   
## API Documentation
Endpoints
1. Query Suppliers
Endpoint: /api/supplier/query
Method: POST
Description: Retrieves a list of suppliers based on the provided criteria.

Example Request Body:
        
            {
              "location": "India",
              "nature_of_business": "small_scale",
              "manufacturing_processes": ["3d_printing"],
              "limit": 10,
              "page": 1
            }

location: (optional) The location of the suppliers.
nature_of_business: (optional) The nature of the business (small_scale, medium_scale, large_scale).
manufacturing_processes: (optional) An array of manufacturing processes (e.g., moulding, 3d_printing, casting, coating).
limit: (optional) The maximum number of suppliers to return. Defaults to 10.
page: (optional) The page number for pagination. Defaults to 1.

Example Response:

         {
           "suppliers": [
             {
               "supplier_id": "12345",
               "company_name": "ABC Manufacturing",
               "website": "http://abcmanufacturing.com",
               "location": "India",
               "nature_of_business": "small_scale",
               "manufacturing_processes": ["3d_printing", "moulding"]
             },
             ...
           ],
           "totalPages": 5,
           "currentPage": 1
         }

suppliers: An array of suppliers that match the search criteria.
Total pages: The total number of pages available.
currentPage: The current page number.

## CURL Commands
To query suppliers, you can use the following CURL command:

         curl -X POST http://localhost:3000/api/supplier/query \
      -H "Content-Type: application/json" \
      -d '{
            "location": "India",
            "nature_of_business": "small_scale",
            "manufacturing_processes": ["3d_printing"],
            "limit": 10,
            "page": 1
          }'



