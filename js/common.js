let darkMode = false;
const toggleTheme = () => {
  document.body.classList.toggle("dark-theme");
  let iconEl;
  if (darkMode) {
    document.getElementsByClassName("theme-text")[0].innerText = "Dark mode";
    iconEl = document.getElementsByClassName("fa-sun")[0];
  } else {
    document.getElementsByClassName("theme-text")[0].innerText = "Light mode";
    iconEl = document.getElementsByClassName("fa-moon")[0];
  }
  iconEl.classList.toggle("fa-moon");
  iconEl.classList.toggle("fa-sun");
  darkMode = !darkMode;
};