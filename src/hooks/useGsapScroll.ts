import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapScroll() {
  useEffect(() => {
    // Context container for safe cleanup
    const ctx = gsap.context(() => {
      // 1. Scroll Progress Bar
      const progressBar = document.getElementById('gsap-scroll-progress');
      if (progressBar) {
        gsap.to(progressBar, {
          scaleX: 1,
          transformOrigin: 'left center',
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
          },
        });
      }

      // 2. Hero Background Parallax
      const heroBg = document.querySelector('.gsap-hero-bg');
      if (heroBg) {
        gsap.to(heroBg, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: '.gsap-hero-container',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 3. Hero Content Fade & Parallax Lift
      const heroContent = document.querySelector('.gsap-hero-content');
      if (heroContent) {
        gsap.to(heroContent, {
          yPercent: -15,
          opacity: 0.7,
          ease: 'none',
          scrollTrigger: {
            trigger: '.gsap-hero-container',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 4. Staggered Listings Cards Reveal
      const cards = gsap.utils.toArray('.gsap-property-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#listings-container',
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 5. Neighborhood Cards Stagger
      const nhCards = gsap.utils.toArray('.gsap-neighborhood-card');
      if (nhCards.length > 0) {
        gsap.fromTo(
          nhCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.gsap-neighborhood-section',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 6. Agent Section Parallax & Reveal
      const agentCard = document.querySelector('.gsap-agent-card');
      if (agentCard) {
        gsap.fromTo(
          agentCard,
          { opacity: 0, y: 60, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: agentCard,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 7. Testimonials Stagger
      const testimonials = gsap.utils.toArray('.gsap-testimonial-card');
      if (testimonials.length > 0) {
        gsap.fromTo(
          testimonials,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.gsap-testimonials-container',
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    // Refresh ScrollTrigger after elements render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);
}
