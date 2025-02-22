function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = current.toString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Intersection Observer to trigger animation when stats are visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statValue = entry.target;
        const finalValue = parseInt(statValue.getAttribute("data-value"));
        statValue.classList.add("animate");
        animateValue(statValue, 0, finalValue, 2000); // 2000ms = 2 seconds
        observer.unobserve(statValue); // Only animate once
      }
    });
  },
  { threshold: 0.5 }
);

// Start observing all stat values
document.addEventListener("DOMContentLoaded", () => {
  const statValues = document.querySelectorAll(".stat-value");
  statValues.forEach((stat) => observer.observe(stat));
});
