import React from 'react';
import logo from "../assets/swainLogo.png";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="bg-white backdrop-blur-sm bg-opacity-20 shadow-xl ">
            <div className="text-center">
            <a href="https://swain.netlify.app/" target="_blank" rel="noopener noreferrer">
                    <img className="w-32 mx-auto pt-10 mb-2" src={logo} alt="logo" />
                </a> 
                <div className="w-max flex items-center gap-2 mx-auto">
                    <MdEmail className="w-6" />
                    <span>aryannn.ks@gmail.com</span>
                </div>
            </div>
            <div className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-[3%] mt-12 px-1 py-10">
                <p>© 2024 SWAIN. All rights reserved.</p>
                <ul className="flex justify-center gap-4">
                    <li className='hover:contrast-150'><a href="https://linkedin.com/in/aryannn-ks/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
                    <li className='hover:contrast-150'><a href="https://github.com/AryanKumarSwain" target="_blank" rel="noopener noreferrer"><FaGithub /></a></li>
                    <li className='hover:contrast-150'><a href="https://github.com/AryanKumarSwain" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
                    <li className='hover:contrast-150'><a href="https://x.com/Aryannn_KS" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
