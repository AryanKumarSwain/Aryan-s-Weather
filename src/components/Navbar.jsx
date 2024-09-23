import React, { useEffect } from 'react';
import logo from "../assets/WWSwainLogo.png";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { VscMute } from "react-icons/vsc";
import { GoUnmute } from "react-icons/go";

const Navbar = ({ toggleMute, isMuted }) => {
    useEffect(() => {
        const logoElement = document.querySelector('.logo-dark');
        const socialIcons = document.querySelectorAll('.social-icon');

        const handleScroll = () => {
            if (window.scrollY > 50) {
                logoElement?.classList.add('glow-dark');
                
                socialIcons.forEach(icon => {
                    icon.classList.add('icon-glow-dark');
                });
            } else {
                logoElement?.classList.remove('glow-dark');
                
                socialIcons.forEach(icon => {
                    icon.classList.remove('icon-glow-dark');
                });
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className="fixed mt-2 w-full px-6 flex items-center justify-between z-50">
            <div className="flex items-center justify-center">
                <a href="https://swain.netlify.app/" target="_blank" rel="noopener noreferrer">
                    <img className="logo-dark hover:contrast-180 w-36 cursor-pointer rounded-xl p-2" src={logo} alt="logo" />
                </a>
            </div>
            
            <div className="hidden md:flex ml-auto m-6 items-center justify-center gap-4 text-2xl text-white">
                <ul className="flex m-6 items-center justify-center gap-4 text-2xl">
                    <li className="hover:contrast-150 social-icon rounded-full p-1">
                        <a href="https://linkedin.com/in/aryannn-ks/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                    </li>
                    <li className="hover:contrast-150 social-icon rounded-full p-1">
                        <a href="https://github.com/AryanKumarSwain" target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </a>
                    </li>
                    <li className="hover:contrast-150 social-icon rounded-full p-1">
                        <a href="https://instagram.com/AryanKumarSwain" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                    </li>
                    <li className="hover:contrast-150 social-icon rounded-full p-1">
                        <a href="https://x.com/Aryannn_KS" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter />
                        </a>
                    </li>
                </ul>
            </div>
            
            <button
                onClick={toggleMute}
                className="text-2xl hover:contrast-150 text-white social-icon rounded-full p-1"
            >
                {isMuted ? <VscMute /> : <GoUnmute />}
            </button>
        </nav>
    );
};

export default Navbar;
