function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const menuTexts = document.querySelectorAll(".menu-text");
    const main = document.getElementById("mainContent");

    // Check desktop or mobile UI
    if (window.innerWidth >= 1024) { 
        // Xử lý thu gọn/mở rộng cho Desktop
        if (sidebar.classList.contains("w-64")) {
            // Thu gọn
            sidebar.classList.replace("w-64", "w-16");
            menuTexts.forEach(text => text.classList.add("hidden"));

            main.classList.remove("lg:ml-64");
            main.classList.add("lg:ml-16");

            localStorage.setItem("sidebarState", "collapsed");
        } else {
            // Mở rộng
            sidebar.classList.replace("w-16", "w-64");
            menuTexts.forEach(text => text.classList.remove("hidden"));

            main.classList.remove("lg:ml-16");
            main.classList.add("lg:ml-64");

            localStorage.setItem("sidebarState", "expanded");
        }
    } else {
        // Xử lý đóng/mở cho Mobile
        sidebar.classList.toggle("-translate-x-full");
        overlay.classList.toggle("hidden");
    }
}

function restoreSidebarState() {
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("mainContent");
    const menuTexts = document.querySelectorAll(".menu-text");

    const savedState = localStorage.getItem("sidebarState");

    if (savedState === "collapsed" && window.innerWidth >= 1024) {

        sidebar.classList.remove("w-64");
        sidebar.classList.add("w-16");

        menuTexts.forEach(text => text.classList.add("hidden"));

        main.classList.remove("lg:ml-64");
        main.classList.add("lg:ml-16");
    } else if (savedState === "expanded" && window.innerWidth >= 1024) {

        sidebar.classList.remove("w-16");
        sidebar.classList.add("w-64");

        menuTexts.forEach(text => text.classList.remove("hidden"));

        main.classList.remove("lg:ml-16");
        main.classList.add("lg:ml-64");
    }
}

// Reset sizebar
window.addEventListener('resize', () => {
    const sidebar = document.getElementById("sidebar");
    const menuTexts = document.querySelectorAll(".menu-text");
    
    if (window.innerWidth < 1024 && sidebar.classList.contains("w-16")) {
        sidebar.classList.replace("w-16", "w-64");
        menuTexts.forEach(text => text.classList.remove("hidden"));
    }
});

// Toggle Dropdown Menu
function toggleDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById("dropdownMenu");
    dropdown.classList.toggle("hidden");
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    const dropdown = document.getElementById("dropdownMenu");
    if (!dropdown.classList.contains("hidden")) {
        dropdown.classList.add("hidden");
    }
}

// Navigation simulation
function navigate(path) {
    // Đóng sidebar nếu đang ở chế độ mobile
    if (window.innerWidth < 1024) {
        const sidebar = document.getElementById("sidebar");
        if (!sidebar.classList.contains("-translate-x-full")) {
            toggleSidebar();
        }
    }
    console.log("Navigating to:", path);
    highlightActiveMenu(path);
    window.location.href = `..${path + ".html"}`;
}

// Logout
function handleLogout() {
    localStorage.removeItem("currentUser");
    window.location.href = "../auth/login.html";
}

function highlightCurrentMenu() {
    const path = window.location.pathname
        .split("/src")[1]
        .replace(".html", "");

    highlightActiveMenu(path);
}

// Highlight Active Menu
function highlightActiveMenu(currentPath) {
    const menuItems = document.querySelectorAll(".menu-item");
    if(!currentPath) currentPath = "/admin/dashboard"; 

    menuItems.forEach(item => {
        const itemPath = item.getAttribute("data-path");
        console.log(itemPath)
        if (currentPath === itemPath) {
            item.classList.add("bg-red-600", "text-white");
            item.classList.remove("text-gray-700", "hover:bg-gray-100");
        } else {
            item.classList.remove("bg-red-600", "text-white");
            item.classList.add("text-gray-700", "hover:bg-gray-100");
        }
    });
}