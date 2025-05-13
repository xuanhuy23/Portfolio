document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const body = document.body;

  // Kiểm tra chế độ tối trong localStorage
  const isDarkMode = localStorage.getItem("darkMode") === "enabled";

  // Thiết lập chế độ tối ban đầu
  if (isDarkMode) {
    enableDarkMode();
  }

  // Bắt sự kiện click vào nút chuyển đổi
  darkModeToggle.addEventListener("click", () => {
    // Kiểm tra xem hiện tại có đang ở chế độ tối không
    const isDarkMode = body.classList.contains("dark-mode");

    if (isDarkMode) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });

  // Hàm bật chế độ tối
  function enableDarkMode() {
    body.classList.add("dark-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem("darkMode", "enabled");
  }

  // Hàm tắt chế độ tối
  function disableDarkMode() {
    body.classList.remove("dark-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem("darkMode", "disabled");
  }

  // Tự động chuyển đổi chế độ tối dựa trên cài đặt hệ thống
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Chỉ áp dụng khi người dùng chưa đặt tùy chọn
  if (!localStorage.getItem("darkMode")) {
    if (prefersDarkScheme.matches) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  }

  // Lắng nghe sự thay đổi cài đặt hệ thống
  prefersDarkScheme.addEventListener("change", (e) => {
    // Chỉ áp dụng khi người dùng chưa đặt tùy chọn
    if (!localStorage.getItem("darkMode")) {
      if (e.matches) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    }
  });
});
