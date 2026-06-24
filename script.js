/* =========================================================
   MG 銘勁 2026 夏季冷檢 Landing Page — script.js
   ========================================================= */

/* ---------- 可調整常數（請於此集中管理外部連結） ---------- */
// 微笑大使投票表單（Microsoft Forms）— 中壢廠、八德廠各一份
const VOTE_FORM_URL_ZHONGLI = "https://forms.office.com/r/CVUp4ib8e0"; // 中壢廠
const VOTE_FORM_URL_BADE = "https://forms.office.com/r/s5KHrR3CPi"; // 八德廠

// 預約回廠連結（MG 官網會員登入）
const BOOKING_URL = "https://www.mgmotor.com.tw/signin/login.html";

// PLUS 會員洽詢（LINE 官方帳號）
const PLUS_LINE_URL = "https://lin.ee/QVC8qnl";

(function () {
  "use strict";

  /* ---------- 標記 JS 已啟用（啟用 reveal 淡入；未啟用 JS 時內容預設顯示） ---------- */
  document.documentElement.classList.add("js");

  /* ---------- 套用外部連結 ---------- */
  const voteBtnZhongli = document.getElementById("voteBtnZhongli");
  if (voteBtnZhongli) voteBtnZhongli.setAttribute("href", VOTE_FORM_URL_ZHONGLI);

  const voteBtnBade = document.getElementById("voteBtnBade");
  if (voteBtnBade) voteBtnBade.setAttribute("href", VOTE_FORM_URL_BADE);

  const bookingBtn = document.getElementById("bookingBtn");
  if (bookingBtn) bookingBtn.setAttribute("href", BOOKING_URL);

  const plusBtn = document.getElementById("plusBtn");
  if (plusBtn) plusBtn.setAttribute("href", PLUS_LINE_URL);

  /* ---------- 行動選單開關 ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMobile = document.getElementById("navMobile");
  if (navToggle && navMobile) {
    navToggle.addEventListener("click", function () {
      const open = navMobile.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });
    // 點擊行動選單連結後自動收合
    navMobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navMobile.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Navbar 滾動陰影 ---------- */
  const navbar = document.getElementById("navbar");
  const onScroll = function () {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 錨點平滑滾動（含 navbar 高度補償） ---------- */
  // 多數情況由 CSS scroll-behavior 處理；此處確保不支援時 fallback。
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // 更新網址 hash，方便分享
      history.replaceState(null, "", id);
    });
  });

  /* ---------- 投票 / 外部連結：開新分頁 ---------- */
  // target="_blank" 已於 HTML 設定；此處統一補上安全屬性。
  [voteBtnZhongli, voteBtnBade, bookingBtn, plusBtn].forEach(function (btn) {
    if (btn) {
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener noreferrer");
    }
  });

  /* ---------- 追蹤事件（GA4 / GTM 預留） ---------- */
  // 點擊任何具 data-track 的元素時送出事件，方便後續串接。
  document.querySelectorAll("[data-track]").forEach(function (el) {
    el.addEventListener("click", function () {
      const action = el.getAttribute("data-track");
      // GA4（gtag）
      if (typeof window.gtag === "function") {
        window.gtag("event", action, { event_category: "engagement" });
      }
      // GTM（dataLayer）
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: action });
      }
    });
  });

  /* ---------- 載入後 fade-in（IntersectionObserver） ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
    // 安全保險：若 5 秒後仍有元素未觸發（例如背景分頁、IO 異常），強制顯示
    setTimeout(function () {
      reveals.forEach(function (el) {
        el.classList.add("visible");
      });
    }, 5000);
  } else {
    // 不支援時直接顯示
    reveals.forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();

/* ---------- 精選配件：自動跑動輪播（可手動滑動） ---------- */
(function () {
  "use strict";
  var track = document.querySelector(".parts-carousel");
  if (!track || track.children.length === 0) return;

  // 複製一份卡片，串成無縫循環
  var originals = Array.prototype.slice.call(track.children);
  originals.forEach(function (node) {
    var clone = node.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });

  // 計算原始一組卡片的總寬（含間距），作為循環重置點
  var baseWidth = 0;
  function computeBase() {
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    baseWidth = 0;
    originals.forEach(function (node) {
      baseWidth += node.getBoundingClientRect().width + gap;
    });
  }
  computeBase();
  window.addEventListener("resize", computeBase);

  var paused = false;
  var resumeTimer = null;
  function pause() { paused = true; if (resumeTimer) clearTimeout(resumeTimer); }
  function resumeSoon() {
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(function () { paused = false; }, 1500);
  }

  // 滑鼠移入暫停、移出恢復；觸控／拖曳／滾輪時暫停，放開後恢復
  track.addEventListener("mouseenter", pause);
  track.addEventListener("mouseleave", resumeSoon);
  track.addEventListener("pointerdown", pause);
  track.addEventListener("pointerup", resumeSoon);
  track.addEventListener("touchstart", pause, { passive: true });
  track.addEventListener("touchend", resumeSoon, { passive: true });
  track.addEventListener("wheel", function () { pause(); resumeSoon(); }, { passive: true });

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return; // 尊重「減少動態」設定：僅保留手動滑動

  var SPEED = 0.5; // 每幀位移（px），數值越大跑越快
  function step() {
    if (!paused && baseWidth > 0) {
      track.scrollLeft += SPEED;
      if (track.scrollLeft >= baseWidth) {
        track.scrollLeft -= baseWidth;
      }
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();
