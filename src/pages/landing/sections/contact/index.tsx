import React, { useState } from 'react';

// Images
import palmTrees from '../../../../assets/images/contact/la-palm-trees.jpg';

// Styles
import './style.css';

// utils
import { markdownToHTML } from '../../../../utils/converter';

// Data
import contactData from '../../../../data/contact.json';

// ----------------

interface FormDataType {
  'your-name': string;
  'your-email': string;
  'your-subject': string;
  'your-message': string;
}

const initialFormData: FormDataType = {
  'your-name': '',
  'your-email': '',
  'your-subject': '',
  'your-message': '',
};

function Contact() {
  const [formData, setFormData] = useState<FormDataType>(initialFormData);

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="section">
      <h2 className="title">{contactData.title}</h2>
      <div className="section-des">{contactData.description}</div>
      <div className="content-670">
        <p dangerouslySetInnerHTML={{ __html: markdownToHTML(contactData.paragrapge) }}></p>
      </div>

      <img className="block-right" src={palmTrees} alt="Los Angeles palm trees" />

      <div className="content-670">
        <div className="contact-form">
          <form name="contact" method="post" data-netlify="true" onSubmit={(e) => e.preventDefault()}>
            <input type="hidden" name="form-name" value="contact" />
            <p>
              <input
                id="name"
                type="text"
                name="your-name"
                placeholder="NAME"
                required
                value={formData['your-name']}
                onChange={handleDataChange}
              />
            </p>
            <p>
              <input
                id="contact-email"
                type="email"
                name="your-email"
                placeholder="EMAIL"
                required
                value={formData['your-email']}
                onChange={handleDataChange}
              />
            </p>
            <p>
              <input
                id="subject"
                type="text"
                name="your-subject"
                placeholder="SUBJECT"
                required
                value={formData['your-subject']}
                onChange={handleDataChange}
              />
            </p>
            <p>
              <textarea
                id="message"
                name="your-message"
                placeholder="MESSAGE"
                required
                value={formData['your-message']}
                onChange={handleDataChange}></textarea>
            </p>
            <p className="contact-submit-holder">
              <input type="submit" value="SEND" />
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
