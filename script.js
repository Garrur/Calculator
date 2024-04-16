document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("taxForm");
  const ageDropdown = document.getElementById("age");
  const errorAge = document.getElementById("errorAge");
  const modal = document.getElementById("modal");
  const resultDiv = document.getElementById("result");
  const closeBtn = document.querySelector("#modal .close");
  const popover = document.getElementById("grossIncome");

  // Function to handle form submission
  function submitHandler(event) {
      event.preventDefault();

      if (ageDropdown.value === "") {
          errorAge.style.display = "block";
      } else {
          errorAge.style.display = "none";
          calculateTax();
          modal.style.display = "block";
      }
  }

  // Event listener for form submission
  form.addEventListener("submit", submitHandler);

  // Event listener for close button inside modal
  if (closeBtn) {
      closeBtn.addEventListener("click", function () {
          modal.style.display = "none";
      });
  } else {
      console.error("Close button element not found!");
  }

  // Event listener for popovers
  if (popover) {
      popover.addEventListener("click", function () {
          $("#grossIncome").popover("show");
      });
  } else {
      console.error("Popover element not found!");
  }

  // Function to calculate tax
  function calculateTax() {
      const grossIncome = parseFloat(document.getElementById("grossIncome").value);
      const extraIncome = parseFloat(document.getElementById("extraIncome").value);
      const deductions = parseFloat(document.getElementById("deductions").value);
      const ageGroup = document.getElementById("age").value;
      let age;

      if (ageGroup === "<40") {
          age = 39;
      } else if (ageGroup === "≥40 & <60") {
          age = 50;
      } else if (ageGroup === "≥60") {
          age = 70;
      } else {
          age = 0;
      }


      const totalIncome = grossIncome + extraIncome - deductions;
      let tax = 0;

      if (totalIncome > 800000) {
          const taxableAmount = totalIncome - 800000;
          if (age < 40) {
              tax = 0.3 * taxableAmount;
          } else if (age >= 40 && age < 60) {
              tax = 0.4 * taxableAmount;
          } else {
              tax = 0.1 * taxableAmount;
          }
      }

      resultDiv.innerHTML = ` ₹ ${tax.toFixed(2)} Lakh`;
  }
});
