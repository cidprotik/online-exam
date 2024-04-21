import { React, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the visibility state
  };

  return (
    <div class="bg-forgot">
      <div class="authentication-forgot d-flex align-items-center justify-content-center">
        <div class="logincard forgot-box" style={{ width: "340px" }}>
          <div class="card-body p-3">
            <form onSubmit={handleSubmit}>
              <div class="px-2 py-4 rounded ">
                <div className="d-flex justify-content-center">
                  <img src="assets/images/cidlogo.png" width="120" alt="" />
                </div>
                <div class="my-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="my-4 position-relative">
				<input
                    type={showPassword ? "text" : "password"} // Toggle input type based on showPassword
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="position-absolute"
                    style={{ top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }} // Position the icon in the input field
                    onClick={togglePasswordVisibility} // Click to toggle visibility
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </span>
                </div>
                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn btn-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <span>Login</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
