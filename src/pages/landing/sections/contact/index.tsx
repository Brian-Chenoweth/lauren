import React, { useState } from 'react';
import axios from 'axios';

// Images
import palmTrees from '../../../../assets/images/contact/la-palm-trees.jpg';

// Styles
import './style.css';

// utils
import { markdownToHTML } from '../../../../utils/converter';

// Data
import contactData from '../../../../data/contact.json';

// Define form data types
type FormDataType = {
  'your-name': string;
  'your-email': string;
  'your-subject': string;
  'your-message': string;
};

const initialFormData: FormDataType = {
  'your-name': '',
  'your-email': '',
  'your-subject': '',
  'your-message': '',
};

// Define server state types
type ServerStateType = {
  submitting: boolean;
  status?: {
    ok: boolean;
    msg: string;
  } | null;
};

function Contact() {
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [serverState, setServerState] = useState<ServerStateType>({
    submitting: false,
    status: null,
  });

  // Function to handle input change
  const handleDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle server response
  const handleServerResponse = (ok: boolean, msg: string) => {
    setServerState({
      submitting: false,
      status: { ok, msg },
    });
    if (ok) {
      setFormData(initialFormData);
    }
    setTimeout(() => {
      setServerState((prev) => ({ ...prev, status: null }));
    }, 3000);
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerState({ submitting: true });

    try {
      const response = await axios.post(contactData.formspreeEndpoint, formData);
      handleServerResponse(true, 'Thank you! I will get back to you soon.');
    } catch (error) {
      handleServerResponse(false, 'Error occurred while sending');
    }
  };

  return (
    <section id="contact" className="section">
      <h2 className="title">{contactData.title}</h2>
      <div className="section-des">{contactData.description}</div>
      <div className="content-670">
        <p
          dangerouslySetInnerHTML={{
            __html: markdownToHTML(contactData.paragrapge),
          }}
        ></p>
      </div>

      <img className="block-right" src={palmTrees} alt="Los Angeles palm trees" />

      <div className="content-670">
        <div className="contact-form">
        <form name="contact" method="POST" data-netlify="true">
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
                onChange={handleDataChange}
              ></textarea>
            </p>
            <p className="contact-submit-holder">
              <input type="submit" value="SEND" />
            </p>

            {(serverState.submitting || serverState.status?.msg) && (
              <p className="respond-message">
                {serverState.submitting
                  ? 'Sending message'
                  : serverState.status
                  ? serverState.status?.msg
                  : ''}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
