import React from "react";
import AdminDashboardNav from "../components/AdminDashboardNav";
import "../styles/dashboardadmin.styles.css";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalSalesActions,
  getTotalProductsActions,
  getTotalUsersActions,
  getTotalOrdersActions,
  adminSalesGraphActions,
} from "../actions/dashBoardActions";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Line, Bar } from "react-chartjs-2";
import CountUp from "react-countup";

const DashboardAdmin = () => {
  const dispatch = useDispatch();

  const totalProducts = useSelector((state) => state.totalProducts);
  const {
    loading: productLoading,
    error: errorProduct,
    totalProductsCount,
  } = totalProducts;

  const totalOrders = useSelector((state) => state.totalOrders);
  const {
    loading: orderLoading,
    error: errorOrder,
    totalOrdersCount,
  } = totalOrders;

  const totalSales = useSelector((state) => state.totalSales);
  const {
    loading: totalSalestLoading,
    error: errortotalSales,
    totalSalesRupees,
  } = totalSales;

  const totalUsers = useSelector((state) => state.totalUsers);
  const {
    loading: userTotalLoading,
    error: errortotalUsers,
    totalUsersCount,
  } = totalUsers;

  const adminSalesGraph = useSelector((state) => state.adminSalesGraph);
  const {
    loading: adminSalesGraphLoading,
    error: erroradminSalesGraph,
    salesgraph,
  } = adminSalesGraph;

  useEffect(() => {
    dispatch(getTotalSalesActions());
    dispatch(getTotalProductsActions());
    dispatch(getTotalOrdersActions());
    dispatch(getTotalUsersActions());
    dispatch(adminSalesGraphActions());
  }, []);

  console.log(salesgraph);

  return (
    <div className="container">
      {orderLoading &&
        userTotalLoading &&
        totalSalestLoading &&
        productLoading && <Loader />}

      {errorOrder && <Message>{errorOrder}</Message>}
      {errortotalUsers && <Message>{errortotalUsers}</Message>}
      {errortotalSales && <Message>{errortotalSales}</Message>}
      {errorProduct && <Message>{errorProduct}</Message>}

      <AdminDashboardNav />
      <div class="row mt-3">
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card shadow-lg card-admin-dash">
            <div class="card-body p-3">
              <div class="row">
                <div class="col-8">
                  <div class="numbers">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">
                      Total Sales
                    </p>
                    <h5 class="font-weight-bolder mb-0">
                      <i class="uil uil-rupee-sign"></i>
                      <CountUp
                        start={0}
                        end={totalSalesRupees && totalSalesRupees.totalSales}
                        duration={5}
                      />
                      {/* <span class="text-success text-sm font-weight-bolder">
                        +55%
                      </span> */}
                    </h5>
                  </div>
                </div>
                <div class="col-4 text-end d-flex align-items-center justify-content-center">
                  <div class="text-center icon-dashboard-admin">
                    <i class="uil uil-chart-pie-alt orange-dash-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card shadow-lg card-admin-dash">
            <div class="card-body p-3">
              <div class="row">
                <div class="col-8">
                  <div class="numbers">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">
                      Total Users
                    </p>
                    <h5 class="font-weight-bolder mb-0">
                      <CountUp
                        start={0}
                        end={Number(
                          totalUsersCount && totalUsersCount.userCount
                        )}
                        duration={5}
                      />

                      {/* <span class="text-success text-sm font-weight-bolder">
                        +3%
                      </span> */}
                    </h5>
                  </div>
                </div>
                <div class="col-4 text-end">
                  <div class="text-center icon-dashboard-admin">
                    <i class="uil uil-user-plus green-dash-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card shadow-lg card-admin-dash">
            <div class="card-body p-3">
              <div class="row">
                <div class="col-8">
                  <div class="numbers">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">
                      Total Orders
                    </p>
                    <h5 class="font-weight-bolder mb-0">
                      + {totalOrdersCount && totalOrdersCount.orderCount}
                      {/* <span class="text-danger text-sm font-weight-bolder">
                        -2%
                      </span> */}
                    </h5>
                  </div>
                </div>
                <div class="col-4 text-end d-flex align-items-center justify-content-center">
                  <div class="col-4 text-end d-flex align-items-center justify-content-center">
                    <i class="uil uil-archive icon-dashboard-admin blue-dash-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6">
          <div class="card shadow-lg card-admin-dash">
            <div class="card-body p-3">
              <div class="row">
                <div class="col-8">
                  <div class="numbers">
                    <p class="text-sm mb-0 text-capitalize font-weight-bold">
                      Total Products
                    </p>
                    <h5 class="font-weight-bolder mb-0">
                      {totalProductsCount && totalProductsCount.productCount}
                    </h5>
                  </div>
                </div>
                <div class="col-4 text-end d-flex align-items-center justify-content-center">
                  <div class="text-center">
                    <i class="uil uil-shopping-cart icon-dashboard-admin red-dash-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {adminSalesGraphLoading && <Loader />}
      <div className="row my-3">
        <div className="col-12">
          <Card className="w-100 shadow card-admin-graph">
            <Card.Body>
              {salesgraph && (
                <Line
                  data={{
                    labels: salesgraph.map(({ _id }) => _id),
                    datasets: [
                      {
                        data: salesgraph.map(({ count }) => count),
                        label: "Order Count",
                        borderColor: "#3333ff",
                        fill: true,
                        lineTension: 0.5,
                      },

                      // {
                      //   data: dailyData.map(({ deaths }) => deaths),
                      //   label: "Infected",
                      //   borderColor: "red",
                      //   backgroundColor: "rgba(255,0,0,0.5)",
                      //   fill: true,
                      // },
                    ],
                  }}
                />
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12">
          <Card className="w-100 shadow card-admin-graph">
            <Card.Body>
              {salesgraph && (
                <Bar
                  data={{
                    labels: salesgraph.map(({ _id }) => _id),
                    datasets: [
                      {
                        data: salesgraph.map(
                          ({ totalSales }) => totalSales / 100
                        ),
                        label: "₹ Sale Per Day",
                        borderColor: "#DC143C",
                        fill: true,
                        backgroundColor: ["rgba(255, 99, 132, 0.9)"],
                      },
                      // {
                      //   data: dailyData.map(({ deaths }) => deaths),
                      //   label: "Infected",
                      //   borderColor: "red",
                      //   backgroundColor: "rgba(255,0,0,0.5)",
                      //   fill: true,
                      // },
                    ],
                  }}
                />
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-xs-12">
          <Card className="w-100 shadow card-admin-dash">
            <Card.Body></Card.Body>
          </Card>
        </div>
        <div className="col-md-4 col-xs-12">
          <Card className="w-100 shadow card-admin-dash">
            <Card.Body></Card.Body>
          </Card>
        </div>
        <div className="col-md-4 col-xs-12">
          <Card className="w-100 shadow card-admin-dash">
            <Card.Body></Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
