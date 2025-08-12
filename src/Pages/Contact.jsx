import React from 'react'


function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2>Let’s Connect 💬</h2>
        <p className="subtitle">Got feedback, ideas, or just want to say hi? Drop us a message!</p>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
