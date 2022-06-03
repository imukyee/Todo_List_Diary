const clock = document.querySelector("#clock");
const today = document.querySelector("#today");

function getClock() {
  const date = new Date()
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

function getDate() {
  const date = new Date()
  const year = String(date.getFullYear());
  const month = String(date.getMonth()+1).padStart(2,"0");
  const today_date = String(date.getDate()).padStart(2,"0");

  today.innerText = `${year}년 ${month}월 ${today_date}일`;
}

getDate();
getClock();
setInterval(getClock, 1000);
setInterval(getDate, 1000);