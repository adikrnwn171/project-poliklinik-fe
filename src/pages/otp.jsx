import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Otp() {
  const location = useLocation();
  const { email } = location.state;
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [showError, setShowError] = useState();

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

  const handleChange = (index, e) => {
    const value = e.target.value;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpString = otp.join("");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/pasien/verify",
        {
          email,
          otp: otpString,
        }
      );
      alert(
        "Verifikasi OTP sukses, Anda akan diarahkan ke halaman login dalam 3 detik"
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <body class="hold-transition register-page">
        <div className="register-box w-50">
          <div className="card card-outline card-primary w-75 mx-auto">
            <div className="card-header text-center">
              <a href="#" className="h1">
                <b>POLI</b>klinik
              </a>
            </div>
            <div className="card-body">
              <h3 className="text-center">Masukkan OTP</h3>
              <p className="login-box-msg p-0">
                Ketik 6 digit kode yang telah dikirimkan ke email : {email}
              </p>
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row">
                  {otp.map((item, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputsRef.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={item}
                      onChange={(e) => handleChange(index, e)}
                      className="w-25 m-1 text-center"
                    />
                  ))}
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </form>
              {error && <alert>{error}</alert>}
            </div>
            {/* /.form-box */}
          </div>
          {/* /.card */}
        </div>
        {/* /.register-box */}
      </body>
    </>
  );
}

export default Otp;
