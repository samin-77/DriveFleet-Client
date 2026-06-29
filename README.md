# DriveFleet - Car Rental Platform

## Features

- Browse and explore a wide range of available cars with detailed information including price, type, seating capacity, and location.
- Secure user authentication with JWT tokens stored in HTTPOnly cookies, supporting email/password and Google login.
- Full CRUD operations for car listings — users can add, update, and delete their own car listings with a confirmation modal.
- Integrated booking system with driver preference, special notes, and automatic booking count increment using MongoDB `$inc`.
- Search and filter functionality using MongoDB `$regex` for car names and category-based filtering by car type.
