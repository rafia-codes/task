const Login = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Welcome to the Intern Portal</h2>
      <button
        onClick={onLogin}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow"
      >
        Login (Dummy)
      </button>
    </div>
  );
};

export default Login;
