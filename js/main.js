document.addEventListener("DOMContentLoaded", () => {
  // Lấy tham chiếu đến các phần tử
  const header = document.querySelector("header");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");
  const contactForm = document.getElementById("contactForm");
  const skipLink = document.querySelector(".skip-link");

  // Xử lý thanh điều hướng khi cuộn
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mở/đóng menu di động và cập nhật aria-expanded
  mobileMenuBtn.addEventListener("click", () => {
    const isExpanded = navLinks.classList.contains("active");
    navLinks.classList.toggle("active");
    mobileMenuBtn.classList.toggle("active");
    mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
  });

  // Đóng menu di động khi click vào một liên kết và cập nhật aria-current
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      // Đóng menu
      navLinks.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
      mobileMenuBtn.setAttribute("aria-expanded", "false");

      // Cập nhật aria-current
      document.querySelectorAll(".nav-links a").forEach((navLink) => {
        navLink.removeAttribute("aria-current");
      });
      link.setAttribute("aria-current", "page");
    });
  });

  // Lọc dự án và xử lý ARIA cho các nút tab
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Xóa class active từ tất cả các nút
      filterBtns.forEach((filterBtn) => {
        filterBtn.classList.remove("active");
        filterBtn.setAttribute("aria-selected", "false");
      });

      // Thêm class active cho nút được click
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // Lấy giá trị bộ lọc
      const filterValue = btn.getAttribute("data-filter");

      // Hiển thị/ẩn các dự án dựa trên bộ lọc
      projectItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          item.style.display = "block";
          item.removeAttribute("aria-hidden");
        } else {
          item.style.display = "none";
          item.setAttribute("aria-hidden", "true");
        }
      });

      // Thông báo cho người dùng sử dụng screen reader
      const liveRegion =
        document.getElementById("filter-live-region") || createLiveRegion();
      const projectCount = document.querySelectorAll(
        `.project-item[data-category="${
          filterValue === "all" ? "*" : filterValue
        }"]:not([aria-hidden="true"])`
      ).length;
      liveRegion.textContent = `Đã lọc ${projectCount} dự án thuộc loại ${
        filterValue === "all" ? "tất cả" : filterValue
      }`;
    });
  });

  // Tạo vùng live region cho thông báo lọc
  function createLiveRegion() {
    const liveRegion = document.createElement("div");
    liveRegion.id = "filter-live-region";
    liveRegion.className = "visually-hidden";
    liveRegion.setAttribute("aria-live", "polite");
    document.body.appendChild(liveRegion);
    return liveRegion;
  }

  // Xử lý biểu mẫu liên hệ
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Vô hiệu hóa nút gửi khi đang xử lý
      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML = "Đang gửi...";

      // Lấy dữ liệu từ biểu mẫu
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData.entries());

      // Kiểm tra dữ liệu
      let isValid = validateForm(formValues);

      if (isValid) {
        // Đây chỉ là mô phỏng gửi form
        // Trong thực tế, bạn có thể sử dụng fetch để gửi dữ liệu đến máy chủ
        setTimeout(() => {
          console.log("Form data:", formValues);

          // Tạo thông báo thành công
          showFormMessage(
            "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.",
            "success"
          );

          // Đặt lại biểu mẫu
          contactForm.reset();
          submitButton.disabled = false;
          submitButton.innerHTML = "Gửi tin nhắn";
        }, 1500);
      } else {
        submitButton.disabled = false;
        submitButton.innerHTML = "Gửi tin nhắn";
      }
    });
  }

  // Xác thực biểu mẫu
  function validateForm(data) {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Xóa tất cả thông báo lỗi hiện tại
    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    // Kiểm tra tên
    if (!data.name || data.name.trim().length < 2) {
      showError("name", "Vui lòng nhập tên hợp lệ");
      isValid = false;
    }

    // Kiểm tra email
    if (!data.email || !emailRegex.test(data.email)) {
      showError("email", "Vui lòng nhập email hợp lệ");
      isValid = false;
    }

    // Kiểm tra tin nhắn
    if (!data.message || data.message.trim().length < 10) {
      showError("message", "Tin nhắn phải có ít nhất 10 ký tự");
      isValid = false;
    }

    return isValid;
  }

  // Hiển thị lỗi biểu mẫu
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    errorDiv.setAttribute("aria-live", "polite");
    field.parentNode.appendChild(errorDiv);
    field.setAttribute("aria-invalid", "true");
  }

  // Hiển thị thông báo biểu mẫu
  function showFormMessage(message, type) {
    // Xóa thông báo cũ nếu có
    const existingMessage = document.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Tạo thông báo mới
    const messageDiv = document.createElement("div");
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.setAttribute("aria-live", "assertive");

    // Thêm vào DOM
    contactForm.insertAdjacentElement("beforebegin", messageDiv);

    // Tự động xóa sau một khoảng thời gian
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }

  // Hiệu ứng typing cho hero section
  const typed = new Typed(".typing", {
    strings: ["Front-end", "Back-end", "Full-stack"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  // Cải thiện khả năng tiếp cận với phím Tab
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-user");
    }
  });

  // Xử lý focus khi sử dụng skip link
  if (skipLink) {
    skipLink.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.tabIndex = -1;
        target.focus();
      }
    });
  }

  // Theo dõi URL hash và cập nhật active link
  function checkHash() {
    const hash = window.location.hash || "#home";
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.removeAttribute("aria-current");
      if (link.getAttribute("href") === hash) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  // Kiểm tra hash khi tải trang và khi hash thay đổi
  window.addEventListener("hashchange", checkHash);
  checkHash();
});
