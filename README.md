# Product Management System
Welcome to the Product Management System repository! This web application allows users to manage a list of products, including adding new products, viewing the existing ones, and batch deleting products.

## About
This project is a React web application that interacts with a PHP and MySQL backend to manage product data, [Product-Management-System-Api](https://github.com/MhamadR/Product-Management-System-Api). It consists of two main pages: the Product List page and the Add Product page.

## Product List Page
The Product List page displays a list of products with essential details such as SKU, Name, Price, and a product-specific attribute based on the product type. Users can also perform a mass delete action to remove selected products.

## Add Product Page
The Add Product page allows users to add new products with details like SKU, Name, Price, and the specific attributes based on the selected product type. The page dynamically adjusts the input fields based on the chosen product type, does not allow invalid inputs, and displays input errors and response errors on submit.

## Local Deployment
To deploy the application locally, follow these steps:

1. Clone this repository to your local machine:
```
git clone git@github.com:MhamadR/Product-Management-System.git
```
2. Navigate to the project directory
3. Install the project dependencies:
```
npm install
```
4. Start the development server:
```
  npm run dev
```
5. Access the application in your browser

## Hosting URLs
* Frontend React Application: https://product-management-system-001.netlify.app/
* Backend API Endpoint: https://antiwar-containers.000webhostapp.com/products
* Proxy-accessible API Endpoint: https://product-management-system-001.netlify.app/api/products

Please note that the hosting provider, 000webhost.com, does not fully support the DELETE and the OPTIONS method. Therefore, the DELETE logic has been implemented within the POST method for compatibility and the Frontend is using proxy to bypass OPTIONS requests.

## Backend API Repository
The backend API for this application is available in the following repository: [Product-Management-System-Api](https://github.com/MhamadR/Product-Management-System-Api)
