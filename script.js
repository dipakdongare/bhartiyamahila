
document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navList = document.querySelector('.nav-list');

    if (mobileBtn && navList) {
        mobileBtn.addEventListener('click', () => {
            navList.classList.toggle('active');

            // Toggle Icon
            const icon = mobileBtn.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Optional: Add sticky header class on scroll
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });



    // EMI Calculator Logic
    const calculateBtn = document.getElementById('calculate-emi');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const principal = parseFloat(document.getElementById('loan-amount').value) || 0;
            const rate = parseFloat(document.getElementById('interest-rate').value) || 0;
            const years = parseFloat(document.getElementById('tenure-years').value) || 0;
            const months = parseFloat(document.getElementById('tenure-months').value) || 0;

            if (principal <= 0 || rate <= 0 || (years === 0 && months === 0)) {
                alert('Please enter valid values');
                return;
            }

            const interest = rate / 12 / 100;
            const tenureMonths = (years * 12) + months;

            const emi = (principal * interest * Math.pow(1 + interest, tenureMonths)) / (Math.pow(1 + interest, tenureMonths) - 1);

            const resultDisplay = document.getElementById('emi-result');
            const emiValue = document.getElementById('emi-value');

            emiValue.textContent = '₹' + emi.toFixed(2);
            resultDisplay.style.display = 'block';
        });
    }


    // Modal Logic
    const modal = document.getElementById("emi-modal");
    const triggers = document.querySelectorAll(".open-emi-modal");
    const span = document.getElementsByClassName("close-btn")[0];

    if (triggers.length > 0 && modal && span) {
        triggers.forEach(btn => {
            btn.onclick = function (e) {
                e.preventDefault();
                modal.style.display = "block";
            }
        });

        span.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    // Home Slider Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideTime = 3000; // 3 seconds

    if (slides.length > 0) {
        function showSlide(n) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        let slideInterval = setInterval(nextSlide, slideTime);

        // Pause on hover
        const slider = document.querySelector('.home-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slider.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, slideTime));
        }

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, slideTime);
            });
        });
    }

});
