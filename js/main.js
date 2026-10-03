document.addEventListener("DOMContentLoaded", () => {

    /* السنة في التذييل */
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();


    /* قائمة الجوال */
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("main-nav");

    const setMenu = (open) => {
        header.classList.toggle("menu-open", open);
        toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", () => {
        setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", (e) => {
        if (e.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setMenu(false);
    });


    /* ظل الرأس عند التمرير */
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });


    /* تمييز الرابط الحالي في القائمة */
    const links = [...nav.querySelectorAll("a:not(.nav-cta)")];
    const sections = links
        .map((a) => document.querySelector(a.getAttribute("href")))
        .filter(Boolean);

    if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                links.forEach((a) =>
                    a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id)
                );
            });
        }, { rootMargin: "-40% 0px -55% 0px" });

        sections.forEach((s) => io.observe(s));
    }


    /* بدائل أنيقة إذا لم تُرفع الصور بعد */
    const markMissing = (img) => {
        const holder = img.closest(".project-media, .brand-mark");
        if (holder) holder.classList.add("is-empty");
        img.remove();
    };

    document.querySelectorAll(".project-media img, .brand-mark img").forEach((img) => {
        if (img.complete && img.naturalWidth === 0) markMissing(img);
        else img.addEventListener("error", () => markMissing(img), { once: true });
    });
});
