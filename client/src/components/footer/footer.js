import React from 'react';
import './css/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left">
                &copy; 2020 imcoding
            </div>
            <div className="footer-right">
                <div className="footer-item">
                    <a href={`mailto:${process.env.REACT_APP_EMAIL}`}><img src="/images/email.png" alt="Email me" className="mr-2" /><span className="font-weight-bolder">Contact me</span></a>

                </div>
                <div className="footer-item">
                    Let me know if you have any questions, comments or info on how to improve any of the code in these articles.
                </div>
                <div>
                    I&apos;d love to know how you do it!
                </div>
            </div>
        </footer>
    );
};

export default Footer;
