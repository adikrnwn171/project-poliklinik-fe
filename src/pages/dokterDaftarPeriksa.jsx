import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import DokterSidebar from "../components/DokterSidebar";

function DaftarPeriksa() {
  const navigateTo = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [userData, setUserData] = useState({});
  // const [jadwalData, setJadwalData] = useState([]);
  // const [selectedPoli, setSelectedPoli] = useState("");
  // const [filteredJadwal, setFilteredJadwal] = useState([]);
  // const [selectedJadwal, setSelectedJadwal] = useState();
  // const [keluhan, setKeluhan] = useState("");
  // const [riwayatDaftar, setRiwayatDaftar] = useState([]);

  useEffect(() => {
    // Cek apakah pengguna sudah login atau memiliki token di lokal
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Jika ada token, pengguna dianggap sudah login
      // setIsLoading(false);
    }
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
                          <th>No Urut</th>
                          <th>Nama Pasien</th>
                          <th>Keluhan</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Joe</td>
                          <td>Pusing</td>
                          <td>
                            <button className="btn btn-primary">Periksa</button>
                          </td>
                        </tr>
                      </tbody>
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
