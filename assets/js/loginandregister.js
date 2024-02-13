window.addEventListener("DOMContentLoaded", setupForm);

function setupForm() {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", handleSubmit);
    form.addEventListener("input", handleLoginTypeChange);

    // Sayfa yüklendiğinde kontrol et ve gerekirse alanları göster
    handleLoginTypeChange();
}

function handleLoginTypeChange() {
    const extraFields = document.getElementById("extraFields");
    const loginType = document.querySelector('input[name="login_type"]:checked').value;

    if (loginType === "register") {
        extraFields.style.display = "block";
    } else {
        extraFields.style.display = "none";
    }
}

function handleSubmit(event) {
    event.preventDefault();

    const {
        username,
        password,
        birthDate,
        email,
        phoneNumber,
        login_type,
        result
    } = event.target;

    const processUser = login_type.value == "register" ? registerUser : loginUser;
    const response = processUser(
        username.value,
        password.value,
        birthDate ? birthDate.value : undefined,
        email ? email.value : undefined,
        phoneNumber ? phoneNumber.value : undefined
    );
    result.innerHTML = response;

    if (response.includes("successfully logged-in") || response.includes("now registered")) {
        setTimeout(() => {
            window.location.href = event.target.action;
        }, 2000);
    }
}

function registerUser(username, password, birthDate, email, phoneNumber) {
    // localStorage'da kullanıcı adını kontrol et
    const existingUser = window.localStorage.getItem(`exampleLogin__username_${username}`);
    if (existingUser) {
        return `Username ${username} is already registered.`;
    }

    // Şifre kontrolü
    if (!isValidPassword(password)) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, and one digit.';
    }

    // localStorage'a kaydetme işlemleri
    window.localStorage.setItem(`exampleLogin__username_${username}`, username);
    window.localStorage.setItem(`exampleLogin__password_${username}`, password);

    return `New user ${username} now registered!`;
}

// Şifre kontrolü için yardımcı fonksiyon
function isValidPassword(password) {
    // Şifrede en az bir büyük harf, bir küçük harf ve bir rakam olmalı
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);

    return hasUpperCase && hasLowerCase && hasDigit;
}


function loginUser(username, password) {
    // localStorage'dan kontrol işlemleri
    const storedPassword = window.localStorage.getItem(`exampleLogin__password_${username}`);

    if (!storedPassword) {
        return `Username ${username} has not been registered.`;
    } else if (storedPassword !== password) {
        return `Incorrect password for username ${username}`;
    }

    return `User ${username} successfully logged-in!`;
}