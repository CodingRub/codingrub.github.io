const menuToggle = document.getElementById("mobile-menu-toggle");
const menuList = document.querySelector(".menu-list");
const menuLinks = document.querySelectorAll(".element-list a");

menuToggle.addEventListener("click", function () {
  menuList.classList.toggle("active");
});

document.addEventListener("click", function (event) {
  if (!menuList.contains(event.target) && event.target !== menuToggle) {
    menuList.classList.remove("active");
  }
});

menuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    menuList.classList.remove("active");
  });
});