const form = document.getElementById("form");
const span = document.querySelectorAll("span")

console.log(form.elements);


const date = new Date(); // Today's date
const formData = {};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  // Loop through all elements in the form
  Array.from(form.elements).forEach((element) => {
    // Only consider inputs, selects, and textareas
    if (
      element.tagName === "INPUT" ||
      element.tagName === "SELECT" ||
      element.tagName === "TEXTAREA"
    ) {
      formData[element.name] = element.value; // Get the value and assign it to the corresponding key
    }
  });

  // Validate the day input
  if (!formData.day || formData.day < 1 || formData.day > 31) {
    addErrorClass(form, "day");
    isValid = false;
  } else {
    removeErrorClass(form, "day");
  }

  // Validate the month input
  if (!formData.month || formData.month < 1 || formData.month > 12) {
    addErrorClass(form, "month");
    isValid = false;
  } else {
    removeErrorClass(form, "month");
  }

  // Validate the year input
  if (
    !formData.year ||
    formData.year.length !== 4 ||
    formData.year > date.getFullYear()
  ) {
    addErrorClass(form, "year");
    isValid = false;
  } else {
    removeErrorClass(form, "year");
  }

  // Additional check for valid date
  if (!isValidDate(formData.day, formData.month, formData.year)) {
    addErrorClass(form, "day");
    addErrorClass(form, "month");
    isValid = false;
  } else {
    removeErrorClass(form, "day");
    removeErrorClass(form, "month");
  }

  if (isValid) {
    // Create a birthDate object from input values
    const birthDate = new Date(formData.year, formData.month - 1, formData.day);

    // Calculate the age difference
    const age = calculateAge(birthDate, date);

    // console.log({
    //   birthDate: birthDate.toDateString(),
    //   todayDate: date.toDateString(),
    //   age: age,
    // });

    span.forEach(child =>{
        // if(child.children === years)
        const className = child.className
        child.innerText = age[className]
    })
  }
});

// Function to check if a date is valid
function isValidDate(day, month, year) {
  // Convert to numbers
  day = parseInt(day, 10);
  month = parseInt(month, 10);
  year = parseInt(year, 10);

  // Check for months with 30 days
  if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) {
    return false;
  }

  // Check for February
  if (month === 2) {
    // Leap year check
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    if (isLeapYear && day > 29) {
      return false;
    } else if (!isLeapYear && day > 28) {
      return false;
    }
  }

  // If all checks pass, the date is valid
  return true;
}

// Function to calculate age difference in years, months, and days
function calculateAge(birthDate, todayDate) {
  let years = todayDate.getFullYear() - birthDate.getFullYear();
  let months = todayDate.getMonth() - birthDate.getMonth();
  let days = todayDate.getDate() - birthDate.getDate();

  // Adjust months and years if necessary
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    const lastMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 0);
    days += lastMonth.getDate();
    months--;
  }

  return { years: years, months: months, days: days };
}

// Function to add error class
function addErrorClass(form, inputName) {
  Array.from(form.elements).forEach((element) => {
    if (element.name === inputName) {
      element.classList.add("error");
    }
  });
}

// Function to remove error class
function removeErrorClass(form, inputName) {
  Array.from(form.elements).forEach((element) => {
    if (element.name === inputName) {
      element.classList.remove("error");
    }
  });
}
