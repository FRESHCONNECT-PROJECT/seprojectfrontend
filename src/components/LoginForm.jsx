const LoginForm = () => (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form className="bg-gray-800 p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
        </div>
        <button className="bg-accent w-full p-2 text-white rounded">Login</button>
      </form>
    </div>
  );
  export default LoginForm;
  