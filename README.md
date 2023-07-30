# Car Dealership Management System API

This is a RESTful API for managing a car dealership system with authentication using JSON Web Tokens (JWT). It allows users to view and interact with cars, dealerships, and deals. The API is built using Node.js, Express, and MongoDB. ES6 features and asynchronous error handling using promises are utilized.

## Table of Contents

1. [Installation](#installation)
2. [Authentication](#authentication)
3. [User Endpoints](#user-endpoints)
4. [Dealership Endpoints](#dealership-endpoints)
5. [Handling Errors](#handling-errors)
6. [Using Faker.js](#using-fakerjs)
7. [API Documentation](#api-documentation)
8. [Conclusion](#conclusion)

## Installation

To run the API locally, follow these steps:

1. Clone the repository:

```bash
git clone <repository-url>
cd car-dealership-api
```

2. Install the dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The API should now be running on `http://localhost:3000`.

## Authentication

The API uses JWT (JSON Web Token) for authentication. Users (admin, user, and dealership) will receive a JWT upon successful login, which they should include in the `Authorization` header for authenticated requests.

## User Endpoints

### View All Cars

#### Request

```
GET /api/user/cars
```

#### Response

```json
{
  "cars": [
    {
      "id": "1",
      "make": "Toyota",
      "model": "Camry",
      "year": 2022
      // Additional car properties...
    },
    {
      "id": "2",
      "make": "Honda",
      "model": "Civic",
      "year": 2023
      // Additional car properties...
    }
  ]
}
```

### View All Cars in a Dealership

#### Request

```
GET /api/user/dealerships/:dealershipId/cars
```

#### Response

```json
{
  "cars": [
    {
      "id": "3",
      "make": "Ford",
      "model": "Mustang",
      "year": 2023
      // Additional car properties...
    },
    {
      "id": "4",
      "make": "Chevrolet",
      "model": "Corvette",
      "year": 2022
      // Additional car properties...
    }
  ]
}
```

### View Dealerships with a Certain Car

#### Request

```
GET /api/user/cars/:carId/dealerships
```

#### Response

```json
{
  "dealerships": [
    {
      "id": "5",
      "name": "XYZ Motors",
      "location": "New York"
      // Additional dealership properties...
    },
    {
      "id": "6",
      "name": "ABC Auto",
      "location": "Los Angeles"
      // Additional dealership properties...
    }
  ]
}
```

### View All Vehicles Owned by User

#### Request

```
GET /api/user/vehicles
```

#### Response

```json
{
  "vehicles": [
    {
      "id": "7",
      "make": "Toyota",
      "model": "Corolla",
      "year": 2022
      // Additional vehicle properties...
    },
    {
      "id": "8",
      "make": "Honda",
      "model": "Accord",
      "year": 2021
      // Additional vehicle properties...
    }
  ]
}
```

### View Dealerships within a Certain Range Based on User Location

#### Request

```
GET /api/user/dealerships/nearby?latitude=37.7749&longitude=-122.4194&range=50
```

#### Response

```json
{
  "dealerships": [
    {
      "id": "5",
      "name": "XYZ Motors",
      "location": "San Francisco"
      // Additional dealership properties...
    },
    {
      "id": "9",
      "name": "PQR Autos",
      "location": "Oakland"
      // Additional dealership properties...
    }
  ]
}
```

### View All Deals on a Certain Car

#### Request

```
GET /api/user/cars/:carId/deals
```

#### Response

```json
{
  "deals": [
    {
      "id": "10",
      "price": 25000,
      "dealershipId": "5"
      // Additional deal properties...
    },
    {
      "id": "11",
      "price": 27000,
      "dealershipId": "9"
      // Additional deal properties...
    }
  ]
}
```

### View All Deals from a Certain Dealership

#### Request

```
GET /api/user/dealerships/:dealershipId/deals
```

#### Response

```json
{
  "deals": [
    {
      "id": "12",
      "price": 28000,
      "carId": "3"
      // Additional deal properties...
    },
    {
      "id": "13",
      "price": 30000,
      "carId": "4"
      // Additional deal properties...
    }
  ]
}
```

### Buy a Car after a Deal is Made

#### Request

```
POST /api/user/deals/:dealId/buy
```

#### Response

```json
{
  "message": "Car purchased successfully!"
}
```

## Dealership Endpoints

### View All Cars

#### Request

```
GET /api/dealership/cars
```

#### Response

```json
{
  "cars": [
    {
      "id": "14",
      "make": "Toyota",
      "model": "Camry",
      "year": 2022
      // Additional car properties...
    },
    {
      "id": "15",
      "make": "Honda",
      "model": "Civic",
      "year": 2023
      // Additional car properties...
    }
  ]
}
```

### View All Cars Sold by Dealership

#### Request

```
GET /api/dealership/sold-cars
```

#### Response

```json
{
  "cars": [
    {
      "id": "16",
      "make": "Ford",
      "model": "Mustang",
      "year": 2023
      // Additional car properties...
    },
    {
      "id": "17",
      "make": "Chevrolet",
      "model": "Corvette",
      "year": 2022
      // Additional car properties...
    }
  ]
}
```

### Add Cars to Dealership

#### Request

```
POST /api/dealership/cars
Content-Type: multipart/form-data

{
  "make": "Toyota",
  "model": "Corolla",
  "year": 2023
  // Additional car properties...
}
```

#### Response

```json
{
  "message": "Car added successfully!"
}
```

### View Deals Provided by Dealership

#### Request

```
GET /api/dealership/deals


```

#### Response

```json
{
  "deals": [
    {
      "id": "18",
      "price": 25000,
      "carId": "14"
      // Additional deal properties...
    },
    {
      "id": "19",
      "price": 27000,
      "carId": "15"
      // Additional deal properties...
    }
  ]
}
```

### Add Deals to Dealership

#### Request

```
POST /api/dealership/deals
Content-Type: multipart/form-data

{
  "carId": "14",
  "price": 25000
  // Additional deal properties...
}
```

#### Response

```json
{
  "message": "Deal added successfully!"
}
```

### View All Vehicles the Dealership Has Sold

#### Request

```
GET /api/dealership/sold-vehicles
```

#### Response

```json
{
  "vehicles": [
    {
      "id": "20",
      "make": "Toyota",
      "model": "Corolla",
      "year": 2022
      // Additional vehicle properties...
    },
    {
      "id": "21",
      "make": "Honda",
      "model": "Accord",
      "year": 2021
      // Additional vehicle properties...
    }
  ]
}
```

### Add New Vehicle to the List of Sold Vehicles after a Deal is Made

#### Request

```
POST /api/dealership/deals/:dealId/sell-vehicle
Content-Type: multipart/form-data

{
  "make": "Toyota",
  "model": "Corolla",
  "year": 2022
  // Additional vehicle properties...
}
```

#### Response

```json
{
  "message": "Vehicle added to sold vehicles list successfully!"
}
```

## Handling Errors

All API endpoints handle errors asynchronously using promises. Appropriate error responses with status codes are sent back to the client in case of errors, such as invalid requests or database errors.

## Using Faker.js

[Faker.js](https://github.com/marak/Faker.js/) is used to create dummy data for testing and development purposes. It generates random car, dealership, and deal information.

## API Documentation

For detailed API documentation, please refer to the [API documentation](./API_DOCUMENTATION.md) file.

## Conclusion

This Car Dealership Management System API provides a comprehensive set of endpoints for managing cars, dealerships, and deals. It includes authentication using JWT, asynchronous error handling, and support for multipart/form-data. Faker.js is used for generating dummy data to facilitate testing and development. Feel free to use this API as a starting point to build your own car dealership management system or similar applications. If you have any questions or need further assistance, please don't hesitate to reach out. Happy coding!
