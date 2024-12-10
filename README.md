# Dino Park Project (Root Assignment)

## Table of Contents

1. [Introduction](#introduction)
1. [Tech Stack](#tech-stack)
2. [Setup Instructions](#setup-instructions)

   2.1. [Prerequisites](#prerequisites)

   2.2. [Steps](#steps)
3. [API Endpoints](#api-endpoints)

   3.1. [Dinosaur Management](#dinosaur-management)

   3.2. [Zone Management](#zone-management)

   3.3. [Event Management](#event-management)
4. [Questions](#questions)

## Introduction
This project implements the requirements of Dino Park, to ensure that the company has a reliable data source that can be used by the frontend to inform the park staff of the events of the park. The overral completion of this project is a highlight of my technical ability having used the least amount of AI possible throughout the project.

## Tech Stack

- **Node.js**
- **TypeScript**
- **TypeORM**
- **PostgreSQL**
- **Docker & Docker Compose**

---

## Setup Instructions

### Prerequisites

1. Install `Node.js` (>=16.x) and `npm`.
2. Install `Docker` and `Docker Compose`.

   2.1. We use Docker to containerize the Postgres Database.

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

### Dinosaur Management

Manage dinosaurs in the park. This is managed by `DinoController`

| Method | Endpoint     | Description               |
| ------ | ------------ | ------------------------- |
| GET    | `/dinos`     | Retrieve all dinosaurs    |
| GET    | `/dinos/:id` | Retrieve a dinosaur by ID |

#### Input Examples:

- GET `/dinos`:  **NA**

- GET `/dinos/:id`:  **params** -- `/dinos/5`
  ```
     {
        id: 5
     }
  ```

---

### Zone Management

Track and manage park zones. This is managed by `ZoneController`

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

### Event Management 

Manage events related to dinosaurs and zones. This is managed by `EventController`

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

- PATCH`/events/location_update/dinos/:id`: **params & body** -- `/events/location_update/dinos/20`

  ```
     {
        location: A16,
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
These questions were answered without the use of Chatgpt or AI help.

1. `Question` Given that lives depend on this software, Park Technical has insisted on a 99.99% uptime
guarantee. What would you do to make the service more resilient?

   - In order to put lives first and focus on 99.99% availability, having used AWS I believe that AWS has good measures that handle **availability and scalability**.
   - I look to ensure that the instance auto scales the instance and database that it uses, in order to manage **load balancing**.
   - There various auto-scaling and loading balancing types within AWS if it happens that a cost effective solution is need whilst maintaining the load-balancing capabilities that the Park Technical personnel requires.
   - Another implementation that can improve high availability is have **instances in different regions** so that if a region in us-east-1 goes down then it can default to the next closest alternative for example us-west-2.

2. `Question` The Mainland Park, which houses the largest number of dinosaurs, wants to roll this out
assuming the first version is a success. It’s expected that the park will house more than 1
million dinosaurs in the next 12 months. What would you change to handle this level of scale
on the system. Or rather, what do you expect to break, given the solution you provided?

   -  Considering the scale of increase in Dinosaurs, I assume that the park might want to expand its existing zones. Here is what I would break in this case:
      
      - Currently the number of Zones is fixed and is initialized **(Column: A-Z -- Rows: 0-15)** on the start of the project **zoneService.init()**, I would change this to be more dynamic and allow for more Zones to be added.

3. `Question` Someone recommended that we use FireBase. Park Technical has no idea what this is, but
has asked for your advice on whether to implement this or not. What is your
recommendation?

   -  The use of Firebase is mainly dependent on the needs of the Park Technical.
   -  From my experience:
   
      **Benefits:**
      - Firebase is good for a quick start to a project and avoiding the challenges that a developer might experience when it comes to setting up an entirely new environment.
      - It comes with a lot of add on features such as Authentication, Storage, Real time database, functions etc.

      **Disadvtages:**
      - There may be rigidness in how certain things are implemented such requiring specific things such as a custom emailing system as an example.
      - For this you would need to extend your system by using node to run firebase functions that will and register those functions.
      - Firebase does not use relational databases. This is not good considering the data structure and storing that Dino Park needs.

      **Advice:**
      - As much as firebase is a quick easy start; however, it would be better for Dino Park to have a single environment that can be built using a collection of different tech stacks.
      - This allows more control of your stack and environment.

## Questions
These questions were answered without the use of Chatgpt or AI help.


1. __Briefly explain how you approached the problem?__
   - I started by breaking the project into smaller components and functionality:
      - First, successfully add, feed, change location and remove Dino. **(includes error handling)**
      - Secondly, event and combined that with changes of Zone.
   - My approach was to be able to make event based changes that affect both Zone and Dino. 
      - This means that there is a main controller `(EventController)` that handles API calls that affect both Zone and Dinosaur.
      - This also means there is a main service `(EventService)` that controls the logic between Zone and Dino.
   
   - The best way of solving the problem was having an OOP approach that gives more structure and allows for a better workflow.
   - I used a Entity, Model, Service, Controller appoach:
      - `Entity`: Table in the DB
      - `Models`: Interface and Types used across the project
      - `Services`: The business Logic
      - `Controllers`: Directs API requests and responses


2. What you would do differently if you had to do it again?
   - I would add cron node to run a cron job that will fetch data from the NUDLs api every hour.
   - I would implement unit testing
   - I would create a class that implements the Error interface so that I can return better responses for both successful and non-successful status. 
   - I would have locked commonly used methods such as getLocationById.
   - I would added all logs to the database after sync

3. What you learned during the project?
   - I have learned to better handle race conditions which I faced in the `/events/sync` call that syncs the API Feed to the database. This is by using `Promise.race()` and also setting a `timeout` 

4. How you think we can improve this challenge:
   - I believe that the challenge can be improve by having the NUDls API have more data and more requirements can be added.
   
___

