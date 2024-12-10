# DinoPark Maintenance Backend

## Project Brief

DinoPark Maintenance Backend is designed to streamline park maintenance operations by providing a safe and efficient way to manage the park's facilities. It achieves this by processing logs from the NUDLS™ monitoring system, maintaining the state of dinosaurs and zones in a database, and exposing critical data through a RESTful API for frontend integration.

---

## Key Features

1. **Zone Maintenance Tracking**: Monitors all zones to ensure they are maintained within a 30-day cycle.
2. **Safety Monitoring**: Evaluates whether zones are safe for entry based on dinosaur activity and digestion states.
3. **Integration with NUDLS™**: Processes events from the NUDLS™ monitoring feed, accounting for intermittent connectivity.
4. **Resilient Database Management**: Stores park and dinosaur state persistently using PostgreSQL.
5. **Comprehensive API**: RESTful CRUD endpoints for seamless frontend integration.

---

## Tech Stack

- **Node.js**: Backend runtime environment.
- **TypeScript**: Ensures type safety and robust development.
- **TypeORM**: Object-relational mapper for PostgreSQL.
- **PostgreSQL**: Relational database for storing data.
- **Docker & Docker Compose**: Containerization for consistent environments.

---

## Setup Instructions

### Prerequisites

1. Install **Node.js** (>=16.x) and **npm**.
2. Install **Docker** and **Docker Compose**.

### Steps

1. **Clone the repository**:

   ```
   git clone git@github.com:MoepyaCode/Node-Dino-Park.git ./dinopark-backend

   npm run
   ```

2. **Get into the project folder**:

   ```
   cd dinopark-backend
   ```

3. **Install Dependencies**:

   ```
   npm install
   ```

4. **Run Docker and Containerize the Postgres DB**:

   Ensure that the Docker app is Running.

   ```
   docker-compose up -d
   ```

5. **Run the App (Development Mode -- nodemon)**:

   ```
   npm run dev
   ```

6. **(Alternate) Run the App**:

   ```
   npm run start
6. **Clear the Database**:

   ```
   docker-compose down && docker-compose up -d
   ```

## API Endpoints


The project runs on http://locahost:3000

### Dinosaur Management (DinoController)

Manage dinosaurs in the park.

| Method | Endpoint     | Description               |
| ------ | ------------ | ------------------------- |
| GET    | `/dinos`     | Retrieve all dinosaurs    |
| GET    | `/dinos/:id` | Retrieve a dinosaur by ID |

#### Input Examples:

- GET`/dinos`: **NA**

- GET`/dinos/:id`: **params** -- `/dinos/5`
  ```
     {
        id: 5
     }
  ```

---

### Zone Management (ZoneController)

Track and manage park zones.

| Method | Endpoint           | Description                             |
| ------ | ------------------ | --------------------------------------- |
| GET    | `/zones`           | Retrieve all zones                      |
| GET    | `/zones/:location` | Retrieve a zone by location (e.g., A13) |

#### Input Examples:

- GET`/zones`: **NA**

- GET`/zones/:location`: **params** -- `/zones/W15`
  ```
     {
        location: W15
     }
  ```

---

### Event Management (EventController)

Manage events related to dinosaurs and zones.

| Method | Endpoint                              | Description                                    |
| ------ | ------------------------------------- | ---------------------------------------------- |
| POST   | `/events/sync`                        | Sync the latest NUDLS™ feed                    |
| POST   | `/events/add/dinos/`                  | Add a new dinosaur                             |
| PATCH  | `/events/feed/dinos/:id`              | Record a feeding event for a specific dinosaur |
| PATCH  | `/events/location_update/dinos/:id`   | Update the location of a specific dinosaur     |
| PATCH  | `/events/maintenance/zones/:location` | Record maintenance performed on a zone         |
| DELETE | `/events/remove/dinos/:id`            | Remove a dinosaur by ID                        |

---

#### Input Examples:

- POST`events/sync`: **NA**

- POST`/events/add/dinos/`: **body**

  ```
     {
        id: 8,
        name: Testing,
        species: Testing,
        gender: male,
        digestion_period_in_hours: 48,
        herbivore: false,
        park_id: 1,
        location: W15
     }
  ```

- PATCH`/events/feed/dinos/:id`: **params** -- `/events/feed/dinos/8`

  ```
     {
        id: 8,
     }
  ```

- PATCH`/events/maintenance/zones/:location`: **params** -- `/events/maintenance/zones/A16`

  ```
     {
        location: A16,
     }
  ```

- DELETE`/events/remove/dinos/:id`: **params** -- `/events/remove/dinos/5`
  ```
     {
        id: 5,
     }
  ```

## Technical Considerations

### 1. Ensuring High Availability (99.99% Uptime Guarantee)

To meet a **99.99% uptime guarantee**, we would focus on making the system resilient through various strategies:

1. **Load Balancing**: We would distribute traffic across multiple application servers to ensure that if one server fails, others can seamlessly take over. This ensures continuous availability without downtime.

2. **Database Replication**: Implement a primary-replica database setup, where the primary database handles write operations, and replicas handle read operations. If the primary database goes down, the system can automatically switch to a replica with minimal disruption.

3. **Caching**: By using caching solutions like **Redis** or **Memcached**, frequently accessed data is stored in-memory, reducing the load on the database and ensuring faster response times. This approach also helps in providing data even if the database temporarily goes offline.

4. **Health Checks and Auto-recovery**: Regular health checks for the system ensure early detection of issues. Tools like **Kubernetes** or similar orchestrators can then automatically restart any services that are down, reducing downtime and maintaining service reliability.

5. **CDN Integration**: Using a Content Delivery Network (CDN) allows static content (images, videos, etc.) to be served from locations closer to the end-users, reducing load on the backend and improving the speed and reliability of content delivery.

6. **Disaster Recovery Plan**: It is critical to have a robust disaster recovery plan. Regular database backups and multi-region deployment ensure that even in the case of a catastrophic failure, the system can recover with minimal data loss and downtime.

---

### 2. Scaling for 1 Million Dinosaurs

If the park expects to scale to house **1 million dinosaurs** in the next year, the system would need several adjustments to handle this level of traffic and data:

1. **Database Optimization**: We would partition the database (both horizontally and vertically) to ensure that large datasets are split efficiently across multiple systems. Optimizing indexes for faster search and retrieval would also be necessary.

2. **Microservices Architecture**: Moving away from a monolithic architecture, we would break down the application into microservices. This allows different services to scale independently and focus on specific tasks, such as handling dinosaur data, zone management, and event logging.

3. **Event-Driven Architecture**: Adopting an event-driven architecture with systems like **RabbitMQ** or **Kafka** would help manage a high throughput of events, such as dinosaur movements and feeding events, without overloading the system.

4. **Asynchronous Processing**: Many operations can be performed asynchronously, such as processing large batches of dinosaur data or handling NUDLS™ feed updates. This would offload intensive operations from the main thread and improve responsiveness.

5. **Horizontal Scaling**: To manage a growing number of requests, we would deploy multiple instances of our services. Horizontal scaling allows us to add more servers as the demand increases, ensuring that the application remains responsive even during peak times.

6. **Load Testing and Monitoring**: Conducting stress tests and load testing with tools like **JMeter** or **Gatling** will help identify bottlenecks before they become a problem. Additionally, implementing robust monitoring tools ensures the system can be adjusted as needed to handle the increased load.

---

### 3. Recommendation on Firebase

When considering whether to implement **Firebase**, it is essential to understand what it offers and whether it fits the use case:

- **Pros of Firebase**:

  - Firebase provides real-time data syncing, which could be useful for tracking dinosaur movements and statuses in real-time.
  - It offers features like **Authentication**, **Database**, **Hosting**, and **Cloud Functions**, which can help reduce the operational burden of managing infrastructure.

- **Cons of Firebase**:
  - Firebase is a fully managed service, which means it may lack the flexibility needed for complex customizations or large-scale deployments.
  - It may not be the best choice for handling complex relational data and queries, such as those required to track millions of dinosaurs and zones. For such needs, a more robust relational database like PostgreSQL would be preferable.

**Recommendation**: Firebase could be useful for certain aspects of the system, like real-time features, but for complex database management and scalability at the scale of millions of dinosaurs, we would recommend using a more traditional database system like **PostgreSQL**. Firebase could be used as a secondary tool for specific use cases (e.g., real-time notifications), but not as the primary database solution.
