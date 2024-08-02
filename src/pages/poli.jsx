import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Poli() {
  const navigateTo = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("periksa token", isLoggedIn);
    // Cek apakah pengguna sudah login atau memiliki token di lokal
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Jika ada token, pengguna dianggap sudah login
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        navigateTo("/login");
      }
    }, 10); // Menunggu selama 10 milidetik sebelum dieksekusi

    return () => clearTimeout(timer); // Membersihkan timeout jika komponen unmount
  }, [isLoggedIn]);
  return (
    <>
      <body className="hold-transition sidebar-mini layout-fixed">
        <div className="wrapper">
          <Navbar />
          <Sidebar />

          {/* Content Wrapper. Contains page content */}
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0">Poli</h1>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <a href="#">Home</a>
                      </li>
                      <li className="breadcrumb-item active">Poli</li>
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
              <div className="row">
                <div className="col-4 border rounded p-0 ml-3">
                  <div className="bg-dark border rounded-top p-2">
                    <h3 className="ml-2">Daftar Poli</h3>
                  </div>
                  <form className="ml-2 mr-2 mt-4">
                    <label>Nomor Rekam Medis</label>
                    <div className="input-group mb-2">
                      <input type="text" className="form-control" readOnly />
                    </div>
                    <label>Pilih Poli</label>
                    <br />
                    <select className="input-group mb-2 mr-2">
                      <option selected>UMUM</option>
                      <option value="">THT</option>
                      <option value="">MATA</option>
                      <option value="">BEDAH</option>
                    </select>
                    <label>Pilih Jadwal</label>
                    <br />
                    <select className="input-group mb-2 mr-2">
                      <option selected>1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                      <option value="">4</option>
                    </select>
                    <label>Keluhan</label>
                    <div className="input-group mb-2">
                      <textarea type="textarea" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary mb-5">
                      Submit
                    </button>
                  </form>
                </div>
                <div className="col-7 border rounded p-0 ml-3">
                  <div className="bg-dark mb-5 border rounded-top p-2">
                    <h3 className="ml-4">Riwayat Daftar Poli</h3>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Poli</th>
                        <th scope="col">Dokter</th>
                        <th scope="col">Hari</th>
                        <th scope="col">Mulai</th>
                        <th scope="col">Selesai</th>
                        <th scope="col">Antrian</th>
                        <th scope="col">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>07.00</td>
                        <td>08.00</td>
                        <td>1</td>
                        <td>tes</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>07.00</td>
                        <td>08.00</td>
                        <td>2</td>
                        <td>tes</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        <td>07.00</td>
                        <td>08.00</td>
                        <td>3</td>
                        <td>tes</td>
                      </tr>
                    </tbody>
                  </table>
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

export default Poli;
