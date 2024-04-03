import React from "react";

interface FooterProps {
  showHeader: boolean;
}

const Footer: React.FC<FooterProps> = ({ showHeader }) => {
  if (!showHeader) {
    return null;
  }

  return (
    <footer className="mr-0 bg-gradient-to-t from-purple-500/30 to-pink-500/20 text-black py-12 flex justify-center items-center">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 cursor-pointer text-center">
              About Us
            </h3>
            <p className="text-sm text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 cursor-pointer text-center">
              Contact Us
            </h3>
            <ul className="text-sm text-center">
              <li>Email: example@example.com</li>
              <li>Phone: 123-456-7890</li>
              <li>Address: 1234 Main St, City, Country</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
