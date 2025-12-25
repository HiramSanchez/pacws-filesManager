#  **File Manager (pacws-filesManager)**

[![React](https://img.shields.io/badge/React-18-skyblue)]()
 &emsp;
[![NodeJs](https://img.shields.io/badge/NodeJs-20.19.5-lightgreen)]()
 &emsp;
[![Vite](https://img.shields.io/badge/Vite-5.0.12-gold)]()  
## 📁 **Description**
A multimedia file manager built with **React + Vite**, designed to browse, filter, and organize photos and videos.  
The project includes a dynamic **category system from MongoDB**, a sidebar with filters, hashtag-based searching, and a clean UI powered by Material UI.

## 📂 Table of Contents  
- [Tech Stack](#tech-stack)  
- [Features](#features)  
- [Backend Context](#backend-overview)  
- [Setup](#setup)
- [Contact](#contact)


## **Tech Stack**

- **Vite** – Fast development bundler  
- **React 18** – UI  
- **MongoDB** – Backend - Provides categories  
- **JavaScript (ES2022+)**
- **NodeJS**


## **Features**

### 🔍 File Explorer
- Displays photos and videos.
- Responsive Material UI layout.

### 🏷️ Category System
- Categories are fetched from a MongoDB collection.
- Rendered as checkbox filters.

## **Backend Overview**

🔌 This frontend connects to a backend that:
- Uses MongoDB.
- Provides categories, names, and file metadata.
- Supports dynamic queries and filtered results.

## **Setup**
1. Clone the repo
```bash
git clone https://github.com/your-user/your-repo.git
```

2. Install dependencies
```bash
npm install
```

3. Run the project
- backend first
```bash
../backend> node server.js
```
- frontend after
```bash
../frontend> npm run dev
```

## **Contact**
For any questions or suggestions, feel free to contact me at:  
hiramsanchez.dev@gmail.com  
