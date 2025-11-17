// exo 1
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
    if (abs < 3 && par >= 3) {
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

// exo 2/3
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const id = document.getElementById("idstudent");
  const lastname = document.getElementById("lastname");
  const firstname = document.getElementById("firstname");
  const email = document.getElementById("email");

  const idError = document.getElementById("idError");
  const lastnameError = document.getElementById("lastnameError");
  const firstnameError = document.getElementById("firstnameError");
  const emailError = document.getElementById("emailError");

    const table = document.querySelector("table");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop form submission
    let valid = true;

    // Reset all error messages
    idError.textContent = "";
    lastnameError.textContent = "";
    firstnameError.textContent = "";
    emailError.textContent = "";

    // Validate Student ID
    if (id.value.trim() === "") {
      idError.textContent = "Student ID is required.";
      valid = false;
    } else if (!/^[0-9]+$/.test(id.value)) {
      idError.textContent = "Student ID must contain only numbers.";
      valid = false;
    }

    // Validate Last Name
    if (lastname.value.trim() === "") {
      lastnameError.textContent = "Last name is required.";
      valid = false;
    } else if (!/^[A-Za-z]+$/.test(lastname.value)) {
      lastnameError.textContent = "Last name must contain only letters.";
      valid = false;
    }

    // Validate First Name
    if (firstname.value.trim() === "") {
      firstnameError.textContent = "First name is required.";
      valid = false;
    } else if (!/^[A-Za-z]+$/.test(firstname.value)) {
      firstnameError.textContent = "First name must contain only letters.";
      valid = false;
    }

    // Validate Email
    if (email.value.trim() === "") {
      emailError.textContent = "Email is required.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    // If all fields are valid, allow submission
    if (valid) {
      alert("Form submitted successfully!");
     // form.submit(); The student disappeared because form.submit() reloads the page, erasing the dynamically added row.

    }
    if (valid) {
      const newRow = table.insertRow(-1);

      newRow.insertCell(0).textContent = lastname.value;
      newRow.insertCell(1).textContent = firstname.value;

      for (let i = 0; i < 12; i++) {
        const cell = newRow.insertCell(i + 2);
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        cell.appendChild(checkbox);
      }

      newRow.insertCell(14).textContent = "0 Abs";
      newRow.insertCell(15).textContent = "0 Par";
      newRow.insertCell(16).textContent = "";

      // ✅ Alert popup after successful add
      alert("🎉 Student added successfully!");

      form.reset();
    }
  });
});

// exo 4
document.getElementById("showReport").addEventListener("click", function () {
    const rows = document.querySelectorAll("table tr");
    let total = 0;
    let present = 0;
    let participated = 0;

    rows.forEach((row, index) => {
        if (index < 2) return; // skip headers

        total++;

        const checkboxes = row.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach((cb, i) => {
            if (cb.checked) {
                if (i % 2 === 0) present++;
                else participated++;
            }
        });
    });

    document.getElementById("totalStudents").innerText = total;
    document.getElementById("presentCount").innerText = present;
    document.getElementById("participationCount").innerText = participated;

    // SHOW the section BEFORE drawing chart
    document.getElementById("reportSection").style.display = "block";

    // DRAW CHART
    const ctx = document.getElementById('attendanceChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Students', 'Present', 'Participation'],
            datasets: [{
                label: 'Attendance Summary',
                data: [total, present, participated],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ]
            }]
        }
    });
});



$(document).ready(function() {
    // 1. Highlight row on hover
    $("table tr").hover(
        function() { // mouse enters
            $(this).css("background-color", "lightgray");
        },
        function() { // mouse leaves
            $(this).css("background-color", "");
        }
    );

    // 2. Show student info on click
    $("table tr").click(function() {
        // Skip header rows
        if ($(this).index() < 2) return;

        let lastname = $(this).find("td:eq(0)").text();
        let firstname = $(this).find("td:eq(1)").text();
        let absences = $(this).find("td:eq(14)").text(); // column 15 = Absences

        alert(`Student: ${firstname} ${lastname}\nAbsences: ${absences}`);
    });
});

