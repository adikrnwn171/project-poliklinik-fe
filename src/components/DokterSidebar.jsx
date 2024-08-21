import { useEffect, useState } from "react";
import axios from "axios";

function DokterSidebar() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          "http://localhost:8000/api/dokter/detail",
          { headers }
        );
        setUserData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    user();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="#" className="brand-link">
          <img
            src="../dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">POLIKLINIK</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={userData.imgUrl}
                className="img-circle elevation-2"
                alt="User Image"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                {userData.dokterName}
              </a>
            </div>
          </div>
          {/* SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

              <li className="nav-item">
                <a href="/dokter/home" className="nav-link">
                  <i className="nav-icon fas fa-th" />
                  <p>Dashboard</p>
                  <span class="right badge badge-primary">Dokter</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon far fa-calendar-alt" />
                  <p>Jadwal Periksa</p>
                  <span class="right badge badge-primary">Dokter</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/dokter/list-periksa" className="nav-link">
                  <i className="nav-icon far fa-hospital" />
                  <p>Periksa Pasien</p>
                  <span class="right badge badge-primary">Dokter</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon far fa-clipboard" />
                  <p>Riwayat Pasien</p>
                  <span class="right badge badge-primary">Dokter</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon far fa-user" />
                  <p>Profil</p>
                  <span class="right badge badge-primary">Dokter</span>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </>
  );
}

export default DokterSidebar;
