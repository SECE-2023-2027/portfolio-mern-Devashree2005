import React from 'react';


const Contact = () => {
  return (
    <div className="contact">
      <h1 className="title">Contact Us</h1>
      <p className="desc">We're here to help! Have questions about booking a car, managing your rental, or just want to say hi? Feel free to reach out to us!</p>

      <section className="info">
        <p><strong>📍 Address:</strong> 123 Main Street, Your City</p>
        <p><strong>📞 Phone:</strong> +1-800-123-4567</p>
        <p><strong>📧 Email:</strong> <a href="mailto:Car@carrentalapp.com" className="email">Car@carrentalapp.com</a></p>
        <p><strong>🌐 Website:</strong> <a href="https://www.carrentalapp.com" target="_blank" rel="noopener noreferrer" className="website">www.carrentalapp.com</a></p>
      </section>

      <section className="hours">
        <p>🕒 <strong>Mon-Fri:</strong> 9:00 AM – 8:00 PM</p>
        <p>🕒 <strong>Sat-Sun:</strong> 10:00 AM – 6:00 PM</p>
      </section>

      <section className="social">
        <p>Stay updated with the latest offers and news!</p>
      </section>
    </div>
  );
};

export default Contact;
