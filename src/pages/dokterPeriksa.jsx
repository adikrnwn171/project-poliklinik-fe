import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import DokterSidebar from "../components/DokterSidebar";
import Select from "react-select";

function PeriksaPasien() {
  const navigateTo = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [listPeriksa, setListPeriksa] = useState([]);

  const options = [
    { value: "bodrex", label: "bodrex" },
    { value: "intunal", label: "intunal" },
  ];

  useEffect(() => {
    // Cek apakah pengguna sudah login atau memiliki token di lokal
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Jika ada token, pengguna dianggap sudah login
      // setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const daftar = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          "http://localhost:8000/api/daftar/dokter",
          { headers }
        );
        setListPeriksa(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    daftar();
  }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  const style = `
  .wrapper {
    min-height: 100vh;
  }`;

  return (
    <>
      <style>{style}</style>
      <body className="hold-transition sidebar-mini layout-fixed">
        <div className="wrapper">
          <Navbar />
          <DokterSidebar />

          {/* Content Wrapper. Contains page content */}
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0">Periksa Pasien</h1>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <a href="#">Home</a>
                      </li>
                      <li className="breadcrumb-item active">Daftar Periksa</li>
                      <li className="breadcrumb-item active">Periksa Pasien</li>
                    </ol>
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row */}
              </div>
              {/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            {/* Main content */}
            <div className="container mr-0">
              <div className="card card-default col-12 pt-0">
                <div className="card-header">
                  <h2 className="card-title">Periksa Pasien</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-12">
                      <label>Nama Pasien</label>
                      <br />
                      <input
                        type="text"
                        className="col-12"
                        disabled
                        value="Joe"
                      />
                    </div>
                    <div className="form-group col-12">
                      <label>Tanggal Periksa</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          data-inputmask-alias="datetime"
                          data-inputmask-inputformat="dd/mm/yyyy"
                          data-mask
                        />
                      </div>
                    </div>
                    <div className="form-group col-12">
                      <label>Catatan</label>
                      <br />
                      <textarea type="text" className="col-12" />
                    </div>
                    <div className="form-group col-12">
                      <label>Obat</label>
                      <Select
                        styles={{ width: "100%" }}
                        className="input-group col-12"
                        multiple="multiple"
                        data-placeholder="Select a State"
                        options={options}
                      ></Select>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.content */}
            </div>
            {/* /.content-wrapper */}
          </div>
        </div>
      </body>
    </>
  );
}

export default PeriksaPasien;
