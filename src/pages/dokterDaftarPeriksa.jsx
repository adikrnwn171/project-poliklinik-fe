import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import DokterSidebar from "../components/DokterSidebar";

function DaftarPeriksa() {
  const navigateTo = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [listPeriksa, setListPeriksa] = useState([]);

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
                    <h1 className="m-0">Daftar Periksa Pasien</h1>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <a href="#">Home</a>
                      </li>
                      <li className="breadcrumb-item active">Daftar Periksa</li>
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
              <div className="row pl-3 col-12">
                <div className="card col-12">
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th className="col-2">No Urut</th>
                          <th className="col-4">Nama Pasien</th>
                          <th className="col-4">Keluhan</th>
                          <th className="col-2">Aksi</th>
                        </tr>
                      </thead>
                      {listPeriksa.length > 0 ? (
                        <tbody>
                          {listPeriksa.map((item, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item.Pasien.name}</td>
                              <td>{item.keluhan}</td>
                              <td>
                                <button className="btn btn-primary">
                                  Periksa
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      ) : (
                        <div>Tidak ada daftar periksa</div>
                      )}
                    </table>
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

export default DaftarPeriksa;
