import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';

const Header = ({ children }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        const contentElement = contentRef.current;
        const handleScroll = () => {
            setIsScrolled(contentElement.scrollTop > 0);
        };

        if (contentElement) {
            contentElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (contentElement) {
                contentElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className="layout">
            <h5 className={`py-3 text-center Header ${isScrolled ? 'scrolled' : ''}`}>
                RNR Production Information Platform
            </h5>
            <div className="content" ref={contentRef}>
                {children}
            </div>
        </div>
    );
};

export default Header;