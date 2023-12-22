import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="flex justify-center items-center mb-4">
        <div className="mr-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-400"
          >
            <FaGithub size={24} />
          </a>
        </div>
        <div className="mr-4">
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-400"
          >
            <FaTwitter size={24} />
          </a>
        </div>
        <div>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-400"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
      <p className="text-center text-sm">
        Connect with me on social media for more updates!
      </p>
      <p className="text-center text-xs">
        &copy; 2023 Your Website. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
