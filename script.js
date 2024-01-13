// JavaScript to handle section visibility based on navbar clicks
const sections = document.querySelectorAll('section');

// Initially hide all sections except for the Home section
sections.forEach(section => {
  if (section.id !== 'home') {
    section.classList.add('hidden');
  }
});

// Event listener for navbar links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').slice(1); // Get the section ID from the href attribute
    
    // Hide all sections and show only the targeted section
    sections.forEach(section => {
      if (section.id === targetId) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });
  });
});

// change the color of the selected tab
document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll('.nav-item a');
  
  // Add click event listener to each navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Remove 'active' class from all navigation links
      navLinks.forEach(link => link.parentElement.classList.remove('active'));
      
      // Add 'active' class to the clicked navigation link
      this.parentElement.classList.add('active');
    });
  });
});
