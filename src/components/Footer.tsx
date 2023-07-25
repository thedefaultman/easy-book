import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="relative w-full mx-auto max-w-7xl overflow-hidden px-6 sm:px-16 bg-[#697077] py-12">
      <div className="flex flex-col md:flex-row justify-between items-start w-full border-b-2 border-[#7F868C] pb-10 gap-2">
        <h2 className="text-neutral-300 text-lg font-medium">EASY BOOK</h2>

        <div className="flex flex-col md:flex-row gap-2 justify-start items-start">
          <div className="flex justify-center items-center border">
            <AiOutlineMail size={40} className="bg-white p-2" />
            <input
              type="text"
              placeholder="Enter your email to get the latest news."
              className="p-2 outline-none placeholder:text-xs"
            />
          </div>

          <button className="bg-blue rounded-sm px-4 py-2 text-white">
            Subscribe
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10 border-b-2 border-[#7F868C] pb-10">
        <div>
          <h3 className="text-neutral-300 text-lg font-medium">About</h3>
          <ul className="text-neutral-300 text-sm font-medium">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-neutral-300 text-lg font-medium">Contact</h3>
          <ul className="text-neutral-300 text-sm font-medium">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-neutral-300 text-lg font-medium">Social</h3>
          <ul className="text-neutral-300 text-sm font-medium">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-neutral-300 text-lg font-medium">Appstore</h3>
          <ul className="text-neutral-300 text-sm font-medium">
            <li>Appstore</li>
            <li>GooglePlay</li>
            <li>Join Us</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center w-full mt-20">
        <h4 className="font-medium text-sm text-neutral-300">
          Copyright @{new Date().getFullYear()}. All Rights Reserved
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
