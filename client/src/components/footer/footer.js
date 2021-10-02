import React from 'react';
import './css/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-flex">
                <div className="footer-left">
                    <p>
                        Let me know if you have any questions, comments or info on how to improve any of the code in these articles.
                    </p>
                    <p>
                        I&apos;d love to know how you do it!
                    </p>
                </div>
                <div className="footer-right">
                    <address>
                        <a href={`mailto:${process.env.REACT_APP_EMAIL}`}>
                            <img src="/images/email.png" alt="Email me" className="email-icon" /><span className="contact">Contact me</span>
                        </a>
                    </address>
                </div>
            </div>
            <p className="copyright">
                &copy; 2020 ImCoding
            </p>
        </footer >
    );
};

export default Footer;
