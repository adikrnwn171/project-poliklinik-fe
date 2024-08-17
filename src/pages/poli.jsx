import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function Poli() {
  const navigateTo = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [jadwalData, setJadwalData] = useState([]);
  const [selectedPoli, setSelectedPoli] = useState("");
  const [filteredJadwal, setFilteredJadwal] = useState([]);
  const [selectedJadwal, setSelectedJadwal] = useState();
  const [keluhan, setKeluhan] = useState("");
  const [riwayatDaftar, setRiwayatDaftar] = useState([]);

  useEffect(() => {
    // Cek apakah pengguna sudah login atau memiliki token di lokal
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Jika ada token, pengguna dianggap sudah login
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        navigateTo("/login");
      }
    }, 100); // Menunggu selama 10 milidetik sebelum dieksekusi

    return () => clearTimeout(timer); // Membersihkan timeout jika komponen unmount
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          "http://localhost:8000/api/pasien/detail",
          { headers }
        );
        setUserData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchJadwal = async () => {
      try {
        const payload = await axios.get("http://localhost:8000/api/jadwal");
        setJadwalData(payload.data.message);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchUser();
    fetchJadwal();
  }, []);

  useEffect(() => {
    if (selectedPoli) {
      const filtered = jadwalData.filter(
        (jadwal) => jadwal.Dokter.Poli.namaPoli === selectedPoli
      );
      setFilteredJadwal(filtered);
    } else {
      setFilteredJadwal([]);
    }
  }, [selectedPoli]);

  const changePoli = (e) => {
    setSelectedPoli(e.target.value);
    setSelectedJadwal("");
  };

  const handleSelectJadwal = (e) => {
    setSelectedJadwal(e.target.value);
  };

  const handleKeluhan = (e) => {
    setKeluhan(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post(
        "http://localhost:8000/api/daftar",
        { idJadwal: selectedJadwal, keluhan },
        { headers }
      );

      setSelectedPoli("");
      setSelectedJadwal("");
      setKeluhan("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const riwayat = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          "http://localhost:8000/api/daftar/detail",
          { headers }
        );
        setRiwayatDaftar(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    riwayat();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                  <form className="ml-2 mr-2 mt-4" onSubmit={handleSubmit}>
                    <label>Nomor Rekam Medis</label>
                    <div className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={userData.rm}
                        readOnly
                      />
                    </div>
                    <label>Pilih Poli</label>
                    <br />
                    <select
                      className="input-group mb-2 mr-2"
                      value={selectedPoli}
                      onChange={changePoli}
                    >
                      <option value="" disabled selected>
                        PILIH POLI
                      </option>
                      <option value="Umum">UMUM</option>
                      <option value="THT">THT</option>
                      <option value="Mata">MATA</option>
                      <option value="Bedah">BEDAH</option>
                      <option value="Gigi">GIGI</option>
                      <option value="Jantung">JANTUNG</option>
                      <option value="Paru">PARU</option>
                      <option value="Penyakit Dalam">PENYAKIT DALAM</option>
                      <option value="Orthopaedi">ORTHOPAEDI</option>
                    </select>
                    <label>Pilih Jadwal</label>
                    <br />
                    <select
                      className="input-group mb-2 mr-2"
                      value={selectedJadwal}
                      onChange={handleSelectJadwal}
                    >
                      <option value="" disabled selected>
                        PILIH JADWAL
                      </option>
                      {filteredJadwal.map((jadwal) => (
                        <option key={jadwal} value={jadwal.id}>
                          {jadwal.hari} | {jadwal.jamMulai.slice(0, 5)}-
                          {jadwal.jamSelesai.slice(0, 5)} |{" "}
                          {jadwal.Dokter.dokterName}
                        </option>
                      ))}
                    </select>
                    <label>Keluhan</label>
                    <div className="input-group mb-2">
                      <textarea
                        type="textarea"
                        className="form-control"
                        onChange={handleKeluhan}
                        value={keluhan}
                      />
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
                    {riwayatDaftar.length > 0 ? (
                      <tbody>
                        {riwayatDaftar.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.JadwalPeriksa?.Dokter?.Poli.namaPoli}</td>
                            <td>{item.JadwalPeriksa?.Dokter.dokterName}</td>
                            <td>{item.JadwalPeriksa?.hari}</td>
                            <td>{item.JadwalPeriksa?.jamMulai.slice(0, 5)}</td>
                            <td>
                              {item.JadwalPeriksa?.jamSelesai.slice(0, 5)}
                            </td>
                            <td>{item.queue}</td>
                            <td>
                              <button className="btn btn-primary">
                                detail
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td colSpan="8" className="text-center">
                            Tidak ada data riwayat daftar
                          </td>
                        </tr>
                      </tbody>
                    )}
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
