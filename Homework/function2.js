function isAdult(age) {
    return age >= 18;
  }
  
  const age1 = 25;
  const age2 = 15;

  const result1 = isAdult(age1);
  const result2 = isAdult(age2);
  
  console.log("Age:", age1, "Is adult:", result1); 
  console.log("Age:", age2, "Is adult:", result2);
  