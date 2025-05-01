# Reservation App Fullstack

This is a full-stack reservation system built with Angular (frontend) and .NET 8 Web API (backend). Users can submit reservations, retrieve them by confirmation ID, and cancel them if needed.

---

## 🎯 Purpose

To practice full-stack development with:
- Angular + PrimeNG for frontend UI
- .NET 8 Web API + EF Core for backend logic
- SQL Server for database
- Full CRUD functionality
- CORS-secured HTTP communication

---

## 🧩 Tech Stack

- **Frontend:** Angular 16, PrimeNG, TypeScript
- **Backend:** .NET 8 Web API, Entity Framework Core
- **Database:** SQL Server
- **Communication:** REST APIs (HttpClient)

---

## 🚀 Features

- Make a reservation with name, date, reason, phone
- Step-by-step reservation flow using PrimeNG Stepper
- Get reservation by 4-digit confirmation ID
- Cancel reservation from frontend
- Backend handles conflicts (1 reservation per day)

---


## ⚙️ How to Run

### 🔧 Backend

```bash
cd ReservationAPI
dotnet restore
dotnet ef database update
dotnet run

### 🔧 Frontend

```bash
cd ReservationFront
npm install
ng serve



#Notes
*appsettings.json and Development.json are ignored via .gitignore

*CORS is allowed for http://localhost:4200 in backend
