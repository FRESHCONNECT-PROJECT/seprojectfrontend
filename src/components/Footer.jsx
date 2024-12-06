const Footer = () => (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-6 text-center">
      <p className="text-lg font-medium">
        © 2024 <span className="text-green-400">FreshConnect</span>. All rights reserved.
      </p>
      <div className="mt-4">
        <a href="https://www.facebook.com" className="mx-2 text-gray-400 hover:text-green-400 transition duration-300">
          Facebook
        </a>
        <a href="https://www.twitter.com" className="mx-2 text-gray-400 hover:text-blue-400 transition duration-300">
          Twitter
        </a>
        <a href="https://www.linkedin.com" className="mx-2 text-gray-400 hover:text-blue-600 transition duration-300">
          LinkedIn
        </a>
      </div>
    </footer>
  );
  
  export default Footer;
  