function checkOrder(available, ordered) {
    if (ordered > available) {
      return "Your order is too large, we don’t have enough goods.";
    } else if (ordered === 0) {
      return "Your order is empty.";
    } else {
      return "Your order is accepted.";
    }
  }
  const available1 = 10;
  const ordered1 = 15;
  console.log(checkOrder(available1, ordered1));
  
  const available2 = 0;
  const ordered2 = 0;
  console.log(checkOrder(available2, ordered2)); 
  const available3 = 10;
  const ordered3 = 10;
  console.log(checkOrder(available3, ordered3)); 
    