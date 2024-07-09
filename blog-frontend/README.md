# Blog Frontend

This is the frontend application for the blog platform. It allows users to create, edit, delete, and view blog posts. The application is built with React, Chakra UI for styling, and React Router for navigation. The rich text editor is implemented using ReactQuill.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/blog-frontend.git
   cd blog-frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

## Usage

1. Start the development server:

   ```sh
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Features

- **Authentication**: Users can log in and log out.
- **CRUD Operations**: Users can create, read, update, and delete blog posts.
- **Rich Text Editor**: Blog posts can be written using a rich text editor.
- **Responsive Design**: The application is responsive and works on various devices.

## Project Structure

```plaintext
.
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── apiClient.ts
│   ├── App.tsx
│   ├── components
│   │   ├── RichTextEditor.tsx
│   │   └── ...
│   ├── context
│   │   └── AuthContext.tsx
│   ├── hooks
│   │   ├── useFetchAllPosts.ts
│   │   └── useFetchPost.ts
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── EditPostPage.tsx
│   │   └── ...
│   ├── index.tsx
│   └── ...
└── package.json
```
