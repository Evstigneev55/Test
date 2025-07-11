import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";

import App from "./App.jsx";
import LoginPage from "./pages/Login";
import NavigationUi from "./pages/NavigationUi/index.jsx";
import LessonPage from "./pages/LessonPage";
import ToDoApp from "./pages/to-do/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<LoginPage />} />

        <Route path="to-do" element={<ToDoApp/>} />

        <Route path="lessons">
          <Route index element={<NavigationUi />} />
          <Route path=":lessonId" element={<LessonPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
