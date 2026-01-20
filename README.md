# React + Vite

# Client side vercel deploy-----------------------------

2. https://smart-deals-server-10.vercel.app/latest-products

# Server side vercel deploy ----------------------------------

--- https://smart-deals-server-10.vercel.app/latest-products

## Project Overview

Project Name: Food Share
Theme: Community Food Sharing

PlateFood Share  is a full-stack MERN (MongoDB, Express.js, React, Node.js) application where users can share their surplus food with the community. The main goal is to reduce food waste and help people in need.

Users can:
Post food items they want to donate

Browse and request food posted by others

Main Rules

GitHub Commits:

Client side: At least 15 notable commits

Server side: At least 8 notable commits

Readme.md:

Must include the website name and live site URL

At least 5 bullet points to highlight the features

UI/UX and Error Handling:

No Lorem Ipsum text

No default alerts; use toast or custom notifications for errors/success messages

Hosting:

Client: Netlify, Surge, Firebase

Server: Vercel

Ensure SPA behavior (no errors on page reload)

Add deployed domain to Firebase authorization if using Netlify/Surge

Logged-in users should not be redirected to Login on private route reload

Main Requirements
## 1️⃣ Layout Structure

Navbar:

Not logged in: Logo, Home, Available Foods, Login

Logged in: Logo, Home, Available Foods, User Profile Dropdown, Add Food, Manage My Foods, My Food Requests, Logout

Footer:

Logo, Copyright, Social Media Links

## 2️⃣ Home Page

Banner/Hero Section:

Attractive title, short description, and “Search Food” or “View All Foods” button

Dynamic Section (Featured Foods):

Display 6 foods with the highest quantity from the database

Each card: View Details button

Show All Button:

Navigates to Available Foods page

Two Static Sections:

Example: “How It Works” (3-step process: Post Food → Find Food → Collect Food)

“Our Mission” or “Community Stats”

## 3️⃣ Authentication (Firebase)

Registration Page:

Fields: Name, Email, Photo URL, Password

Password validation: Uppercase, Lowercase, Minimum 6 characters

Success toast + redirect to Home

Error toast on failure

Google login option

Link to Login page

Login Page:

Fields: Email, Password

Success redirect

Error toast on failure

Google login option

Link to Register page

Note: Forget password/email verification is optional

## 4️⃣ CRUD Operations (Food Management)

Add Food (Create – Private Route):

Form fields: Food Name, Food Image (imgbb), Quantity, Pickup Location, Expire Date, Additional Notes

Auto-fill Donator info from logged-in user

Default food_status: Available

Submission saves to MongoDB + success toast

Available Foods (Read – Public Route):

Display all foods with status “Available”

Card grid (2-3 columns)

Each card shows: Image, Name, Donator Name & Image, Quantity, Pickup Location, Expire Date

View Details button (redirect to login if not logged in)

Food Details (Read – Private Route):

Route: /food/:id

Show all details including Donator Info & Notes

Request Food button

Manage My Foods (Update/Delete – Private Route):

Display only foods added by the logged-in user

Update: Pre-filled form → submit → update MongoDB

Delete: Confirmation prompt (SweetAlert) → delete MongoDB document

## 5️⃣ Other Requirements
Loading spinner or skeleton loader while fetching data
404 Error Page with image/GIF + Back to Home button