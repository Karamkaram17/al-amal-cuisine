loader();
const ContentDOM = document.getElementById("content");
const categories = [];

data.reverse();
data.forEach((item) => {
  if (!categories.includes(item.category)) {
    categories.push(item.category);
  }
});

categories.forEach((category) => {
  const page = document.createElement("div");
  page.className = "page";
  page.innerHTML += `
    <header>
      <p>MENU</p>
      <div><img src="./img/logo.png" alt="" /></div>
      <button class="prev" onclick="prev()"><</button>
      <button class="next" onclick="next()">></button>
    </header>
    `;
  const section = document.createElement("section");
  section.innerHTML += `
      <div class="title">  
        <div class="title-name">${category}</div>
      </div>
    `;
  const newItems = data.filter((item) => item.category === category);
  newItems.forEach((item) => {
    section.innerHTML += `
        <div class="item">
          <div class="item-name">${item.name}</div>
          <div class="item-price">${item.price}$</div>
        </div>
    `;
  });
  page.appendChild(section);

  page.innerHTML += `
    <div class="contact-us">
      <div>
        For your orders please call us on 00 -000 000 
      </div>
      <span>
        <a
          href="https://www.facebook.com/Bonappetitleb?mibextid=ZbWKwL"
          target="_blank">${instagramLogo}</a>
          <div>Al Amal Cuisine</div>
        <a
          href="https://instagram.com/bon_appetit_leb?igshid=NDk5N2NlZjQ="
          target="_blank">${fbLogo}</a>
      </span>
    </div>
    `;
  ContentDOM.appendChild(page);
});

const nextBtn = document.querySelectorAll(".next");
const prevBtn = document.querySelectorAll(".prev");
const pages = ContentDOM.querySelectorAll(".page");
let pageNb = pages.length;
pages[0].querySelector(".next").style.display = "none";
pages[pageNb - 1].style.display = "block";
pages[pageNb - 1].querySelector(".prev").style.display = "none";

function next() {
  if (pageNb <= 1) return;
  pages[pageNb - 1].classList.add("rotate");
  pages[pageNb - 2].style.display = "block";
  pageNb--;
}
function prev() {
  if (pageNb >= 5) return;
  pages[pageNb].classList.remove("rotate");
  pageNb++;
}

function loader() {
  let loaded = false;
  const progressBar = document.getElementById("progress");
  const content = document.getElementById("content");
  window.onload = function () {
    loaded = true;
    progressBar.style.width = `100%`;
    setTimeout(() => {
      content.style.display = "block";
      progressBar.parentElement.style.display = "none";
    }, 150);
  };

  document.addEventListener("DOMContentLoaded", function () {
    let width = 20;
    progressBar.style.width = `${width}%`;
    let interval = setInterval(function () {
      if (loaded === true) return clearInterval(interval);
      width += 5;
      progressBar.style.width = width + "%";
      if (width >= 80) clearInterval(interval);
    }, 100);
    let SlowInterval = setInterval(function () {
      if (loaded === true) return clearInterval(SlowInterval);
      width += 1;
      progressBar.style.width = width + "%";
      if (width > 80 && width >= 98) clearInterval(SlowInterval);
    }, 500);
  });
}

// Track the touch start and end positions
let touchStartX = 0;
let touchEndX = 0;

// Add touch event listeners to the swipe container
ContentDOM.addEventListener("touchstart", handleTouchStart);
ContentDOM.addEventListener("touchend", handleTouchEnd);

function handleTouchStart(event) {
  // Record the touch start position
  touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
  // Record the touch end position
  touchEndX = event.changedTouches[0].clientX;

  // Calculate the swipe distance and direction
  const swipeDistance = touchEndX - touchStartX;
  let swipeDirection;
  swipeDistance < -60 ? (swipeDirection = "right") : null;
  swipeDistance > 60 ? (swipeDirection = "left") : null;
  console.log(swipeDistance);
  console.log(swipeDirection);
  // Activate the corresponding button based on swipe direction
  if (swipeDirection === "right") {
    next();
  } else if (swipeDirection === "left") {
    prev();
  }
  touchStartX = 0;
  touchEndX = 0;
}
