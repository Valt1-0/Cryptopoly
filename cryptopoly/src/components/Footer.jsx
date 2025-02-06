import * as FAIcons from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bottom-0 left-0 w-full bg-background-light text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Brand Section */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h4 className="text-2xl font-bold text-accent">Cryptopoly</h4>
          <p className="text-sm text-secondary-light mt-2">
            Empowering your Web3 journey, one block at a time.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col md:flex-row gap-6 text-sm">
          <a href="#" className="hover:text-accent transition-colors">
            Features
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            Pricing
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            Roadmap
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            Community
          </a>
        </div>

        {/* Social Media Section */}
        <div className="flex gap-4 mt-6 md:mt-0">
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center bg-accent rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <FAIcons.FaTwitter size={20} className="text-white" />
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center bg-secondary rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <FAIcons.FaTelegram size={20} className="text-white" />
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <FAIcons.FaDiscord size={20} className="text-white" />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-6 opacity-50">
        <p className="text-center text-sm text-gray-400 mt-4">
          © 2025 Cryptopoly, All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;