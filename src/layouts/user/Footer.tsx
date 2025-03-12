interface props {
  theme: string;
}

const Footer = ({ theme }: props) => {
  return (
    <footer className={`${theme} text-white py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Copyright */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">
            © {new Date().getFullYear()} Riverstones. تمام حقوق محفوظ است.
          </p>
        </div>

        {/* Enamad Trust Seal */}
        <div className="text-center md:text-right">
          <a
            referrerPolicy="origin"
            target="_blank"
            href="https://trustseal.enamad.ir/?id=563905&Code=KVyTy3ZSUAedRjE9HtS9ygpxDad6YEIs"
            className="inline-block hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src="https://trustseal.enamad.ir/logo.aspx?id=563905&Code=KVyTy3ZSUAedRjE9HtS9ygpxDad6YEIs"
              alt="Trust Seal"
              className="w-24 h-24"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
