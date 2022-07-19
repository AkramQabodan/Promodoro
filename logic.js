"use strict";
const work_time = document.getElementById("work-time");
const break_time = document.getElementById("break-time");
const start_work = document.getElementById("start-work");
const start_break = document.getElementById("start-break");
const resume_work = document.getElementById("resume-work");
const end_work = document.getElementById("end-work");
let secs = 0;
let mins = 0;
let hours = 0;
let break_secs = 0;
let break_mins = 0;
let break_hours = 0;
let work_stop;
let break_stop;
let is_Started = false;
let break_started = false;
const timer = (element, type) => {
  if (type === "work") {
    return setInterval(() => {
      secs = secs + 1;
      display_time(element, secs, mins, hours);
    }, 100);
  } else {
    return setInterval(() => {
      break_secs = break_secs + 1;
      display_time(element, break_secs, break_mins, break_hours);
    }, 100);
  }
};

const display_time = (element, sec = 0, min = 0, hour = 0) => {
  console.log(secs);
  if (element == work_time) {
    if (sec > 59) {
      secs = 0;
      mins = mins + 1;
    }
    if (min > 59) {
      mins = 0;
      hours = hours + 1;
    }
  } else {
    if (sec > 59) {
      break_secs = 0;
      break_mins = break_mins + 1;
    }
    if (min > 59) {
      break_mins = 0;
      break_hours = break_hours + 1;
    }
  }

  element.innerHTML = `${hour < 10 ? "0" + hour : hour} : ${
    min < 10 ? "0" + min : min
  } : ${sec < 10 ? "0" + sec : sec}`;
};

start_work.addEventListener("click", () => {
  if (!is_Started) {
    work_stop = timer(work_time, "work");
    is_Started = true;
  }
});
start_break.addEventListener("click", () => {
  if (is_Started) {
    if (!break_started) {
      clearInterval(work_stop);
      break_stop = timer(break_time, "break");
      break_started = true;
    }
  }
});
resume_work.addEventListener("click", () => {
  if (break_started) {
    work_stop = timer(work_time, "work");
    clearInterval(break_stop);
    break_started = false;
  }
});
end_work.addEventListener("click", () => {
  clearInterval(work_stop);
  clearInterval(break_stop);
  display_time(work_time, 0, 0, 0);
  display_time(break_time, 0, 0, 0);
  secs = 0;
  mins = 0;
  hours = 0;
  break_secs = 0;
  break_mins = 0;
  break_hours = 0;
  is_Started = false;
});
