"use strict";

const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");
const btn = document.querySelector(".btn__submit");

const inputOnlyNums = function (e) {
  let val = e.target.value;
  val = val.replace(/[^\d]/g, "");
  e.target.value = val;
};

inputDay.addEventListener("input", inputOnlyNums);
inputMonth.addEventListener("input", inputOnlyNums);
inputYear.addEventListener("input", inputOnlyNums);

const isRequired = value => (value === "" ? false : true);

const isBetween = (value, min, max) =>
  value < min || value > max ? false : true;

const renderError = (input, msg) => {
  const field = input.parentElement;
  field.classList.add("error");
  const error = field.querySelector("small");
  error.textContent = msg;
};

const removeError = input => {
  const field = input.parentElement;
  field.classList.remove("error");
  const error = field.querySelector("small");
  error.textContent = "";
};

const checkDay = day => {
  let valid = false;

  if (!isRequired(day)) {
    renderError(inputDay, "This field is required");
  } else if (!isBetween(+day, 1, 31)) {
    renderError(inputDay, "Must be a valid day");
  } else {
    valid = true;
    removeError(inputDay);
  }
  return valid;
};

const checkMonth = month => {
  let valid = false;

  if (!isRequired(month)) {
    renderError(inputMonth, "This field is required");
  } else if (!isBetween(+month, 1, 12)) {
    renderError(inputMonth, "Must be a valid month");
  } else {
    valid = true;
    removeError(inputMonth);
  }
  return valid;
};
const checkYear = year => {
  let valid = false;
  const nowYear = new Date().getFullYear();

  if (!isRequired(year)) {
    renderError(inputYear, "This field is required");
  } else if (year > nowYear) {
    renderError(inputYear, "Can't be in the future");
  } else {
    valid = true;
    removeError(inputYear);
  }
  return valid;
};

// BONUS (used function from css tricks)
const animateNum = function (obj, start, end, duration) {
  let startTimestamp = null;
  const step = timestamp => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

btn.addEventListener("click", function (e) {
  e.preventDefault();

  const valueDay = document.getElementById("yy");
  const valueMonth = document.getElementById("mm");
  const valueYear = document.getElementById("dd");

  const day = inputDay.value;
  const month = inputMonth.value;
  const year = inputYear.value;

  const dayValid = checkDay(day);
  const monthValid = checkMonth(month);
  const yearValid = checkYear(year);

  const birthDate = new Date(year, month - 1, day);
  const now = new Date();
  const diff = new Date(now.valueOf() - birthDate.valueOf());

  const diffYear = Math.abs(diff.getFullYear() - 1970);
  const diffMonth = Math.abs(diff.getMonth());
  const diffDay = Math.abs(diff.getDate());

  if (!dayValid || !monthValid || !yearValid) return;

  valueYear.textContent = diffYear;
  valueMonth.textContent = diffMonth;
  valueDay.textContent = diffDay;

  animateNum(valueYear, 0, diffYear, 500);
  animateNum(valueMonth, 0, diffMonth, 500);
  animateNum(valueDay, 0, diffDay, 500);
});
