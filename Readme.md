# EVENTRA – Event Management System

EVENTRA is a responsive event management website that allows users to explore upcoming events, search and filter events by category, view event details, register for events, and contact the platform.

## Features

- Responsive homepage and navigation.
- Upcoming event listings.
- Search functionality.
- Category-based event filtering.
- Event details and registration forms.
- Contact form.
- Backend API integration.
- MongoDB database integration.
- Registration and contact message storage.

## Technologies Used

**Frontend:** HTML5, CSS3, JavaScript

**Backend:** Node.js, Express.js

**Database:** MongoDB Atlas, Mongoose

**Development Tools:** Visual Studio Code, Git, GitHub

## Project Structure

```text
EVENTRA/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
└── backend/
    ├── models/
    │   ├── Registration.js
    │   └── Message.js
    ├── server.js
    ├── package.json
    └── .env
```

## Installation and Setup

1. Clone the repository.
2. Install backend dependencies:

   `npm install`

3. Configure the `.env` file with your MongoDB connection string:

   `MONGO_URI=your_mongodb_connection_string`

   `PORT=5000`

4. Start the backend:

   `node server.js`

5. Start the frontend using a local development server.

6. Open the website in your browser.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend welcome message |
| GET | `/api/health` | Check backend status |
| POST | `/api/register` | Register for an event |
| GET | `/api/registrations` | Retrieve registrations |
| POST | `/api/contact` | Submit contact messages |

## Database

MongoDB stores:
- Event registrations.
- Contact form submissions.

## Author

Developed as a web development project.

## License

This project is intended for educational purposes.