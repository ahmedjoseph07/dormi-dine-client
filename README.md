# 🍽️Meal Management System (DormiDine)

A full-featured **Hostel Meal Management System** for university use, built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This system helps administrators efficiently manage student meals, meal requests, food reviews, and student information while providing students with a platform to explore meals, leave feedback, and upgrade their experience via premium memberships.

## 🌐 Live Site

- 👉 Frontend URL: [https://dormi-dine.web.app](https://dormi-dine.web.app)
- 👉 Server URL: [https://dormi-dine-server.vercel.app/](https://dormi-dine-server.vercel.app/)

---

## 🚀 Features

- 🔐 **Student Authentication** (Login/Register with Social Auth)
- 🏠 **Home Page** with tab-based meal categories and search.
- 🍽️ **Meals Page** with advanced filtering, search.
- 📅 **Upcoming Meals** page visible to all, likeable only by premium users
- 📦 **Membership Packages** (Silver, Gold, Platinum) with Stripe integration
- ✍️ **Meal Reviews & Ratings** system with edit/delete
- 🔁 **Persistent Login** using secure firebase JWT tokens.
- 📋 **User Dashboard** with profile, reviews, meal requests, and payment history
- 🛠️ **Admin Dashboard** with user management, meals control, review moderation, and upcoming meal publishing
- 📦 **Environment Security** with hidden `.env.local` credentials using environment variables
- 📱 **Responsive UI** for mobile, tablet, and desktop views
- 🔔 **Real-time Feedback** using sweet alerts and toasts (no browser alerts)
- 🚀 **Efficient Data Fetching** via TanStack Query (for all GET,POST,DELETE,PUT,PATCH operations)

---

## 📄 Pages and Components

### 1. 🏠 Home Page
- Navbar with logo, meal nav links, notification icon, and profile dropdown
- Banner with search field
- Meal Tabs: Breakfast, Lunch, Dinner, All Meals
- Membership Upgrade Cards: Silver, Gold, Platinum
- Footer with relevant links and contact info

### 2. 🍽️ Meal Detail Page
- Meal details: image, distributor, rating, ingredients, reviews, like & request buttons
- Likes and meal requests require user login
- Review posting and viewing functionality

### 3. 🍴 Meals Page
- Search meals by name
- Filter by category & price (server-side)

### 4. 🔜 Upcoming Meals
- Visible to all, but only premium users can like
- Sorted by likes, publish button available to admins

### 5. 💳 Checkout Page
- Private route for purchasing packages
- Stripe integration for secure payments
- Success modal with badge assignment

### 6. 👥 Join Us Page (Login/Register)
- React Hook Form for validation
- Social login options
- Default badge: FREE

### 7. 👤 User Dashboard
- Profile info and badges
- Requested meals with cancel option
- My Reviews table (edit/delete/view)
- Payment History

### 8. 🛠️ Admin Dashboard
- Admin profile info
- Manage Users (make admin, filter by name/email)
- Add Meal (form with image upload via Cloudinary)
- All Meals table with server-side sorting
- All Reviews table
- Serve Requested Meals with status change
- Manage and Publish Upcoming Meals

---

## ⚙️ Technologies Used

- **Frontend:** React.js, React Router, React Hook Form, TanStack Query, SweetAlert2
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Default Driver)
- **Authentication:** Firebase Authentication & Social Login(Google)
- **Payments:** Stripe
- **Image Upload:** Cloudinary
- **Styling:** Tailwind CSS / Daisy UI
- **State Management:** React Context API
- **Data Fetching:** TanStack Query ((Used in all methods for better caching)

---


## 🛡️ Environment Variables
Create a `.env.local` file in the root of your project and add the following variables. These are required for Firebase authentication, Cloudinary image uploads, and Stripe payments in the DormiDine app.

```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id

VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 🚀 Getting Started
Follow these steps to run the DormiDine locally.

### 1. Clone the repository:

```
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
``` 

### 2. Install dependencies: 

```
npm install
```

### 3. Set up your .env file with appropriate values.
```js
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id

VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 4. Start the development server:
```
npm run dev
```

## 🧪 Testing & Deployment

- ✅ Client and server have been tested locally during development
- 🚀 **Frontend deployed on [Firebase Hosting](https://firebase.google.com/products/hosting)**
- 🛠️ **Backend deployed on [Vercel](https://vercel.com/)**
- ☁️ **MongoDB Atlas** is used for remote cloud-based database hosting

---

## 📬 Contact
For any queries or support, reach out via:

📧 Email: `ahmedjoseph11@gmail.com`

Made with ❤️ by `JOSEPH AHMED` for comfort and efficient meal management in hostel.