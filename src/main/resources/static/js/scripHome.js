const sidebarToggleBtns = document.querySelectorAll(".sidebar-toggle-custome");
const sidebar = document.querySelector(".sidebar-custome");
const searchForm = document.querySelector(".search-form-custome");
const themeToggleBtn = document.querySelector(".theme-toggle-custome");
const themeIcon = themeToggleBtn.querySelector(".theme-icon-custome");
const menuLinks = document.querySelectorAll(".menu-link-custome");

// Updates the theme icon based on current theme and sidebar state
const updateThemeIcon = () => {
    const isDark = document.body.classList.contains("dark-theme-custome");
    // Lưu ý: "light_mode" và "dark_mode" ở dưới là tên icon của Google Fonts, KHÔNG được thêm đuôi -custome
    themeIcon.textContent = sidebar.classList.contains("collapsed-custome") ? (isDark ? "light_mode" : "dark_mode") : "dark_mode";
    // 2. LOGIC MỚI: Ẩn/Hiện chữ Navbar tại đây
    const nameText = document.getElementById("nameNavbar"); // Lấy thẻ chữ

    if (sidebar.classList.contains("collapsed-custome")) {
        // Nếu sidebar đang đóng -> Ẩn chữ
        nameText.style.display = "none";
    } else {
        // Nếu sidebar đang mở -> Hiện chữ
        nameText.style.display = "block";
    }
};

// Apply dark theme if saved or system prefers, then update icon
const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const shouldUseDarkTheme = savedTheme === "dark" || (!savedTheme && systemPrefersDark);

document.body.classList.toggle("dark-theme-custome", shouldUseDarkTheme);
updateThemeIcon();

// Toggle between themes on theme button click
themeToggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme-custome");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon();
});

// Toggle sidebar collapsed state on buttons click
sidebarToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed-custome");
        updateThemeIcon();
    });
});

// Expand the sidebar when the search form is clicked
searchForm.addEventListener("click", () => {
    if (sidebar.classList.contains("collapsed-custome")) {
        sidebar.classList.remove("collapsed-custome");
        searchForm.querySelector("input").focus(); // "input" là thẻ HTML, giữ nguyên
    }
});

// Expand sidebar by default on large screens
if (window.innerWidth > 768) sidebar.classList.remove("collapsed-custome");