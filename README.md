# 📌 **Hubly CRM – Backend API**

Node.js + Express + MongoDB backend powering the Hubly CRM system.
Includes ticketing, messaging (live chat), user management, and admin communication APIs.

---

## 🚀 **Tech Stack**

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **CORS**
* **dotenv**
* **Nodemon** (dev)

---

## 📁 **Project Structure**

```
backend/
│── config/
│     ├──db.js
│
│── models/
│     ├── Ticket.js
│     ├── Message.js
│     ├── User.js
│     └── Setting.js
│
│── routes/
│     ├── ticketRoutes.js
│     ├── messageRoutes.js
│     ├── userRoutes.js
│     ├── analyticsRoutes.js
│     └── authRoutes.js
│── server.js
│── package.json
├── package-lock.json
│── .env
├── .gitignore
│── README.md
```

---

## ⚙️ **Installation & Setup**

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Create your `.env` file

```
PORT=5000
MONGO_URI=Your Mongo string
```

### 3️⃣ Start the development server

```bash
npm run dev
```

Or for production:

```bash
npm start
```

---

## 🔌 **API Endpoints**

### 🟦 Ticket Routes (`/api/tickets`)

| Method | Endpoint                 | Description                     |
| ------ | ------------------------ | ------------------------------- |
| POST   | `/api/tickets`           | Create a new ticket             |
| GET    | `/api/tickets`           | Fetch all tickets               |
| GET    | `/api/tickets/:ticketId` | Fetch a single ticket           |
| PUT    | `/api/tickets/:ticketId` | Update (assign / change status) |

---

### 🟩 Message Routes (`/api/messages`)

| Method | Endpoint                  | Description                    |
| ------ | ------------------------- | ------------------------------ |
| GET    | `/api/messages/:ticketId` | Get all messages for a ticket  |
| POST   | `/api/messages`           | Add a new message (user/agent) |

---

## 🧩 **Models Overview**

### 🎟️ **Ticket Model**

```
ticketId: String
user: {
   name, email, phone
}
assignedTo: ObjectId (User)
status: open | in_progress | resolved
timestamps: true
```

### 💬 **Message Model**

```
ticketId: String
from: user | agent
text: String
timestamp: Date
timestamps: true
```

---

## 💬 **Live Chat Workflow**

### **User Widget (Frontend)**

1. User opens website → widget loads
2. User submits intro form → backend creates **ticket**
3. User sends message → stored in **Message** collection
4. Admin Dashboard sees the same chat
5. Both sides exchange messages via API (or WebSockets if enabled)

---

## 🔒 **Security Notes**

* Use environment variables for production keys
* Enable CORS rules based on deployment
* Validate incoming data before accepting messages

---

## 🚀 **Upcoming Enhancements (Optional)**

* WebSocket real-time chat
* Message read receipts (“✓ Delivered”)
* Email notifications for new tickets
* Admin authentication with JWT

---

## 🤝 **Contributing**

Pull requests are welcome.
Make sure your code follows the project structure and passes linting.

---

## 📄 **License**

MIT © 2025 Hubly CRM

