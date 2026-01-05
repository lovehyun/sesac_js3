function parseRoute() {
  const hash = window.location.hash || "#/users";
  const clean = hash.replace(/^#/, "");
  const parts = clean.split("/").filter(Boolean);
  const route = parts[0] || "users";
  const id = parts[1] || null;
  return { route, id };
}

function setActiveNav(route) {
  const menu = document.getElementById("nav-menu");
  if (!menu) return;
  const links = menu.querySelectorAll("a[data-route]");
  links.forEach(a => {
    const isActive = a.getAttribute("data-route") === route;
    a.classList.toggle("active", isActive);
    a.setAttribute("aria-current", isActive ? "page" : "false");
  });
}
