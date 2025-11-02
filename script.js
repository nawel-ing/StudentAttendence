document.getElementById("btnrefresh").onclick = function() {
  let ligne = document.querySelectorAll("table tr");

  for (let i = 2; i < ligne.length; i++) {  // start at 2 to skip headers
    let abs = 0;
    let par = 0;
    let boxes = ligne[i].querySelectorAll("input[type=checkbox]");

    for (let j = 0; j < boxes.length; j += 2) {
      if (!boxes[j].checked) abs++;
    }

    for (let k = 1; k < boxes.length; k += 2){
      if(boxes[k].checked) par++;
    }
   
    ligne[i].cells[14].textContent = abs + " Abs";
    ligne[i].cells[15].textContent = par + "Par"
  

  if(abs < 3){
   ligne[i].style.backgroundColor = "lightgreen";
   
  }else if(abs >= 3 && abs <= 4) {
   ligne[i].style.backgroundColor = "yellow";
   
  } else {
    ligne[i].style.backgroundColor = "lightcoral";
    
  }
  let message = "";//creating a new variable named message and initializing it as an empty string
    if (abs < 3 && participation >= 3) {
      message = "Good attendance – Excellent participation";
    } else if (abs >= 3 && abs <= 4) {
      message = "Warning – attendance low – You need to participate more";
    } else if (abs >= 5) {
      message = "Excluded – too many absences – You need to participate more";
    } else {
      message = "Keep going – improve participation";
    }
    ligne[i].cells[16].textContent = message;
}
};