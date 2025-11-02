document.getElementById("btnrefresh").onclick = function(){

  let ligne = document.querySelectorAll(".table tr");
  
  for(let i = 2; i < ligne.length; i++){
    let abs = 0;
    let par = 0;
    let check = document.querySelectorAll("input[type=checkbox]");

    for(j=0; j < check.length; j += 2){
      if(!check[j].checked) abs++;
    }
    for(k = 1; k < check.length; k+=2){
      if(check[k].checked) par++;
    }

    ligne[i].cells[14].textContent = abs + "Abs";
    ligne[i].cells[15].textContent = par + "Par";
  }


};