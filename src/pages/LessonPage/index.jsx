import React from "react";
import { Navigate, useParams } from "react-router";

import Lesson_8 from "./components/8";
import Lesson_9 from "./components/9";
import Lesson_10 from "./components/10";
import Lesson_11 from "./components/11";
import Lesson_12 from "./components/12";

const LessonPage = () => {
  const { lessonId } = useParams();

  switch (lessonId) {
    case "8":
      return <Lesson_8 />;
    case "9":
      return <Lesson_9 />;
    case "10":
      return <Lesson_10 />;
      case "11":
        return <Lesson_11 />;
      case "12":
        return <Lesson_12 />;
    }

  return <Navigate to={"/404"} />;
};

export default LessonPage;
