import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginDokter() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [showError, setShowError] = useState();
  const navigateTo = useNavigate();

  useEffect(() => {
    let timer;
    if (error) {
      setShowError(true);
      timer = setTimeout(() => {
        setError("");
        setShowError(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/dokter/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.data.token);
      navigateTo("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <>
      <body className="hold-transition login-page bg-secondary">
        <div className="login-box">
          {/* /.login-logo */}
          <div className="card card-outline card-primary bg-dark">
            <div className="card-header text-center">
              <a href="#" className="h1">
                <b>POLI</b>klinik
              </a>
            </div>
            <div className="card-body">
              <h4 className="login-box-msg">Doctor's site</h4>
              <p className="login-box-msg">Sign in as a doctor</p>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input type="checkbox" id="remember" />
                      <label htmlFor="remember">Remember Me</label>
                    </div>
                  </div>
                  {/* /.col */}
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign In
                    </button>
                  </div>
                  {/* /.col */}
                </div>
                {error && <alert>{error}</alert>}
              </form>
              {/* /.social-auth-links */}
              <p className="mb-1">
                <a href="forgot-password.html">I forgot my password</a>
              </p>
              <p className="mb-0">
                <a href="/dokter/register" className="text-center">
                  Register a new membership
                </a>
              </p>
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </div>
        {/* /.login-box */}
      </body>
    </>
  );
}

export default LoginDokter;
