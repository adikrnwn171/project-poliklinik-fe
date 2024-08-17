import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterDokter() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [idNumber, setIdNumber] = useState();
  const [phone, setPhone] = useState();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("address", address);
      formData.append("idNumber", idNumber);
      formData.append("phone", phone);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:8000/api/dokter/register",
        formData
      );

      navigate("/otp", { state: { email } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <body class="hold-transition register-page bg-secondary">
        <div className="register-box w-50">
          <div className="card card-outline card-primary w-75 mx-auto bg-dark">
            <div className="card-header text-center">
              <a href="#" className="h1">
                <b>POLI</b>klinik
              </a>
            </div>
            <div className="card-body">
              <h4 className="login-box-msg">Doctor's site</h4>
              <p className="login-box-msg">Register as a doctor</p>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-location-arrow" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ID Number"
                    value={idNumber}
                    onChange={(e) => {
                      setIdNumber(e.target.value);
                    }}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-address-card" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-phone-square" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                </div>
                <div className="row">
                  <div className="col-7">
                    <div className="icheck-primary">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="terms"
                        defaultValue="agree"
                      />
                      <label htmlFor="agreeTerms">
                        I agree to the <a href="#">terms</a>
                      </label>
                    </div>
                  </div>
                  {/* /.col */}
                  <div className="col-5">
                    <button type="submit" className="btn btn-primary btn-block">
                      Register
                    </button>
                  </div>
                  {/* /.col */}
                </div>
              </form>

              <a href="/dokter/login" className="text-center">
                I already have an account
              </a>
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

export default RegisterDokter;
