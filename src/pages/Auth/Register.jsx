import { useState } from "react";
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from "react-router-dom";

function Register() {
  // 1. Setup local state for tracking sign-up input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Pull the register function from our clean custom hook
  const { register } = useAuth();
  const navigate = useNavigate();

  // 2. Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    // Safety check: make sure passwords match before hitting the context
    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      setError("");
      setLoading(true);
      
      // Call register from context (which saves user and logs them in)
      await register(email, password);
      
      // Send them straight into the dashboard workspace
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create an account. Email might already exist.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-md p-8 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-6">
          Create Account
        </h2>

        {/* Display validation or registration errors */}
        {error && (
          <div className="p-3 mb-4 text-sm text-red-600 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition duration-200"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;