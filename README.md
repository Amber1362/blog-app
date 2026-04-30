#  Blog App (Learning Project)

This is a full-stack blog application built using React, Redux Toolkit, React Router, and Appwrite as backend.

This project was built while following a tutorial, and then extended with my own improvements including custom date formatting, error handling, and debugging real-world API issues.


##  Features

- User authentication (Login / Signup / Logout)
- Create, edit, delete blog posts
- Dynamic routing using React Router
- Protected routes using Auth Layout
- Image upload support via Appwrite
- Responsive UI with reusable components
- Custom post date formatting:
  - Just now
  - Minutes / hours ago
  - Yesterday
  - Full date for older posts


## Intent

This project was built to understand how real-world React applications are structured, including folder organization, reusable component patterns, routing flow, and state management architecture.


##  My Learnings

Through this project, I learned:

- How React Router works with nested routes and dynamic params (`:slug`)
- How to manage global state using Redux Toolkit
- How authentication flow works in real applications
- How frontend connects with backend (Appwrite)
- How to debug real errors (401, 403, 400, etc.)
- How to work with JavaScript Date for relative time display


##  Challenges I Faced

- Handling authentication errors (401/403)
- Fixing API request issues
- Understanding route parameters using `useParams`
- Managing component structure (pages vs components)
- Debugging Git/GitHub setup issues
- Understanding React Hook Form and integrating third-party components like RTE editor
- Redux toolkit setup and understanding of concepts in it


##  Custom Improvements

Even though this was tutorial-based, I added:

- Custom date/time formatting system
- Better error handling understanding
- Improved debugging workflow
- GitHub workflow setup from scratch


##  Tech Stack

- React
- Redux Toolkit
- React Router
- Appwrite
- Tailwind CSS


##  Note

This project is part of my learning journey and will continue to evolve as I improve my skills.


##  Future Improvements

- Add search functionality
- Add categories/tags for posts
- Improve UI/UX design
- Add pagination
- Deploy live version