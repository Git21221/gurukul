export const Login = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="flex w-full max-w-5xl">
        {/* Left Side: Branding and Illustration Placeholder */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-600">GURUKUL</h1>
            <p className="mt-4 text-gray-600">
              Let's start your career with us. Create your own website and focus
              on teaching. We handle the rest.
            </p>
            <div className="mt-8 h-64 w-full flex justify-center items-center">
              <p className="text-gray-400">[Illustration of three people]</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Welcome to GURUKUL
            </h2>

            {/* Google Sign-Up Button */}
            <button className="w-full flex items-center justify-center border border-gray-300 rounded-full py-3 mb-4 hover:bg-gray-50 transition">
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google Icon"
                className="w-5 h-5 mr-2"
              />
              <span className="text-gray-700">Continue with Google</span>
            </button>

            <div className="flex items-center justify-center my-4">
              <span className="text-gray-500">OR</span>
            </div>

            {/* Form Fields with Animation */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="email"
                  initial={{ x: 0, opacity: 1 }}
                  exit={{ x: '-100%', opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email ID
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email ID"
                    required
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="fullName"
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '-100%', opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <label
                    htmlFor="fullName"
                    className="block text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Full Name"
                    required
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="password"
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '-100%', opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <label
                    htmlFor="password"
                    className="block text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next/Register Button */}
            <button
              onClick={handleNext}
              className="w-full bg-blue-500 text-white rounded-full py-3 mt-6 hover:bg-blue-600 transition"
            >
              {step === 3 ? 'Register' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
