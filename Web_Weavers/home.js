// Information Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements when they come into view
    const animateOnScroll = function() {
        // Information section animations
        const infoSection = document.querySelector('.info-section');
        if (infoSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate paragraphs with staggered delay
                        const paragraphs = entry.target.querySelectorAll('.info-text p');
                        paragraphs.forEach((p, index) => {
                            setTimeout(() => {
                                p.classList.add('fade-in');
                            }, 300 + (index * 200));
                        });
                        
                        // Animate stats with staggered delay
                        const stats = entry.target.querySelectorAll('.stat');
                        stats.forEach((stat, index) => {
                            setTimeout(() => {
                                stat.classList.add('pop-in');
                            }, 800 + (index * 200));
                        });
                        
                        // Stop observing after animation
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            });
            
            observer.observe(infoSection);
        }
    };

    // Initialize animations
    animateOnScroll();
    
    // Add hover effects for stats
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            const number = this.querySelector('.stat-number');
            number.style.transform = 'scale(1.1)';
            number.style.transition = 'transform 0.3s ease';
        });
        
        stat.addEventListener('mouseleave', function() {
            const number = this.querySelector('.stat-number');
            number.style.transform = 'scale(1)';
        });
    });
    
    // Add counter animation for stat numbers
    function animateCounters() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = stat.innerText;
            const isPlus = target.includes('+');
            let targetNum = parseInt(target.replace(/,|\+/g, ''));
            const duration = 2000; // ms
            const step = targetNum / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < targetNum) {
                    stat.innerText = Math.floor(current) + (isPlus ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target;
                }
            };
            
            // Start counter animation when stat becomes visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            updateCounter();
                        }, 500);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(stat);
        });
    }
    
    // Initialize counter animations
    animateCounters();
});