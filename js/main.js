document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // السنة الحالية
    // =========================

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // =========================
    // تغيير حالة الرأس عند التمرير
    // =========================

    const header = document.querySelector(".site-header");

    if (header) {

        const updateHeader = () => {
            header.classList.toggle(
                "is-scrolled",
                window.scrollY > 8
            );
        };

        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );
    }


    // =========================
    // التعامل مع الصور المفقودة
    // =========================

    const markMissingImage = (img) => {

        const holder = img.closest(
            ".project-icon, .brand-mark"
        );

        if (holder) {
            holder.classList.add("is-empty");
        }

        img.remove();
    };


    const images = document.querySelectorAll(
        ".project-icon img, .brand-mark img"
    );


    images.forEach((img) => {

        if (
            img.complete &&
            img.naturalWidth === 0
        ) {

            markMissingImage(img);

        } else {

            img.addEventListener(
                "error",
                () => markMissingImage(img),
                { once: true }
            );

        }

    });

});
