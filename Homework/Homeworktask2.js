let standardGrade = 85;
function getPerformanceLevel(grade) {
  switch (true) {
    case grade < 60:
      return "Незадовільно";
    case grade >= 60 && grade <= 70:
      return "Задовільно";
    case grade >= 71 && grade <= 80:
      return "Добре";
    case grade >= 81 && grade <= 90:
      return "Дуже добре";
    case grade >= 91 && grade <= 100:
      return "Відмінно";
    default:
      return "Недійсна оцінка";
  }
}

console.log(getPerformanceLevel(standardGrade));
