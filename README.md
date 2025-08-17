# 📝 Blog Website – Full Stack Assignment
<br>

This is a full-stack blog editing and publishing platform built with **Next.js + TypeScript** and **MongoDB (Atlas)**. It includes rich features like **auto-save drafts**, **authentication**, **blog filtering**, and more.

🌐 **Live Site**: [https://blogs.hirebie.com](https://blogs.hirebie.com)

📦 **GitHub Repo**: [github.com/Amit7976/blog-website-next-app](https://github.com/Amit7976/blog-website-next-app)

<br>

---
<br>


## 🧪 Testing Credentials 

|User | Email             | Password                   |
|-----| ---------------- | ---------- |
|User1|testuser1@test.com | 000000000 |
|User2|testuser2@test.com | 123456789 |
|User3|testuser3@test.com | asdfghjkl |


<br>


---

<br>


## 📚 Features

* 🛠️ Blog editor with rich text support (Tiptap)
* 🧠 Auto-save:

  * Every 30 seconds continuously
  * After 5 seconds of user inactivity (debounced)
* 📝 Create, edit, delete, filter, and publish blog posts
* 🔐 Auth with NextAuth (Email/Password)
* 🧾 Draft & Published separation with filtering and search
* 📁 Image upload and preview
* 🔎 Related and latest blogs suggestion
* 📱 Responsive Design (Mobile, Tab, PC)
* 🌙 Dark Mode available 
* 📌 Category-based blog exploration
* 📤 Axios used for all API communication

<br>

---

<br>


## 🧰 Tech Stack

### **Frontend:**

* [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/)
* [ShadCN UI](https://ui.shadcn.com/) for modern UI components
* [Tiptap Editor](https://tiptap.dev/) for rich text editing
* [Axios](https://axios-http.com/) for API requests
* [Lodash](https://lodash.com/) for debouncing
* [React Icons](https://react-icons.github.io/react-icons/) for iconography

### **Backend & Auth:**

* [MongoDB Atlas](https://www.mongodb.com/atlas/database)
* [Mongoose](https://mongoosejs.com/) for schema modeling
* [NextAuth.js](https://next-auth.js.org/) for authentication
* [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing

<br>

---

<br>

## 🔐 Environment Variables

```env
MONGO_URI = mongodb+srv://guptaamit60600:lierCMsZavbqwhSk@blogapp.nmvlseu.mongodb.net/

NEXTAUTH_SECRET = TZCirIwhcGAFtoPA658k6A+ygC2N4cCzY33Exog0rnM=
```

<br>

---

<br>

## 🔌 API Endpoints

| Method | Endpoint                   | Description                   |
| ------ | -------------------------- | ----------------------------- |
| GET    | `/api/auth/[...nextauth]`  | Auth routes via NextAuth      |
| GET    | `/api/blogs/blogs`         | Retrieve all blogs for dashboard           |
| POST   | `/api/blogs/blogs`         | Create a blog                 |
| PUT    | `/api/blogs/blogs`         | Update a blog                 |
| DELETE | `/api/blogs/blogs`         | Delete a blog                 |
| GET    | `/api/blogs/category`      | Fetch all blog categories     |
| GET    | `/api/blogs/fetchAllBlogs` | Fetch all blogs |
| GET    | `/api/blogs/latestBlogs`   | Get latest blogs              |
| GET    | `/api/blogs/relatedBlogs`  | Get related blogs             |

<br>

---

<br>

## 🚀 User Flow

1. **Home Page** – Browse blogs by category or explore latest/related posts.
2. **Authentication** – Login/Register via dedicated pages using NextAuth.
3. **Dashboard** – View user’s own blogs (drafts + published), filter, search, delete.
4. **Add Blog Page** – Starts with auto-creating a new blog with blank data.

   * Auto-saves every 30 sec
   * Debounced save after 5 sec of inactivity
5. **Edit Blog Page** – Edit existing blog with the same auto-save/debounce logic.
6. **Logout** – Securely log out of the session.

<br>

---

<br>

## ✅ Assignment Requirements Coverage

| Requirement                      | Status    |
| -------------------------------- | --------- |
| Blog editor with rich text       | ✅         |
| Save as draft & publish buttons  | ✅         |
| Auto-save every 30s              | ✅         |
| Auto-save after 5s inactivity    | ✅         |
| Edit/update existing posts       | ✅         |
| Display drafts & published blogs | ✅         |
| Clean backend APIs               | ✅         |
| MongoDB schema                   | ✅         |
| Authentication (NextAuth)        | ✅ (Bonus) |
| Visual toast on save (optional)  | ✅         |

<br>

---

<br>

## 🗺 System Architecture Diagram

This is **system architecture diagram** of this Blog Website

```
[ User (Browser) ]
        |
        |  (1) Interacts via UI (Next.js + ShadCN)
        v
[ Frontend (Next.js + TypeScript) ]
        |
        |  (2) API Requests using Axios
        v
[ API Routes (Next.js Server Functions) ]
        |
        |  (3) Handles Auth, CRUD, Draft Save, etc.
        v
[ Backend (MongoDB via Mongoose) ]
        |
        |  (4) Stores Blog, User, and Auth Data
        v
[ MongoDB Atlas (Database) ]
```

<br>

---

<br>

## 📂 Folder Structure (Simplified)

```
/app
  /api
    /blogs        → Backend logic for blog operations
    /auth         → NextAuth configuration
  /dashboard      → User dashboard page
  /blogs
    /add_blog     → New blog creation page
    /edit/[id]    → Blog edit page
/components       → Reusable UI components
/lib              → Helpers, DB connection, auth utilities
/models           → Mongoose models
```

<br>

---

<br>

## 🧠 Challenges Faced

- Implementing auto-save with both 30s intervals and 5s debouncing required a careful balance of timers and user input tracking.
- Managing rich text editor data (Tiptap) and storing structured JSON in MongoDB.
- Ensuring clean separation between drafts and published posts.
- Securing API routes using NextAuth session management.

<br>

---

<br>

## 📷 Screenshots

<p align="center">
  <img src="./public/images/showcase/Screenshot (85).png" width="600" alt="Blog Post"/>
  <br/>
  <em>Read a Blog Post</em>
</p>

<p align="center">
  <img src="./public/images/showcase/Screenshot (84).png" width="600" alt="DashBoard Image"/>
  <br/>
  <em>Editor Page with Tiptap Rich Text editor</em>
</p>

<br>

---

## Working Demo

<br>

🎬 [Click here to watch the demo video](https://drive.google.com/file/d/1k1lxtjuS9NQdpF84AT2NlnQdSFq3y8-T/view?usp=sharing)

<br>

---

<br>

## 🧪 Local Setup Instructions

```bash
git clone https://github.com/Amit7976/blog-website-next-app.git
cd blog-website-next-app
npm install
# Add your .env file with the variables mentioned above
npm run dev
```

<br>

---

<br>

## 🚀 Future Improvements

- Add image upload to cloud (e.g., Cloudinary) for richer blog content
- Add comments and likes system
- Enable markdown support as alternative to Tiptap
- Add pagination and infinite scroll to blog list

<br>

---

<br>

## 📬 Contact

For any queries or issues:
📧 [guptaamit60600@gmail.com](mailto:guptaamit60600@gmail.com)
