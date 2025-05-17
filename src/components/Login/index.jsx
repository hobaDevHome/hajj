import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg("خطأ في تسجيل الدخول. تأكد من البريد وكلمة السر.");
    } else {
      navigate("/"); // رجوع للصفحة الرئيسية بعد تسجيل الدخول
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gray-50 px-4">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-semibold text-center mb-6">
          تسجيل الدخول
        </h1>

        {errorMsg && (
          <div className="mb-4 text-red-600 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded transition"
          >
            {loading ? "جاري الدخول..." : "دخول"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center flex flex-row">
          لست مسجل؟{" "}
          <div
            onClick={() => navigate("/signup")}
            className="mx-2 bg-slate-200 cursor-pointer"
          >
            انشاء حساب
          </div>
        </p>
      </div>
    </div>
  );
}
