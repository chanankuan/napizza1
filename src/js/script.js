// All nav buttons defining
const navBtns = document.querySelectorAll('.header__nav-item');

// Get header height
const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;

// Scroll to section
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    let value = btn.innerHTML;
    let scrollDiv = document.getElementById(`${value}`).offsetTop;
    window.scrollTo({ top: scrollDiv - headerHeight, behavior: 'smooth' });
  });
});

// Hamburger menu
const menuBtn = document.getElementById('hamburger-menu');
const mobileMenu = document.querySelector('.mobile-nav');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Open and close shopping cart
const cartBtn = document.getElementById('open-cart-btn');
const cartBox = document.querySelector('.cart');
const closeCartBtn = document.getElementById('close-cart-btn');

cartBtn.addEventListener('click', () => {
  cartBox.classList.add('active');
});

closeCartBtn.addEventListener('click', () => {
  cartBox.classList.remove('active');
});

// go to homepage
function goToHomePage() {
  window.location.href = '../index.html';
}

// function for sending emails via Mailgun
async function sendEmail(event) {
  event.preventDefault();

  const apiKey = env.API_KEY;
  const domain = 'antonchan.xyz';
  const from = 'napizza@antonchan.xyz';

  const to = document.getElementById('to').value;
  const subject = 'Mail check';
  const body = `Hello!\n 
  Thank you for your order`;

  const formData = new FormData();
  formData.append('from', from);
  formData.append('to', to);
  formData.append('subject', subject);
  // formData.append('v:name', name);
  formData.append('text', body);

  try {
    const response = await fetch(
      `https://api.mailgun.net/v3/${domain}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + btoa('api:' + apiKey),
        },
        body: formData,
      }
    );

    if (response.ok) {
      const jsonResponse = await response.json();
      // alert('Email sent successfully!');
      orderConfirmedModal('Your order is confirmed');
      clearAll();
    } else {
      console.error(
        'Error sending email:',
        response.status,
        response.statusText
      );
      // alert('Error sending email. Please check the console for more details.');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    // alert('Error sending email. Please check the console for more details.');
  }
}
