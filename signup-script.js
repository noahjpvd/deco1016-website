// Sign up page script for implementing on-the-fly form validation
// (method from class)

// These are the constraints used to validate the form
var constraints = {

  email: {
    // Email is required
    presence: true,
    // and must be an email
    email: true
  },

  username: {
    // You need to pick a username too
    presence: true,
    // And it must be between 3 and 20 characters long
    length: {
      minimum: 3,
      maximum: 20
    },
    format: {
      // We don't allow anything that a-z and 0-9
      pattern: "[a-z0-9]+",
      // but we don't care if the username is uppercase or lowercase
      flags: "i",
      message: "can only contain a-z and 0-9"
    }
  },

  password: {
    // Password is also required
    presence: true,
    // And must be at least 5 characters long
    length: {
      minimum: 5
    }
  }

};

// Hook up the form so we can prevent it from being posted
var form = document.querySelector("form");
form.addEventListener("submit", function(ev) {
  ev.preventDefault();
  handleFormSubmit(form);
});

// Hook up the inputs to validate on the fly
var inputs = document.getElementsByClassName("signup-info");
console.log(inputs);
for (var i = 0; i < inputs.length; i++) {
  inputs.item(i).addEventListener("change", function(ev) {
    var errors = validate(form, constraints) || {};
    showErrorsForInput(this, errors[this.name])
  });
}

// Handle and update input counter in music preferences screen

// Get all music preference input elements
var musicPrefs = document.getElementsByClassName("music-pref");
// Get input counter element and set default to 0
var musicPrefsCounter = document.getElementById("mpref-counter");
var checkedPrefs = 0;

// Hook up music preference input elements to update musicPrefsCounter with number of checked checkbox inputs
for (var i = 0; i < musicPrefs.length; i++) {
  musicPrefs[i].addEventListener("click", function() {
    checkedPrefs = document.querySelectorAll('input[type="checkbox"]:checked').length;

    // Update text on page with number of selected inputs
    if (checkedPrefs == 0) {
      document.getElementById("mpref-counter").innerHTML = "Select your music preferences (Optional)";
    } else if (checkedPrefs == 1) {
      document.getElementById("mpref-counter").innerHTML = "1 Genre Selected";
    } else {
      document.getElementById("mpref-counter").innerHTML = checkedPrefs + " Genres Selected";
    }
  });
}

//
// Get carousel back element
var carouselPrev = document.getElementsByClassName("carousel-prev");
// Adding event listeners to carousel back element
carouselPrev[0].addEventListener("click", function() {
  // Move to previous slide on click
  glide.go("<");
});

function handleFormSubmit(form, input) {
  // validate the form against the constraints
  var errors = validate(form, constraints);
  // then we update the form to reflect the results
  showErrors(form, errors || {});
  // Automatically move to next slide if inputs are valid
  // or move to first slide if inputs are not invalid
  if (errors) {
    glide.go("<<");
  } else if (!errors) {
    glide.go(">");
  }
}

// Updates the inputs with the validation errors
function showErrors(form, errors) {
  // We loop through all the inputs and show the errors for that input
  form.querySelectorAll("input[name]").forEach(function(input) {
    // Since the errors can be null if no errors were found we need to handle
    // that
    showErrorsForInput(input, errors && errors[input.name]);
  });
}

// Shows the errors for a specific input
function showErrorsForInput(input, errors) {
  // This is the root of the input
  var formGroup = closestParent(input.parentNode, "form-group")
    // Find where the error messages will be insert into
    ,
    messages = formGroup.querySelector(".messages");
  // First we remove any old messages and resets the classes
  resetFormGroup(formGroup);
  // If we have errors
  if (errors) {
    // we first mark the group has having errors
    formGroup.classList.add("has-error");
    // then we append all the errors
    errors.forEach(function(error) {
      addError(messages, error);
    });
  } else {
    // otherwise we simply mark it as success
    formGroup.classList.add("has-success");
  }
}

// Recusively finds the closest parent that has the specified class
function closestParent(child, className) {
  if (!child || child == document) {
    return null;
  }
  if (child.classList.contains(className)) {
    return child;
  } else {
    return closestParent(child.parentNode, className);
  }
}

function resetFormGroup(formGroup) {
  // Remove the success and error classes
  formGroup.classList.remove("has-error");
  formGroup.classList.remove("has-success");
  // and remove any old messages
  formGroup.querySelectorAll(".help-block.error").forEach(function(el) {
    el.parentNode.removeChild(el);
  });
}

// Adds the specified error with the following markup
// <p class="help-block error">[message]</p>
function addError(messages, error) {
  var block = document.createElement("p");
  block.classList.add("help-block");
  block.classList.add("error");
  block.innerText = error;
  messages.appendChild(block);
}

// Function to move to next slide for continue button
function continueForm() {
  glide.go(">");
}
