/* eslint-disable*/
var nativeSmoothScrollTo = function (a) {
    window.scroll({
      behavior: "smooth",
      left: 0,
      top: a.getBoundingClientRect().top + window.pageYOffset,
    });
  },
  smoothScrollTo = function (a, f) {
    var c = document.scrollingElement || document.documentElement,
      d = c.scrollTop,
      g = a - d,
      k = +new Date(),
      h = function (e) {
        e = +new Date() - k;
        var l = parseInt;
        var b = e / (f / 2);
        1 > b
          ? (b = (g / 2) * b * b + d)
          : (b--, (b = (-g / 2) * (b * (b - 2) - 1) + d));
        c.scrollTop = l(b);
        e < f ? requestAnimationFrame(h) : (c.scrollTop = a);
      };
    h();
  },
  supportsNativeSmoothScroll =
    "scrollBehavior" in document.documentElement.style,
  scrollToElem = function (a) {
    a &&
      (a = document.querySelector(a)) &&
      (supportsNativeSmoothScroll
        ? nativeSmoothScrollTo(a)
        : smoothScrollTo(a.offsetTop, 600));
  };

const contactBtn = document.querySelectorAll(".btn");

function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
    y = direction * 100;
  if (elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 1.25,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "expo",
      overwrite: "auto",
    }
  );
}

function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
    hide(elem); // assure that the element is hidden when scrolled into view

    ScrollTrigger.create({
      trigger: elem,
      onEnter: function () {
        animateFrom(elem);
      },
      onEnterBack: function () {
//         animateFrom(elem, -1);
      },
      onLeave: function () {
//         hide(elem);
      }, // assure that the element is hidden when scrolled into view
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".work-text-huge", {
    scrollTrigger: {
      start: "top top",
      scrub: true,
    },
    x: -900,
    ease: 'slow',
    duration: 1,
  });

  gsap.to(".contact-text-huge", {
    scrollTrigger: {
      start: "top top",
      scrub: true,
    },
    x: -200,
    ease: 'none',
    duration: 1,
  });
  
});
