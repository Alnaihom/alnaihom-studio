document.addEventListener("DOMContentLoaded", () => {

    /* السنة في التذييل */
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();


    /* خط فاصل للرأس عند التمرير */
    const header = document.querySelector(".site-header");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });


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
