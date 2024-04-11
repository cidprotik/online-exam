import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="wrapper">


        <div className="page-wrapper">
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
              <div className="col">
                <div className="card radius-10 border-start border-0 border-3 border-info">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-secondary">Total Orders</p>
                        <h4 className="my-1 text-info">4805</h4>
                        <p className="mb-0 font-13">+2.5% from last week</p>
                      </div>
                      <div className="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
                        <i className="bx bxs-cart" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card radius-10 border-start border-0 border-3 border-danger">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-secondary">Total Revenue</p>
                        <h4 className="my-1 text-danger">$84,245</h4>
                        <p className="mb-0 font-13">+5.4% from last week</p>
                      </div>
                      <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
                        <i className="bx bxs-wallet" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card radius-10 border-start border-0 border-3 border-success">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-secondary">Bounce Rate</p>
                        <h4 className="my-1 text-success">34.6%</h4>
                        <p className="mb-0 font-13">-4.5% from last week</p>
                      </div>
                      <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                        <i className="bx bxs-bar-chart-alt-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card radius-10 border-start border-0 border-3 border-warning">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-secondary">Total Customers</p>
                        <h4 className="my-1 text-warning">8.4K</h4>
                        <p className="mb-0 font-13">+8.4% from last week</p>
                      </div>
                      <div className="widgets-icons-2 rounded-circle bg-gradient-blooker text-white ms-auto">
                        <i className="bx bxs-group" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/}
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="card radius-10">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="mb-0">Sales Overview</h6>
                      </div>
                      <div className="dropdown ms-auto">
                        <a
                          className="dropdown-toggle dropdown-toggle-nocaret"
                          href="#"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-horizontal-rounded font-22 text-option" />
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="javascript:;">
                              Action
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="javascript:;">
                              Another action
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <a className="dropdown-item" href="javascript:;">
                              Something else here
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="d-flex align-items-center ms-auto font-13 gap-2 my-3">
                      <span className="border px-1 rounded cursor-pointer">
                        <i
                          className="bx bxs-circle me-1"
                          style={{ color: "#14abef" }}
                        />
                        Sales
                      </span>
                      <span className="border px-1 rounded cursor-pointer">
                        <i
                          className="bx bxs-circle me-1"
                          style={{ color: "#ffc107" }}
                        />
                        Visits
                      </span>
                    </div>
                    <div className="chart-container-1">
                      <canvas id="chart1" />
                    </div>
                  </div>
                  <div className="row row-cols-1 row-cols-md-3 row-cols-xl-3 g-0 row-group text-center border-top">
                    <div className="col">
                      <div className="p-3">
                        <h5 className="mb-0">24.15M</h5>
                        <small className="mb-0">
                          Overall Visitor{" "}
                          <span>
                            {" "}
                            <i className="bx bx-up-arrow-alt align-middle" />{" "}
                            2.43%
                          </span>
                        </small>
                      </div>
                    </div>
                    <div className="col">
                      <div className="p-3">
                        <h5 className="mb-0">12:38</h5>
                        <small className="mb-0">
                          Visitor Duration{" "}
                          <span>
                            {" "}
                            <i className="bx bx-up-arrow-alt align-middle" />{" "}
                            12.65%
                          </span>
                        </small>
                      </div>
                    </div>
                    <div className="col">
                      <div className="p-3">
                        <h5 className="mb-0">639.82</h5>
                        <small className="mb-0">
                          Pages/Visit{" "}
                          <span>
                            {" "}
                            <i className="bx bx-up-arrow-alt align-middle" />{" "}
                            5.62%
                          </span>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="card radius-10">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="mb-0">Trending Products</h6>
                      </div>
                      <div className="dropdown ms-auto">
                        <a
                          className="dropdown-toggle dropdown-toggle-nocaret"
                          href="#"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-horizontal-rounded font-22 text-option" />
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="javascript:;">
                              Action
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="javascript:;">
                              Another action
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <a className="dropdown-item" href="javascript:;">
                              Something else here
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="chart-container-2 mt-4">
                      <canvas id="chart2" />
                    </div>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
                      Jeans{" "}
                      <span className="badge bg-success rounded-pill">25</span>
                    </li>
                    <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
                      T-Shirts{" "}
                      <span className="badge bg-danger rounded-pill">10</span>
                    </li>
                    <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
                      Shoes{" "}
                      <span className="badge bg-primary rounded-pill">65</span>
                    </li>
                    <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
                      Lingerie{" "}
                      <span className="badge bg-warning text-dark rounded-pill">
                        14
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/*end row*/}
            <div className="card radius-10">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <h6 className="mb-0">Recent Orders</h6>
                  </div>
                  <div className="dropdown ms-auto">
                    <a
                      className="dropdown-toggle dropdown-toggle-nocaret"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="bx bx-dots-horizontal-rounded font-22 text-option" />
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="javascript:;">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="javascript:;">
                          Another action
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="javascript:;">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Product</th>
                        <th>Photo</th>
                        <th>Product ID</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Shipping</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Iphone 5</td>
                        <td>
                          <img
                            src="assets/images/products/01.png"
                            className="product-img-2"
                            alt="product img"
                          />
                        </td>
                        <td>#9405822</td>
                        <td>
                          <span className="badge bg-gradient-quepal text-white shadow-sm w-100">
                            Paid
                          </span>
                        </td>
                        <td>$1250.00</td>
                        <td>03 Feb 2020</td>
                        <td>
                          <div className="progress" style={{ height: 6 }}>
                            <div
                              className="progress-bar bg-gradient-quepal"
                              role="progressbar"
                              style={{ width: "100%" }}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Earphone GL</td>
                        <td>
                          <img
                            src="assets/images/products/02.png"
                            className="product-img-2"
                            alt="product img"
                          />
                        </td>
                        <td>#8304620</td>
                        <td>
                          <span className="badge bg-gradient-blooker text-white shadow-sm w-100">
                            Pending
                          </span>
                        </td>
                        <td>$1500.00</td>
                        <td>05 Feb 2020</td>
                        <td>
                          <div className="progress" style={{ height: 6 }}>
                            <div
                              className="progress-bar bg-gradient-blooker"
                              role="progressbar"
                              style={{ width: "60%" }}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>HD Hand Camera</td>
                        <td>
                          <img
                            src="assets/images/products/03.png"
                            className="product-img-2"
                            alt="product img"
                          />
                        </td>
                        <td>#4736890</td>
                        <td>
                          <span className="badge bg-gradient-bloody text-white shadow-sm w-100">
                            Failed
                          </span>
                        </td>
                        <td>$1400.00</td>
                        <td>06 Feb 2020</td>
                        <td>
                          <div className="progress" style={{ height: 6 }}>
                            <div
                              className="progress-bar bg-gradient-bloody"
                              role="progressbar"
                              style={{ width: "70%" }}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Clasic Shoes</td>
                        <td>
                          <img
                            src="assets/images/products/04.png"
                            className="product-img-2"
                            alt="product img"
                          />
                        </td>
                        <td>#8543765</td>
                        <td>
                          <span className="badge bg-gradient-quepal text-white shadow-sm w-100">
                            Paid
                          </span>
                        </td>
                        <td>$1200.00</td>
                        <td>14 Feb 2020</td>
                        <td>
                          <div className="progress" style={{ height: 6 }}>
                            <div
                              className="progress-bar bg-gradient-quepal"
                              role="progressbar"
                              style={{ width: "100%" }}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Sitting Chair</td>
                        <td>
                          <img
                            src="assets/images/products/06.png"
                            className="product-img-2"
                            alt="product img"
                          />
                        </td>
                        <td>#9629240</td>
                        <td>
                          <span className="badge bg-gradient-blooker text-white shadow-sm w-100">
                            Pending
                          </span>
                        </td>
                        <td>$1500.00</td>
                        <td>18 Feb 2020</td>
                        <td>
                          <div className="progress" style={{ height: 6 }}>
                            <div
                              className="progress-bar bg-gradient-blooker"
                              role="progressbar"
                              style={{ width: "60%" }}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Hand Watch</td>
                        <td>
                          <img
                            src="assets/images/products/05.png"
                            className="product-img-2"
                            alt="product img"
                          />
                        </td>
                        <td>#8506790</td>
                        <td>
                          <span className="badge bg-gradient-bloody text-white shadow-sm w-100">
                            Failed
                          </span>
                        </td>
                        <td>$1800.00</td>
                        <td>21 Feb 2020</td>
                        <td>
                          <div className="progress" style={{ height: 6 }}>
                            <div
                              className="progress-bar bg-gradient-bloody"
                              role="progressbar"
                              style={{ width: "40%" }}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-7 col-xl-8 d-flex">
                <div className="card radius-10 w-100">
                  <div className="card-header bg-transparent">
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="mb-0">Recent Orders</h6>
                      </div>
                      <div className="dropdown ms-auto">
                        <a
                          className="dropdown-toggle dropdown-toggle-nocaret"
                          href="#"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-horizontal-rounded font-22 text-option" />
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="javascript:;">
                              Action
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="javascript:;">
                              Another action
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <a className="dropdown-item" href="javascript:;">
                              Something else here
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-7 col-xl-8 border-end">
                        <div id="geographic-map-2" />
                      </div>
                      <div className="col-lg-5 col-xl-4">
                        <div className="mb-4">
                          <p className="mb-2">
                            <i className="flag-icon flag-icon-us me-1" /> USA{" "}
                            <span className="float-end">70%</span>
                          </p>
                          <div className="progress" style={{ height: 7 }}>
                            <div
                              className="progress-bar bg-primary progress-bar-striped"
                              role="progressbar"
                              style={{ width: "70%" }}
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="mb-2">
                            <i className="flag-icon flag-icon-ca me-1" /> Canada{" "}
                            <span className="float-end">65%</span>
                          </p>
                          <div className="progress" style={{ height: 7 }}>
                            <div
                              className="progress-bar bg-danger progress-bar-striped"
                              role="progressbar"
                              style={{ width: "65%" }}
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="mb-2">
                            <i className="flag-icon flag-icon-gb me-1" />{" "}
                            England <span className="float-end">60%</span>
                          </p>
                          <div className="progress" style={{ height: 7 }}>
                            <div
                              className="progress-bar bg-success progress-bar-striped"
                              role="progressbar"
                              style={{ width: "60%" }}
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="mb-2">
                            <i className="flag-icon flag-icon-au me-1" />{" "}
                            Australia <span className="float-end">55%</span>
                          </p>
                          <div className="progress" style={{ height: 7 }}>
                            <div
                              className="progress-bar bg-warning progress-bar-striped"
                              role="progressbar"
                              style={{ width: "55%" }}
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="mb-2">
                            <i className="flag-icon flag-icon-in me-1" /> India{" "}
                            <span className="float-end">50%</span>
                          </p>
                          <div className="progress" style={{ height: 7 }}>
                            <div
                              className="progress-bar bg-info progress-bar-striped"
                              role="progressbar"
                              style={{ width: "50%" }}
                            />
                          </div>
                        </div>
                        <div className="mb-0">
                          <p className="mb-2">
                            <i className="flag-icon flag-icon-cn me-1" /> China{" "}
                            <span className="float-end">45%</span>
                          </p>
                          <div className="progress" style={{ height: 7 }}>
                            <div
                              className="progress-bar bg-dark progress-bar-striped"
                              role="progressbar"
                              style={{ width: "45%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-5 col-xl-4 d-flex">
                <div className="card w-100 radius-10">
                  <div className="card-body">
                    <div className="card radius-10 border shadow-none">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div>
                            <p className="mb-0 text-secondary">Total Likes</p>
                            <h4 className="my-1">45.6M</h4>
                            <p className="mb-0 font-13">+6.2% from last week</p>
                          </div>
                          <div className="widgets-icons-2 bg-gradient-cosmic text-white ms-auto">
                            <i className="bx bxs-heart-circle" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card radius-10 border shadow-none">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div>
                            <p className="mb-0 text-secondary">Comments</p>
                            <h4 className="my-1">25.6K</h4>
                            <p className="mb-0 font-13">+3.7% from last week</p>
                          </div>
                          <div className="widgets-icons-2 bg-gradient-ibiza text-white ms-auto">
                            <i className="bx bxs-comment-detail" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card radius-10 mb-0 border shadow-none">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div>
                            <p className="mb-0 text-secondary">Total Shares</p>
                            <h4 className="my-1">85.4M</h4>
                            <p className="mb-0 font-13">+4.6% from last week</p>
                          </div>
                          <div className="widgets-icons-2 bg-gradient-moonlit text-white ms-auto">
                            <i className="bx bxs-share-alt" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/}
            <div className="row row-cols-1 row-cols-lg-3">
              <div className="col d-flex">
                <div className="card radius-10 w-100">
                  <div className="card-body">
                    <p className="font-weight-bold mb-1 text-secondary">
                      Weekly Revenue
                    </p>
                    <div className="d-flex align-items-center mb-4">
                      <div>
                        <h4 className="mb-0">$89,540</h4>
                      </div>
                      <div className>
                        <p className="mb-0 align-self-center font-weight-bold text-success ms-2">
                          4.4% <i className="bx bxs-up-arrow-alt mr-2" />
                        </p>
                      </div>
                    </div>
                    <div className="chart-container-0">
                      <canvas id="chart3" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col d-flex">
                <div className="card radius-10 w-100">
                  <div className="card-header bg-transparent">
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="mb-0">Orders Summary</h6>
                      </div>
                      <div className="dropdown ms-auto">
                        <a
                          className="dropdown-toggle dropdown-toggle-nocaret"
                          href="#"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-horizontal-rounded font-22 text-option" />
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="javascript:;">
                              Action
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="javascript:;">
                              Another action
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <a className="dropdown-item" href="javascript:;">
                              Something else here
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="chart-container-1">
                      <canvas id="chart4" />
                    </div>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
                      Completed{" "}
                      <span className="badge bg-gradient-quepal rounded-pill">
                        25
                      </span>
                    </li>
                    <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
                      Pending{" "}
                      <span className="badge bg-gradient-ibiza rounded-pill">
                        10
                      </span>
                    </li>
                    <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
                      Process{" "}
                      <span className="badge bg-gradient-deepblue rounded-pill">
                        65
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col d-flex">
                <div className="card radius-10 w-100">
                  <div className="card-header bg-transparent">
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="mb-0">Top Selling Categories</h6>
                      </div>
                      <div className="dropdown ms-auto">
                        <a
                          className="dropdown-toggle dropdown-toggle-nocaret"
                          href="#"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-horizontal-rounded font-22 text-option" />
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="javascript:;">
                              Action
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="javascript:;">
                              Another action
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <a className="dropdown-item" href="javascript:;">
                              Something else here
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="chart-container-0">
                      <canvas id="chart5" />
                    </div>
                  </div>
                  <div className="row row-group border-top g-0">
                    <div className="col">
                      <div className="p-3 text-center">
                        <h4 className="mb-0 text-danger">$45,216</h4>
                        <p className="mb-0">Clothing</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="p-3 text-center">
                        <h4 className="mb-0 text-success">$68,154</h4>
                        <p className="mb-0">Electronic</p>
                      </div>
                    </div>
                  </div>
                  {/*end row*/}
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
        </div>
      
    </>
  );
}

export default App;
