(function () {
  "use strict";

  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* Mobile menu */
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.querySelector(".nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      nav.classList.toggle("is-open");
    });
    var navLinks = nav.querySelectorAll("a");
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", function () {
        nav.classList.remove("is-open");
      });
    }
  }

  /* Custom cursor (mouse only bruh) */
  var dot = document.querySelector(".cursor-dot");
  var ring = document.querySelector(".cursor-ring");
  var prefersCoarse = window.matchMedia("(pointer: coarse)").matches;

  if (!prefersCoarse && dot && ring) {
    document.body.classList.add("has-cursor");

    var ringX = 0;
    var ringY = 0;
    var targetX = 0;
    var targetY = 0;

    document.addEventListener("mousemove", function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.left = targetX + "px";
      dot.style.top = targetY + "px";
    });

    function loopCursor() {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      requestAnimationFrame(loopCursor);
    }
    requestAnimationFrame(loopCursor);

    document.addEventListener("mousedown", function () {
      ring.style.width = "28px";
      ring.style.height = "28px";
    });
    document.addEventListener("mouseup", function () {
      ring.style.width = "40px";
      ring.style.height = "40px";
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    for (var r = 0; r < revealEls.length; r++) {
      io.observe(revealEls[r]);
    }
  } else {
    for (var j = 0; j < revealEls.length; j++) {
      revealEls[j].classList.add("is-visible");
    }
  }

  /* Nav active on scroll */
  var sections = document.querySelectorAll("main section[id]");
  var navAnchors = document.querySelectorAll("#mainNav a[href^='#']");

  function setActiveNav() {
    var scrollPos = window.scrollY + 120;
    if (window.scrollY < 80) {
      for (var h = 0; h < navAnchors.length; h++) {
        navAnchors[h].classList.remove("active");
        if (navAnchors[h].getAttribute("href") === "#home") {
          navAnchors[h].classList.add("active");
        }
      }
      return;
    }
    for (var s = 0; s < sections.length; s++) {
      var sec = sections[s];
      var top = sec.offsetTop;
      var h = sec.offsetHeight;
      var id = sec.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + h) {
        for (var n = 0; n < navAnchors.length; n++) {
          var a = navAnchors[n];
          a.classList.remove("active");
          if (a.getAttribute("href") === "#" + id) {
            a.classList.add("active");
          }
        }
        break;
      }
    }
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  /* Hero photo 3D tilt */
  var photoTilt = document.getElementById("photoTilt");
  if (photoTilt && !prefersCoarse) {
    photoTilt.addEventListener("mousemove", function (e) {
      var rect = photoTilt.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      photoTilt.style.transform =
        "perspective(900px) rotateY(" + x * 14 + "deg) rotateX(" + -y * 14 + "deg)";
    });
    photoTilt.addEventListener("mouseleave", function () {
      photoTilt.style.transform = "";
    });
  }

  /* Magnetic button */
  var magnetic = document.querySelector(".magnetic");
  if (magnetic && !prefersCoarse) {
    magnetic.addEventListener("mousemove", function (e) {
      var rect = magnetic.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      magnetic.style.transform = "translate(" + x * 0.25 + "px, " + y * 0.25 + "px)";
    });
    magnetic.addEventListener("mouseleave", function () {
      magnetic.style.transform = "";
    });
  }

  /* Skill pills — quick pop on click */
  var pills = document.querySelectorAll(".pill");
  for (var p = 0; p < pills.length; p++) {
    pills[p].addEventListener("click", function () {
      this.classList.remove("is-popped");
      void this.offsetWidth;
      this.classList.add("is-popped");
    });
  }
})();
