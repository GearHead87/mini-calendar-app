# 📅 Dynamic Event Calendar Application

A modern and interactive event calendar application built with **React.js** and **TypeScript**. This application allows users to manage events seamlessly with features such as adding, editing, and deleting events, along with bonus functionalities like drag-and-drop rescheduling and event export.

---

## 🚀 Live Demo

Check out the live version of the app here:

[**Live Deployment Link**](#) *(Replace with actual deployment link)*

## 📂 Project Structure

```
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── calendar.png
│   ├── components/
│   │   ├── ui/ (shadCN UI Components)
│   │   ├── Calendar.tsx
│   │   ├── Day.tsx
│   │   ├── EventForm.tsx
│   │   └── EventList.tsx
│   ├── hooks/
│   │   └── useCalendar.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── types/
│   │   └── calendar.ts
│   ├── utils/
│   │   └── dateUtils.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
├── index.html
```

## 🎯 Features

### 🔹 Core Features

1. **Calendar View**
   - Displays a grid for the current month with days properly aligned.
   - Navigate between months using "Previous" and "Next" buttons.

2. **Event Management**
   - Add events by clicking on a day.
   - Edit or delete events for a selected day.
   - Each event includes:
     - Event name
     - Start time and end time
     - Optional description

3. **Event List**
   - View a list of all events for a selected day in a modal or side panel.

4. **Data Persistence**
   - Events are saved in **localStorage**, ensuring data is retained between page refreshes.

### 🔹 Complex Logic

- Automatic handling of month transitions (e.g., from Jan 31 to Feb 1).
- Prevents overlapping events by validating time conflicts.
- Filter events by keywords.

### 🔹 Bonus Features

- **Drag-and-Drop**: Reschedule events between days via drag-and-drop.
- **Color Coding**: Differentiate events by categories (e.g., work, personal, others).
- **Export Events**: Export event lists as **JSON** or **CSV** files for a specific month.

## 🛠️ Tech Stack

- **React.js** (with functional components and hooks)
- **TypeScript** for type safety
- **shadcn** for modern UI components
- **Zod** for schema validation
- **React Hook Form** for form handling
- **localStorage** for data persistence

## 📝 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/dynamic-event-calendar.git
   cd dynamic-event-calendar
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the application**

   ```bash
   npm run dev
   ```

   The app will be live at `http://localhost:5173`.

4. **Build for production**

   ```bash
   npm run build
   ```

## 📦 Deployment

The project can be deployed on platforms like **Vercel** or **Netlify**. Ensure the build folder is deployed correctly.

Example for deploying on Vercel:

```bash
vercel deploy
```

## 🔧 Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the app for production.
- **`npm run lint`**: Lints the code.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 🤝 Acknowledgments

- **shadcn** for the beautiful UI components.
- **React Hook Form** and **Zod** for form handling and validation.

## 🌐 Connect

- **GitHub**: [Github](https://github.com/gearHead87/)
- **LinkedIn**: [Hosan Ul Islam](https://www.linkedin.com/in/hosan-ul-islam)

---

Made with ❤️ by **Hosan Ul Islam**.
