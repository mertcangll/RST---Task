CRUD Project with .NET and React

This project is a CRUD (Create, Read, Update, Delete) application built using .NET for the backend and React for the frontend. The project demonstrates how to connect a React frontend with a .NET Core backend API, using Axios for HTTP requests, Redux Toolkit for state management, and Entity Framework Core for database management.

Technologies Used

Frontend:

* React: A JavaScript library for building user interfaces.
* Axios: Promise-based HTTP client for the browser and Node.js.
* React Redux: A predictable state container for JavaScript apps.
* Redux Toolkit: Official, opinionated, batteries-included toolset for efficient Redux development.
* React Icons: A library for including various icons in React projects.

Backend:

* .NET 6/7: A free, cross-platform framework for building modern, cloud-based, and internet-connected applications.
* Swashbuckle.AspNetCore: A tool for generating Swagger documentation for .NET APIs.
* Entity Framework Core: A lightweight, extensible, and cross-platform version of the popular Entity Framework data access technology.
* SQLite: A relational database management system used in this project for storing data.

Features:

Create, Read, Update, Delete (CRUD) Operations for managing tasks.
Task List: Displays all tasks with the ability to filter by completion status.
Add Task: Users can add new tasks to the list.
Edit Task: Users can edit existing tasks.
Delete Task: Users can delete tasks from the list.
Toggle Task Completion: Mark tasks as completed or incomplete.


Setup Instructions

git clone https://mertcangll/RST--Task.git
cd TaskApi

Restore the dependencies:

dotnet restore
Update the appsettings.json file for your database connection (SQLite in this case).

Run the database migrations:

dotnet ef database update

Start the backend API:

dotnet run

The API will be running on http://localhost:5201.

Frontend (React) Setup:
Clone the frontend repository:


npm install
Start the React app:


npm start

API Endpoints
GET /api/tasks: Retrieve all tasks.
GET /api/tasks/{id}: Retrieve a specific task by ID.
POST /api/tasks: Create a new task.
PUT /api/tasks/{id}: Update an existing task.
DELETE /api/tasks/{id}: Delete a task by ID.
CORS Configuration
Ensure that the .NET API has CORS enabled to allow requests from the React app. The CORS configuration can be found in the Program.cs file.

Swagger Documentation
Once the API is running, visit http://localhost:5201/swagger to view the auto-generated Swagger documentation.

How to Use

Open the React frontend in the browser.
Add, edit, or delete tasks using the provided UI.
Filter tasks based on completion status or search for specific tasks.

Contributing

Fork the repository.
Create a new branch (git checkout -b feature-name).
Make your changes and commit (git commit -am 'Add new feature').
Push to the branch (git push origin feature-name).
Create a new Pull Request.

License
This project is licensed under the MIT License - see the LICENSE file for details.
