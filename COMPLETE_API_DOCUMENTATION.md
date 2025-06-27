# Production Tracking System - Complete API Documentation

## Overview
Dokumentasi lengkap untuk Production Tracking System API yang mencakup manajemen produksi, inventory, customer, sales order, pallet, dan delivery.

## Base URL
```
http://localhost:4501/api/v1
```

## Authentication
Sistem menggunakan session-based authentication. Login diperlukan untuk sebagian besar endpoint kecuali yang disebutkan sebagai "Public".

### Headers yang Diperlukan
```
Content-Type: application/json
Cookie: sessionId=<session_cookie>
```

---

## 🔐 **1. Authentication & User Management**

### Base Path: `/api/v1/auth`

#### **1.1. Register User**
```http
POST /api/v1/auth/register
```
**Access:** Public

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+62812345678",
  "role": "OPERATOR"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "cm123xyz789",
    "username": "john_doe",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+62812345678",
    "role": "OPERATOR",
    "isActive": true,
    "createdAt": "2025-06-27T10:00:00.000Z"
  }
}
```

#### **1.2. Login**
```http
POST /api/v1/auth/login
```
**Access:** Public

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "cm123xyz789",
      "username": "john_doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "OPERATOR",
      "isActive": true
    },
    "sessionId": "sess_abc123def456"
  }
}
```

#### **1.3. Logout**
```http
POST /api/v1/auth/logout
```
**Access:** Authenticated

**Response:**
```json
{
  "success": true,
  "message": "Logout successful",
  "data": null
}
```

#### **1.4. Get Profile**
```http
GET /api/v1/auth/profile
```
**Access:** Authenticated

#### **1.5. Update Profile**
```http
PUT /api/v1/auth/profile
```
**Access:** Authenticated

#### **1.6. Change Password**
```http
PUT /api/v1/auth/change-password
```
**Access:** Authenticated

#### **1.7. Get All Users (Admin)**
```http
GET /api/v1/auth/users
```
**Access:** Admin Only

#### **1.8. Get User by ID (Admin)**
```http
GET /api/v1/auth/users/{id}
```
**Access:** Admin Only

---

## 👥 **2. Customer Management**

### Base Path: `/api/v1/customer`

#### **2.1. Get All Customers**
```http
GET /api/v1/customer?page=1&limit=10&search=PT
```
**Access:** Authenticated

**Query Parameters:**
- `page` (integer): Page number
- `limit` (integer): Items per page
- `search` (string): Search by name, email, or phone

**Response:**
```json
{
  "success": true,
  "message": "Customers retrieved successfully",
  "data": [
    {
      "id": "cust_123",
      "name": "PT. Example Company",
      "address": "Jl. Sudirman No. 123",
      "phone": "+62211234567",
      "email": "contact@example.com",
      "contactPerson": "Jane Doe",
      "createdAt": "2025-06-27T10:00:00.000Z",
      "updatedAt": "2025-06-27T10:00:00.000Z"
    }
  ],
  "metadata": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 5,
      "totalPages": 1
    }
  }
}
```

#### **2.2. Get Customer by ID**
```http
GET /api/v1/customer/{id}
```

#### **2.3. Create Customer**
```http
POST /api/v1/customer
```

**Request Body:**
```json
{
  "name": "PT. New Company",
  "address": "Jl. Thamrin No. 456",
  "phone": "+62211234567",
  "email": "contact@newcompany.com",
  "contactPerson": "John Smith"
}
```

#### **2.4. Update Customer**
```http
PUT /api/v1/customer/{id}
```

#### **2.5. Delete Customer**
```http
DELETE /api/v1/customer/{id}
```

---

## 📦 **3. Item Management**

### Base Path: `/api/v1/item`

#### **3.1. Get All Items**
```http
GET /api/v1/item?page=1&limit=10&type=PRODUCT&search=book
```

**Query Parameters:**
- `page` (integer): Page number
- `limit` (integer): Items per page
- `type` (string): Filter by type (MATERIAL, SEMI_FINISHED, PRODUCT)
- `search` (string): Search by name or code

**Response:**
```json
{
  "success": true,
  "message": "Items retrieved successfully",
  "data": [
    {
      "id": "item_123",
      "code": "ITM-001",
      "name": "Das Kapital",
      "type": "PRODUCT",
      "price": 150000,
      "createdAt": "2025-06-27T10:00:00.000Z",
      "updatedAt": "2025-06-27T10:00:00.000Z"
    }
  ],
  "metadata": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 15,
      "totalPages": 2
    }
  }
}
```

#### **3.2. Get Item by ID**
```http
GET /api/v1/item/{id}
```

#### **3.3. Create Item**
```http
POST /api/v1/item
```

**Request Body:**
```json
{
  "code": "ITM-002",
  "name": "Communist Manifesto",
  "type": "PRODUCT",
  "price": 75000
}
```

#### **3.4. Update Item**
```http
PUT /api/v1/item/{id}
```

#### **3.5. Delete Item**
```http
DELETE /api/v1/item/{id}
```

---

## 🏭 **4. Machine Management**

### Base Path: `/api/v1/machine`

#### **4.1. Get All Machines**
```http
GET /api/v1/machine?page=1&limit=10&type=PROCESS
```

**Query Parameters:**
- `type` (string): Filter by type (PREPROCESS, PROCESS, FINISHING)

**Response:**
```json
{
  "success": true,
  "message": "Machines retrieved successfully",
  "data": [
    {
      "id": "machine_123",
      "code": "MCH-001",
      "name": "Printing Press Alpha",
      "details": "High-speed printing machine",
      "type": "PROCESS",
      "createdAt": "2025-06-27T10:00:00.000Z",
      "updatedAt": "2025-06-27T10:00:00.000Z"
    }
  ]
}
```

#### **4.2. Get Machine by ID**
```http
GET /api/v1/machine/{id}
```

#### **4.3. Create Machine**
```http
POST /api/v1/machine
```

**Request Body:**
```json
{
  "code": "MCH-002",
  "name": "Binding Machine Beta",
  "details": "Automatic binding machine",
  "type": "FINISHING"
}
```

#### **4.4. Update Machine**
```http
PUT /api/v1/machine/{id}
```

#### **4.5. Delete Machine**
```http
DELETE /api/v1/machine/{id}
```

---

## 📋 **5. Sales Order Management**

### Base Path: `/api/v1/sales-order`

#### **5.1. Get All Sales Orders**
```http
GET /api/v1/sales-order?page=1&limit=10&status=COMPLETED&search=SO-2025
```

**Query Parameters:**
- `status` (string): Filter by status (IDLE, IN_PROGRESS, COMPLETED, DELIVERED)
- `search` (string): Search by code or customer

**Response:**
```json
{
  "success": true,
  "message": "Sales orders retrieved successfully",
  "data": [
    {
      "id": "so_123",
      "code": "SO-2025-001",
      "totalPrice": 33000000,
      "completionDate": "2025-07-15T00:00:00.000Z",
      "deliveryDate": "2025-07-20T00:00:00.000Z",
      "status": "COMPLETED",
      "maxQuantityPerPallet": 50,
      "customer": {
        "id": "cust_123",
        "name": "PT. Example Company"
      },
      "items": [
        {
          "id": "soi_123",
          "targetQuantity": 220,
          "remainingQuantity": 0,
          "actualQuantity": 220,
          "fullyPlanned": true,
          "item": {
            "id": "item_123",
            "name": "Das Kapital",
            "type": "PRODUCT"
          }
        }
      ],
      "createdAt": "2025-06-27T10:00:00.000Z",
      "updatedAt": "2025-06-27T12:00:00.000Z"
    }
  ]
}
```

#### **5.2. Get Sales Order by ID**
```http
GET /api/v1/sales-order/{id}
```

#### **5.3. Get Sales Order Progress**
```http
GET /api/v1/sales-order/{id}/progress
```

**Response:**
```json
{
  "success": true,
  "message": "Sales order progress retrieved successfully",
  "data": {
    "salesOrder": {
      "id": "so_123",
      "code": "SO-2025-001",
      "status": "COMPLETED"
    },
    "items": [
      {
        "item": {
          "name": "Das Kapital"
        },
        "targetQuantity": 220,
        "actualQuantity": 220,
        "remainingQuantity": 0,
        "progressPercentage": 100,
        "spks": [
          {
            "id": "spk_123",
            "code": "SPK-2025-001",
            "targetQuantity": 110,
            "completedQuantity": 110,
            "status": "COMPLETED"
          }
        ]
      }
    ],
    "overallProgress": {
      "totalItems": 1,
      "completedItems": 1,
      "overallPercentage": 100
    }
  }
}
```

#### **5.4. Create Sales Order**
```http
POST /api/v1/sales-order
```

**Request Body:**
```json
{
  "code": "SO-2025-002",
  "customerId": "cust_123",
  "totalPrice": 15000000,
  "completionDate": "2025-08-15T00:00:00.000Z",
  "deliveryDate": "2025-08-20T00:00:00.000Z",
  "maxQuantityPerPallet": 50,
  "items": [
    {
      "itemId": "item_123",
      "targetQuantity": 100
    }
  ]
}
```

#### **5.5. Update Sales Order**
```http
PUT /api/v1/sales-order/{id}
```

#### **5.6. Update Sales Order Items**
```http
PUT /api/v1/sales-order/{id}/items
```

#### **5.7. Delete Sales Order**
```http
DELETE /api/v1/sales-order/{id}
```

#### **5.8. Complete Sales Order**
```http
POST /api/v1/sales-order/{id}/complete
```

---

## 📊 **6. SPK (Surat Perintah Kerja) Management**

### Base Path: `/api/v1/spk`

#### **6.1. Get All SPK**
```http
GET /api/v1/spk?page=1&limit=10&status=COMPLETED&salesOrderId=so_123
```

**Response:**
```json
{
  "success": true,
  "message": "SPK retrieved successfully",
  "data": [
    {
      "id": "spk_123",
      "code": "SPK-2025-001",
      "preprocessDeadline": "2025-07-05T00:00:00.000Z",
      "processDeadline": "2025-07-10T00:00:00.000Z",
      "finishingDeadline": "2025-07-15T00:00:00.000Z",
      "targetQuantity": 110,
      "startStage": "PREPROCESS",
      "salesOrder": {
        "code": "SO-2025-001",
        "customer": {
          "name": "PT. Example Company"
        }
      },
      "salesOrderItem": {
        "item": {
          "name": "Das Kapital"
        }
      },
      "phases": [
        {
          "stage": "PREPROCESS",
          "status": "COMPLETED",
          "startDate": "2025-06-27T08:00:00.000Z",
          "completionDate": "2025-06-29T17:00:00.000Z"
        }
      ]
    }
  ]
}
```

#### **6.2. Get SPK by ID**
```http
GET /api/v1/spk/{id}
```

#### **6.3. Create SPK**
```http
POST /api/v1/spk
```

#### **6.4. Update SPK**
```http
PUT /api/v1/spk/{id}
```

#### **6.5. Delete SPK**
```http
DELETE /api/v1/spk/{id}
```

#### **6.6. Start SPK Phase**
```http
POST /api/v1/spk/{id}/start-phase
```

#### **6.7. Complete SPK Phase**
```http
POST /api/v1/spk/{id}/complete-phase
```

---

## 📦 **7. Storage Management**

### Base Path: `/api/v1/storage`

#### **7.1. Get All Storage Items**
```http
GET /api/v1/storage?page=1&limit=10&itemType=PRODUCT&stage=FINISHING
```

**Query Parameters:**
- `itemType` (string): Filter by item type
- `stage` (string): Filter by SPK stage
- `search` (string): Search by item name or SPK code

**Response:**
```json
{
  "success": true,
  "message": "Storage items retrieved successfully",
  "data": [
    {
      "id": "storage_123",
      "stock": 150,
      "spkStage": "FINISHING",
      "item": {
        "id": "item_123",
        "name": "Das Kapital",
        "type": "PRODUCT",
        "price": 150000
      },
      "spk": {
        "id": "spk_123",
        "code": "SPK-2025-001",
        "salesOrder": {
          "id": "so_123",
          "code": "SO-2025-001"
        }
      },
      "createdAt": "2025-06-27T10:00:00.000Z",
      "updatedAt": "2025-06-27T14:00:00.000Z"
    }
  ]
}
```

#### **7.2. Get Storage by ID**
```http
GET /api/v1/storage/{id}
```

#### **7.3. Create Storage Entry**
```http
POST /api/v1/storage
```

**Request Body:**
```json
{
  "spkId": "spk_123",
  "itemId": "item_123",
  "spkStage": "FINISHING",
  "stock": 100
}
```

#### **7.4. Update Storage**
```http
PUT /api/v1/storage/{id}
```

#### **7.5. Delete Storage Entry**
```http
DELETE /api/v1/storage/{id}
```

#### **7.6. Transfer Stock**
```http
POST /api/v1/storage/transfer
```

**Request Body:**
```json
{
  "sourceId": "storage_123",
  "targetId": "storage_456",
  "quantity": 50
}
```

#### **7.7. Get Storage by Item**
```http
GET /api/v1/storage/item/{itemId}
```

#### **7.8. Get Storage by SPK**
```http
GET /api/v1/storage/spk/{spkId}
```

#### **7.9. Reduce Stock by Item**
```http
POST /api/v1/storage/reduce-stock
```

**Request Body:**
```json
{
  "itemId": "item_123",
  "quantity": 25,
  "prioritySpkId": "spk_123"
}
```

#### **7.10. Add Stock by Item**
```http
POST /api/v1/storage/add-stock
```

---

## 📦 **8. Pallet Management**

### Base Path: `/api/v1/pallet`

#### **8.1. Get All Pallets**
```http
GET /api/v1/pallet?page=1&limit=10&status=READY&salesOrderId=so_123
```

#### **8.2. Get Pallet by ID**
```http
GET /api/v1/pallet/{id}
```

#### **8.3. Create New Pallet**
```http
POST /api/v1/pallet
```

**Request Body:**
```json
{
  "salesOrderId": "so_123",
  "itemId": "item_123",
  "maxQuantity": 50
}
```

#### **8.4. Update Pallet**
```http
PUT /api/v1/pallet/{id}
```

#### **8.5. Delete Pallet**
```http
DELETE /api/v1/pallet/{id}
```

#### **8.6. Mark Pallet as Shipped**
```http
POST /api/v1/pallet/{id}/ship
```

#### **8.7. Add Items to Pallet (Manual)**
```http
POST /api/v1/pallet/{palletId}/items
```

**Request Body:**
```json
{
  "itemId": "item_123",
  "quantity": 25
}
```

#### **8.8. Create Pallets for Sales Order (Auto)**
```http
POST /api/v1/pallet/sales-order/create-pallets
```

**Request Body:**
```json
{
  "salesOrderId": "so_123",
  "autoFill": true
}
```

#### **8.9. Fill Pallet Automatically**
```http
POST /api/v1/pallet/{palletId}/fill-automatically
```

**Request Body:**
```json
{
  "targetQuantity": 40
}
```

#### **8.10. Check Stock Availability**
```http
POST /api/v1/pallet/sales-order/stock-availability
```

**Request Body:**
```json
{
  "salesOrderId": "so_123"
}
```

---

## 🚚 **9. Delivery Management**

### Base Path: `/api/v1/delivery`

#### **9.1. Get All Delivery Orders**
```http
GET /api/v1/delivery?page=1&limit=10&status=PENDING
```

**Response:**
```json
{
  "success": true,
  "message": "Delivery orders retrieved successfully",
  "data": [
    {
      "id": "delivery_123",
      "code": "DO-2025-001",
      "deliveryDate": "2025-07-20T00:00:00.000Z",
      "status": "PENDING",
      "notes": "Handle with care",
      "salesOrder": {
        "id": "so_123",
        "code": "SO-2025-001",
        "customer": {
          "name": "PT. Example Company"
        }
      },
      "pallets": [
        {
          "id": "pallet_123",
          "code": "PLT-2025-001",
          "status": "READY",
          "currentQuantity": 50
        }
      ],
      "createdAt": "2025-06-27T10:00:00.000Z",
      "updatedAt": "2025-06-27T10:00:00.000Z"
    }
  ]
}
```

#### **9.2. Get Delivery Order by ID**
```http
GET /api/v1/delivery/{id}
```

#### **9.3. Create Delivery Order**
```http
POST /api/v1/delivery
```

**Request Body:**
```json
{
  "salesOrderId": "so_123",
  "deliveryDate": "2025-07-20T00:00:00.000Z",
  "notes": "Handle with care",
  "palletIds": ["pallet_123", "pallet_456"]
}
```

#### **9.4. Update Delivery Order**
```http
PUT /api/v1/delivery/{id}
```

#### **9.5. Delete Delivery Order**
```http
DELETE /api/v1/delivery/{id}
```

#### **9.6. Mark as In Transit**
```http
POST /api/v1/delivery/{id}/in-transit
```

#### **9.7. Mark as Delivered**
```http
POST /api/v1/delivery/{id}/delivered
```

---

## 📊 **10. Report Management**

### Base Path: `/api/v1/report`

#### **10.1. Get All Production Reports**
```http
GET /api/v1/report?page=1&limit=10&stage=FINISHING&spkId=spk_123
```

**Response:**
```json
{
  "success": true,
  "message": "Production reports retrieved successfully",
  "data": [
    {
      "id": "report_123",
      "code": "RPT-2025-001",
      "stage": "FINISHING",
      "targetQuantity": 110,
      "actualQuantity": 108,
      "wasteQuantity": 2,
      "totalStorageUsed": 110,
      "differenceToTarget": -2,
      "notes": "Minor waste due to quality issues",
      "tags": ["BELOW_TARGET", "WASTE_USED"],
      "spkPhase": {
        "spk": {
          "code": "SPK-2025-001"
        },
        "stage": "FINISHING"
      },
      "spkItem": {
        "outputItem": {
          "name": "Das Kapital"
        }
      },
      "confirmedByUser": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "confirmedDate": "2025-06-27T15:00:00.000Z",
      "createdAt": "2025-06-27T15:00:00.000Z"
    }
  ]
}
```

#### **10.2. Get Report by ID**
```http
GET /api/v1/report/{id}
```

#### **10.3. Create Production Report**
```http
POST /api/v1/report
```

#### **10.4. Update Production Report**
```http
PUT /api/v1/report/{id}
```

#### **10.5. Delete Production Report**
```http
DELETE /api/v1/report/{id}
```

#### **10.6. Confirm Production Report**
```http
POST /api/v1/report/{id}/confirm
```

---

## 🔄 **Common Response Format**

### Success Response:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* response data */ },
  "metadata": { /* optional metadata like pagination */ }
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

### HTTP Status Codes:
- `200` - OK (Success)
- `201` - Created (Resource created successfully)
- `400` - Bad Request (Validation error, business logic error)
- `401` - Unauthorized (Authentication required)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found (Resource not found)
- `500` - Internal Server Error

---

## 🔐 **Authentication & Authorization**

### User Roles:
- **ADMIN**: Full access to all endpoints
- **OPERATOR**: Limited access to operational endpoints

### Authentication Flow:
1. Register/Login → Get session cookie
2. Include session cookie in subsequent requests
3. System validates session for protected endpoints

### Protected Endpoints:
All endpoints except:
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api` (API info)
- `GET /` (Server status)

---

## 🚀 **Workflow Examples**

### **Complete Production Workflow:**

1. **Setup Master Data**
   - Create customers, items, machines
   
2. **Create Sales Order**
   ```http
   POST /api/v1/sales-order
   ```

3. **Create SPK for Production**
   ```http
   POST /api/v1/spk
   ```

4. **Execute Production Phases**
   ```http
   POST /api/v1/spk/{id}/start-phase
   POST /api/v1/spk/{id}/complete-phase
   ```

5. **Add to Storage**
   ```http
   POST /api/v1/storage
   ```

6. **Create & Fill Pallets**
   ```http
   POST /api/v1/pallet/sales-order/create-pallets
   ```

7. **Create Delivery Order**
   ```http
   POST /api/v1/delivery
   ```

8. **Mark as Delivered**
   ```http
   POST /api/v1/delivery/{id}/delivered
   ```

---

## 📝 **Notes**

1. **Pagination**: Most list endpoints support pagination with `page` and `limit` parameters
2. **Search**: Many endpoints support search functionality
3. **Filtering**: Endpoints support filtering by status, type, etc.
4. **FIFO + SPK Priority**: Storage and pallet operations use FIFO with SPK priority logic
5. **Validation**: All input data is validated according to business rules
6. **Session Management**: Sessions expire after 24 hours of inactivity
7. **CORS**: API supports CORS for frontend integration

This documentation provides a complete overview of the Production Tracking System API. Each endpoint includes proper validation, error handling, and follows RESTful principles.
