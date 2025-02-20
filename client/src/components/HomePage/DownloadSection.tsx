const DownloadSection = () => {
  return (
    <div className="flex m-2 justify-center items-center h-[526px] p-5">
      <div
        className="flex w-[1480px] justify-between items-center h-full bg-cover bg-center px-10 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600"
      >
        {/* Left Text Section */}
        <div className="flex flex-col justify-center items-start w-1/2">
          <h1 className="text-4xl font-semibold text-white mb-6">
            One App, Endless Possibilities –
            <br /> Download Now!
          </h1>
          <div className="flex flex-wrap space-x-4">
            <a
              href="#"
              className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/></svg>
              </span>
              <span>Download on the App Store</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-center bg-white text-black px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            >
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6.2c0-.66.51-1.2 1.14-1.2h15.72c.63 0 1.14.54 1.14 1.2v11.6c0 .66-.51 1.2-1.14 1.2H4.14c-.63 0-1.14-.54-1.14-1.2V6.2Z"/><path d="M3 10.5h18"/></svg>
              </span>
              <span>Get it on Google Play</span>
            </a>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80"
            alt="Mobile App"
            className="max-w-md rounded-lg shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;