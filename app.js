const labelError = document.querySelectorAll('.error-label')
const borderError = document.querySelectorAll('.the-border')

function calculateAge() {
  // Get the inputs
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");

  // Get the error elements
  const dayError = document.getElementById("day-error");
  const monthError = document.getElementById("month-error");
  const yearError = document.getElementById("year-error");

  // Clear previous error messages
  dayError.textContent = "";
  monthError.textContent = "";
  yearError.textContent = "";

  labelError.forEach((label) => {
    label.classList.remove("error");
  });

  borderError.forEach((border) => {
    border.classList.remove("border-error");
  });

  // Parse input values
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  // Input validation
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    // Handle missing fields
    if (isNaN(day)) {
      dayError.textContent = "This field is required";
    }
    if (isNaN(month)) {
      monthError.textContent = "This field is required";
    }
    if (isNaN(year)) {
      yearError.textContent = "This field is required";
    }

    labelError.forEach((label) => {
      label.classList.add("error");
    });

    borderError.forEach((border) => {
      border.classList.add("border-error");
    });
  } else if (
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year < 1700 ||
    year > new Date().getFullYear()
  ) {
    // Handle invalid day, month, or year
    if (day < 1 || day > 31) {
      dayError.textContent = "Invalid day.";
    }
    if (month < 1 || month > 12) {
      monthError.textContent = "Invalid Month.";
    }
    if (year < 1700 || year > new Date().getFullYear()) {
      yearError.textContent = "Invalid Year.";
    }

    labelError.forEach((label) => {
      label.classList.add("error");
    });

    borderError.forEach((border) => {
      border.classList.add("border-error");
    });
  } else {
    // Check for February 29 in a non-leap year
    if ((month === 2 && day > 29) ||
    (month === 2 && day > 28 && !isLeapYear(year))){
      dayError.textContent = "Not valid in a non-leap year.";
      labelError.forEach((label) => {
        label.classList.add("error");
      });
      borderError.forEach((border) => {
        border.classList.add("border-error");
      });
    } else {
      const dateOfBirth = new Date(year, month - 1, day);
      const currentDate = new Date();
      const difference = currentDate - dateOfBirth;

      let ageInYears = currentDate.getFullYear() - dateOfBirth.getFullYear();
      let months = currentDate.getMonth() - dateOfBirth.getMonth();
      if (months < 0) {
        ageInYears--;
        months += 12;
      }

      let days = currentDate.getDate() - dateOfBirth.getDate();
      if (days < 0) {
        months--;
        days += new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        ).getDate();
      }
      // Display the age
      document.getElementById("years").textContent = ageInYears;
      document.getElementById("months").textContent = months;
      document.getElementById("days").textContent = days;
    }
  }
}

// Function to check if a year is a leap year
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
