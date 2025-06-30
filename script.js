document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const openBtn = document.getElementById('openBtn');
    const flap = document.getElementById('flap');
    
    // Add the petal fall animation style once
    const petalStyle = document.createElement('style');
    petalStyle.textContent = `
        @keyframes petalFall {
            0% {
                transform: translateY(-50px) rotate(0deg) translateX(0px);
                opacity: 1;
            }
            25% {
                transform: translateY(25vh) rotate(90deg) translateX(10px);
                opacity: 1;
            }
            50% {
                transform: translateY(50vh) rotate(180deg) translateX(-10px);
                opacity: 0.8;
            }
            75% {
                transform: translateY(75vh) rotate(270deg) translateX(5px);
                opacity: 0.5;
            }
            100% {
                transform: translateY(100vh) rotate(360deg) translateX(0px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(petalStyle);
    
    // Add click event to open button
    openBtn.addEventListener('click', function() {
        openLetter();
    });
    
    // Function to open the letter
    function openLetter() {
        // Add opening class to envelope for animation
        envelope.classList.add('opening');
        
        // Hide the button
        openBtn.style.opacity = '0';
        openBtn.style.pointerEvents = 'none';
        
        // After envelope animation, show the letter
        setTimeout(() => {
            envelope.style.opacity = '0';
            envelope.style.transform = 'translateY(-50px)';
            
            setTimeout(() => {
                envelope.classList.add('hidden');
                letter.classList.remove('hidden');
                letter.classList.add('show');
                
                // Start the floating hearts animation
                startFloatingHearts();
                
                // Add sparkle effect
                createSparkles();
                
                // Start background effects immediately
                addBackgroundEffects();
                addMusicTrigger();
            }, 500);
        }, 1000);
    }
    
    // Function to start floating hearts
    function startFloatingHearts() {
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach((heart, index) => {
            heart.style.animationDelay = `${index * 1.5}s`;
        });
    }
    
    // Function to create sparkle effects
    function createSparkles() {
        const sparkleContainer = document.createElement('div');
        sparkleContainer.className = 'sparkles';
        sparkleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
        `;
        document.body.appendChild(sparkleContainer);
        
        // Create sparkles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createSparkle(sparkleContainer);
            }, i * 200);
        }
        
        // Remove sparkle container after animation
        setTimeout(() => {
            sparkleContainer.remove();
        }, 6000);
    }
    
    // Function to create individual sparkle
    function createSparkle(container) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 10 + 15}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: sparkleFloat 3s ease-out forwards;
            pointer-events: none;
        `;
        
        // Add sparkle animation
        const sparkleStyle = document.createElement('style');
        sparkleStyle.textContent = `
            @keyframes sparkleFloat {
                0% {
                    opacity: 0;
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: scale(1) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) rotate(360deg);
                }
            }
        `;
        if (!document.querySelector('style[data-sparkle]')) {
            sparkleStyle.setAttribute('data-sparkle', 'true');
            document.head.appendChild(sparkleStyle);
        }
        
        container.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }
    // Add romantic background effects with lots of rose petals
    function addBackgroundEffects() {
        // Create many rose petals frequently
        const petalInterval = setInterval(() => {
            // Create multiple petals at once for abundance
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createRosePetal();
                }, i * 100); // Small delay between each petal in the batch
            }
        }, 800); // Create new batches every 800ms
        
        // Store interval so it can be cleared if needed
        window.petalInterval = petalInterval;
    }
    
    // Function to create rose petal with enhanced visuals
    function createRosePetal() {
        const petals = ['🌸', '🌺'];
        const petal = document.createElement('div');
        petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
        
        const size = Math.random() * 15 + 12; // Size between 12-27px
        const duration = Math.random() * 4 + 6; // Duration between 6-10 seconds
        const startPosition = Math.random() * 100; // Random horizontal position
        
        petal.style.cssText = `
            position: fixed;
            top: -50px;
            left: ${startPosition}%;
            font-size: ${size}px;
            animation: petalFall ${duration}s linear forwards;
            pointer-events: none;
            z-index: 1;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        `;
        
        document.body.appendChild(petal);
        
        // Remove petal after animation completes
        setTimeout(() => {
            if (petal && petal.parentNode) {
                petal.remove();
            }
        }, duration * 1000 + 1000); // Add 1 second buffer
    }
    
    // Add gentle pulse effect to the envelope
    const envelopePulse = setInterval(() => {
        if (!envelope.classList.contains('opening') && !envelope.classList.contains('hidden')) {
            envelope.style.transform = 'scale(1.02)';
            setTimeout(() => {
                envelope.style.transform = 'scale(1)';
            }, 200);
        }
    }, 4000);
    
    // Clean up intervals when letter is opened
    letter.addEventListener('transitionend', function() {
        if (this.classList.contains('show')) {
            clearInterval(envelopePulse);
        }
    });
});