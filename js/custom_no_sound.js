/* ----------------------------------------------------------- */
/* DOCUMENT VARIABLES
/* ----------------------------------------------------------- */

var open_portfolio_button = document.getElementById("open-portfolio");
var back_home = document.getElementById("back-home");
var open_about_button = document.getElementById("open-about");
var close_about_button = document.getElementById("close");
var global_index = 0;

/* ----------------------------------------------------------- */
/* PAGE PRELOADER
/* ----------------------------------------------------------- */

window.addEventListener("load", function() {
    document.querySelector("body").classList.add("loaded");
});

/* ----------------------------------------------------------- */
/*  PORTFOLIO 3D ANIMATION
/* ----------------------------------------------------------- */

if (window.innerWidth > 767) {
    const nodes = [].slice.call(document.querySelectorAll(".item"), 0);
    const directions = {
        0: "top",
        1: "right",
        2: "bottom",
        3: "left"
    };
    const classNames = ["in", "out"].map(p => Object.values(directions).map(d => `${p}-${d}`)).reduce((a, b) => a.concat(b));
    const getDirectionKey = (ev, node) => {
        const {
            width,
            height,
            top,
            left
        } = node.getBoundingClientRect();
        const l = ev.pageX - (left + window.pageXOffset);
        const t = ev.pageY - (top + window.pageYOffset);
        const x = l - width / 2 * (width > height ? height / width : 1);
        const y = t - height / 2 * (height > width ? width / height : 1);
        return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    };
    class Item {
        constructor(element) {
            this.element = element;
            this.element.addEventListener("mouseover", ev => this.update(ev, "in"));
            this.element.addEventListener("mouseout", ev => this.update(ev, "out"));
        }
        update(ev, prefix) {
            this.element.classList.remove(...classNames);
            this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
        }
    }
    nodes.forEach(node => new Item(node));
}

/* ----------------------------------------------------------- */
/*  OPEN CLICKED ITEM IN PORTFOLIO GRID
/* ----------------------------------------------------------- */

function openItem(el) {
    var divs = document.querySelectorAll(".item");
    var index = Array.from(divs).indexOf(el) + 1;
    var not_active = document.querySelector(".not-active-layer");
    var active = document.querySelector(".active-layer");
    setTimeout(function() {
        document.querySelector(".portfolio-grid").classList.add("to-top");
        document.querySelector(".portfolio-grid").classList.remove("active");
    }, 200);
    setTimeout(function() {
        document.querySelector(".portfolio-items > div:nth-child(" + index + ")").classList.add("active");
        if ((document.querySelector(".portfolio-items > div:nth-child(" + (index - 1) + ")"))) {
            document.querySelector(".portfolio-items > div:nth-child(" + (index - 1) + ")").classList.add("to-bottom");
        }
        if (document.querySelector(".portfolio-items > div:nth-child(" + (index + 1) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (index + 1) + ")").classList.add("to-top");
        }
    }, 250);
    setTimeout(function() {
        not_active.classList.remove("not-active-layer");
        not_active.classList.add("active-layer");
        not_active.classList.remove("opacity-0");
        active.classList.add("not-active-layer");
        active.classList.remove("active-layer");
        active.classList.add("opacity-0");
    }, 300);
    setTimeout(function() {
        document.querySelector(".portfolio-grid").scrollTop = 0;
    }, 750);
    global_index = index;
}

/* ----------------------------------------------------------- */
/*  BACK TO PORTFOLIO GRID SECTION
/* ----------------------------------------------------------- */

function backToPorfolio() {
    var not_active = document.querySelector(".not-active-layer");
    var active = document.querySelector(".active-layer");
    setTimeout(function() {
        not_active.classList.remove("not-active-layer");
        not_active.classList.add("active-layer");
        not_active.classList.add("opacity-0");
        active.classList.add("not-active-layer");
        active.classList.remove("active-layer");
        active.classList.remove("opacity-0");
    }, 300);
    setTimeout(function() {
        document.querySelector(".portfolio-grid").classList.add("active");
        document.querySelector(".portfolio-grid").classList.remove("to-top");
        document.querySelector(".portfolio-items > div.active").classList.remove("active");
        if (document.querySelector(".portfolio-items > div.to-top")) {
            document.querySelector(".portfolio-items > div.to-top").classList.remove("to-top");
        }
        if (document.querySelector(".portfolio-items > div.to-bottom")) {
            document.querySelector(".portfolio-items > div.to-bottom").classList.remove("to-bottom");
        }
    }, 350);
}

/* ----------------------------------------------------------- */
/*  NAVIGATE TO PREVIOUS ITEM IN PORTFOLIO
/* ----------------------------------------------------------- */

function TopProject() {
    var not_active = document.querySelector(".not-active-layer");
    var active = document.querySelector(".active-layer");
    setTimeout(function() {
        document.querySelector(".portfolio-items > div:nth-child(" + (global_index) + ")").classList.remove("active");
        if (document.querySelector(".portfolio-items > div:nth-child(" + (global_index) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (global_index) + ")").classList.add("to-top");
        }
        if (document.querySelector(".portfolio-items > div:nth-child(" + (global_index - 2) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (global_index - 2) + ")").classList.add("to-bottom");
        }
        not_active.classList.remove("not-active-layer");
        not_active.classList.add("active-layer");
        not_active.classList.remove("opacity-0");
        active.classList.add("not-active-layer");
        active.classList.remove("active-layer");
        active.classList.add("opacity-0");

    }, 300);
    setTimeout(function() {
        document.querySelector(".portfolio-items > div:nth-child(" + (global_index - 1) + ")").classList.add("active");
        if (document.querySelector(".portfolio-items > div:nth-child(" + (global_index + 1) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (global_index + 1) + ")").classList.remove("to-top");
        }
        if (document.querySelector(".portfolio-items > div:nth-child(" + (global_index - 1) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (global_index - 1) + ")").classList.remove("to-bottom");
        }
        global_index = global_index - 1;
    }, 350);
}

/* ----------------------------------------------------------- */
/*  NAVIGATE TO NEXT ITEM IN PORTFOLIO
/* ----------------------------------------------------------- */

function BottomProject() {
    var not_active = document.querySelector(".not-active-layer");
    var active = document.querySelector(".active-layer");
    setTimeout(function() {
        document.querySelector(".portfolio-items > div:nth-child(" + (global_index) + ")").classList.remove("active");
        if (document.querySelector(".portfolio-items > div:nth-child(" + (global_index) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (global_index) + ")").classList.add("to-bottom");
        }
        if (document.querySelector(".portfolio-items > div:nth-child(" + (global_index + 2) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (global_index + 2) + ")").classList.add("to-top");
        }
        not_active.classList.remove("not-active-layer");
        not_active.classList.add("active-layer");
        not_active.classList.add("opacity-0");
        active.classList.add("not-active-layer");
        active.classList.remove("active-layer");
        active.classList.remove("opacity-0");
    }, 300);
    setTimeout(function() {
        document.querySelector(".portfolio-items > div:nth-child(" + (global_index + 1) + ")").classList.add("active");
        if (document.querySelector(".portfolio-items > div:nth-child(" + (global_index + 1) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (global_index + 1) + ")").classList.remove("to-top");
        }
        if (document.querySelector(".portfolio-items > div:nth-child(" + (global_index - 1) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (global_index - 1) + ")").classList.remove("to-bottom");
        }
        global_index = global_index + 1;
    }, 350);
}

/* ----------------------------------------------------------- */
/*  OPEN PORTFOLIO GRID SECTION
/* ----------------------------------------------------------- */

if (open_portfolio_button) {
    document.getElementById("open-portfolio").onclick = function() {
        var not_active = document.querySelector(".not-active-layer");
        var active = document.querySelector(".active-layer");
        setTimeout(function() {
            document.querySelector(".home").classList.add("to-top");
            document.querySelector(".home").classList.remove("active");
        }, 200);
        setTimeout(function() {
            document.querySelector(".portfolio-grid").classList.add("active");
            document.querySelector(".portfolio-grid").classList.remove("to-bottom");
        }, 250);
        setTimeout(function() {
            not_active.classList.remove("not-active-layer");
            not_active.classList.add("active-layer");
            active.classList.add("not-active-layer");
            active.classList.remove("active-layer");
        }, 300);
    };
}

/* ----------------------------------------------------------- */
/*  BACK TO HOME SECTION
/* ----------------------------------------------------------- */

if (back_home) {
    document.getElementById("back-home").onclick = function() {
        var not_active = document.querySelector(".not-active-layer");
        var active = document.querySelector(".active-layer");
        setTimeout(function() {
            document.querySelector(".portfolio-grid").classList.add("to-bottom");
            document.querySelector(".portfolio-grid").classList.remove("active");
            not_active.classList.remove("not-active-layer");
            not_active.classList.add("active-layer");
            not_active.classList.add("opacity-0");
            active.classList.add("not-active-layer");
            active.classList.remove("active-layer");
            active.classList.remove("opacity-0");
        }, 300);
        setTimeout(function() {
            document.querySelector(".home").classList.add("active");
        }, 350);
        setTimeout(function() {
            document.querySelector(".portfolio-grid").scrollTop = 0;
        }, 750);
    };
}

/* ----------------------------------------------------------- */
/* PORTFOLIO BUTTON ANIMATION 
/* ----------------------------------------------------------- */

const letterWrapClass = "letter-wrap";
const letterWrapElements = document.getElementsByClassName(letterWrapClass);
[...letterWrapElements].forEach((el) => {
    letterWrap(el, letterWrapClass);
});
function letterWrap(el, cls) {
    const words = el.textContent.split("");
    const letters = [];
    cls = cls || "letter-wrap";
    words.forEach((word) => {
        let html = "";
        for (var letter in word) {
            html += `
          <span class="${cls}__char">
            <span class="${cls}__char-inner" data-letter="${word[letter]}">
              ${word[letter]}
            </span>
          </span>
        `;
        }
        let wrappedWords = `<span class="${cls}__word">${html}</span>`;
        letters.push(wrappedWords);
    });
    return (el.innerHTML = letters.join(" "));
}

/* ----------------------------------------------------------- */
/* OPEN ABOUT SECTION
/* ----------------------------------------------------------- */

if (open_about_button) {
    document.getElementById("open-about").onclick = function(e) {
        e.preventDefault();
        setTimeout(function() {
            document.getElementById("overlay").classList.add("active");
            document.getElementById("contentcontainer").classList.add("active");
        }, 100);
        setTimeout(function() {
            document.getElementById("content").classList.add("active");
        }, 300);
    }
}

/* ----------------------------------------------------------- */
/* CLOSE ABOUT SECTION
/* ----------------------------------------------------------- */

if (close_about_button) {
    document.getElementById("close").onclick = function() {
        document.getElementById("content").classList.remove("active");
        setTimeout(function() {
            document.getElementById("overlay").classList.remove("active");
        }, 400);
        setTimeout(function() {
            document.getElementById("contentcontainer").classList.remove("active");
        }, 500);
        setTimeout(function() {
            document.querySelector(".content-container").scrollTop = 0;
        }, 850);
    }
}

/* ----------------------------------------------------------- */
/* LIGHT/DARK SWITCHER
/* ----------------------------------------------------------- */

const checkbox = document.getElementById("checkbox");
const checkbox2 = document.getElementById("checkbox2");
if ((checkbox) && (checkbox2)) {
    checkbox.addEventListener("change", () => {
        document.body.classList.toggle("dark");
        document.getElementById("checkbox2").checked = !checkbox2.checked;
    })
    checkbox2.addEventListener("change", () => {
        document.body.classList.toggle("dark");
        document.getElementById("checkbox").checked = !checkbox.checked;
    });
}