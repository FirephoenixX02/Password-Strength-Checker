const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password-input");
const reasonsContainer = document.getElementById("reasons");

passwordInput.addEventListener("input", updateStrengthMeter);
updateStrengthMeter();

function updateStrengthMeter() {
  const weaknesses = calculatePasswordStrength(passwordInput.value);
  let strength = 100;
  reasonsContainer.innerHTML = "";
  weaknesses.forEach((weakness) => {
    if (weakness == null) return;
    strength -= weakness.deduction;
    const messageElement = document.createElement("div");
    messageElement.innerText = weakness.message;
    reasonsContainer.appendChild(messageElement);
  });
  strengthMeter.style.setProperty("--strength", strength);
}

function calculatePasswordStrength(password) {
  const weaknesses = [];
  weaknesses.push(lengthWeakness(password));
  weaknesses.push(lowercaseWeakness(password));
  weaknesses.push(uppercaseWeakness(password));
  weaknesses.push(numberWeakness(password));
  weaknesses.push(specialCharactersWeakness(password));
  weaknesses.push(repeatCharactersWeakness(password));
  return weaknesses;
}

function lengthWeakness(password) {
  const length = password.length;

  if (length == 0) {
    return {
      message: "Enter a Password",
      deduction: 100,
    };
  }

  if (length <= 3) {
    return {
      message: "Your Password is way too short",
      deduction: 90,
    };
  }

  if (length <= 5) {
    return {
      message: "Your Password is too short",
      deduction: 70,
    };
  }

  if (length <= 8) {
    return {
      message: "Your Password should be longer",
      deduction: 50,
    };
  }
  if (length <= 10) {
    return {
      message: "Your Password should be longer",
      deduction: 20,
    };
  }

  if (length >= 10) {
    return {
      message: "Your Password could be longer",
      deduction: 0,
    };
  }
}

function lowercaseWeakness(password) {
  return characterTypeWeakness(password, /[a-z]/g, "lowercase characters");
}

function uppercaseWeakness(password) {
  return characterTypeWeakness(password, /[A-Z]/g, "uppercase characters");
}

function numberWeakness(password) {
  return characterTypeWeakness(password, /[0-9]/g, "numbers");
}

function specialCharactersWeakness(password) {
  return characterTypeWeakness(
    password,
    /[^0-9a-zA-Z\s]/g,
    "special characters"
  );
}

function characterTypeWeakness(password, regex, type) {
  const matches = password.match(regex) || [];

  if (matches.length == 0) {
    return {
      message: `Your Password has no ${type}`,
      deduction: 30,
    };
  }

  if (matches.length < 4) {
    return {
      message: `Your Password should use more ${type}`,
      deduction: 20,
    };
  }

  if (matches.length >= 4) {
    return {
      message: `Your Password could use more ${type}`,
      deduction: 0,
    };
  }
}

function repeatCharactersWeakness(password) {
  const matches = password.match(/(.)\1/g) || [];
  if (matches.length > 0) {
    return {
      message: "Your Password has repeated characters",
      deduction: matches.length * 10,
    };
  }
}
