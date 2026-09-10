import styled from "styled-components";
import Navbar from "../../modules/navbar";
import { useState } from "react";
import type { Order, ReportFilters } from "../../api/interfaces";
import { api } from "../../api/client";
import Loader from "../../modules/loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { getEnumName, OrderStatus, PaymentStatus } from "../../enums";

const reportFilterDefaults: ReportFilters = {
    orderDateStart: new Date(new Date().getFullYear(), new Date().getMonth() - 1).toISOString(),
    orderDateEnd: new Date().toISOString(),
    orderStatus: 0,
    paymentStatus: 0
}

function Reports() {
    const [reportFilters, setReportFilters] = useState<ReportFilters>(reportFilterDefaults);
    const [reportData, setReportData] = useState<Order[]>();
    const [loading, setLoading] = useState(false);

    const filterReport = (event: React.SubmitEvent) => {
        event.preventDefault();
        setLoading(true);

        api.POST("/api/Report/GetFilteredOrders", { body: reportFilters }).then(response => {
            if (!response.error && response.data.success) {
                setReportData(response.data.orders);
            }
            else {
                const message = response.data.errorMessage ? response.data.errorMessage : `${response.response.status} error`;
                throw Error("Error loading report: " + message);
            }
        }).catch(error => {
            console.error(error);
        }).finally(() => setLoading(false))
    }

    return (
    <>
        <Navbar />
        <div className="center">
            <ReportDiv className="center-column">
                <FormFilter onSubmit={filterReport}>
                    <div>
                        <label htmlFor="orderStartDate">Order start date</label><br />
                        <DatePicker 
                            selected={new Date(reportFilters.orderDateStart!)}
                            onChange={(date: Date | null) => setReportFilters({ ...reportFilters, orderDateStart: date?.toISOString() })}
                            dateFormat={"dd/MM/yyyy"}                        
                        />
                    </div>
                    <div>
                        <label htmlFor="orderEndDate">Order end date</label><br />
                        <DatePicker
                            selected={new Date(reportFilters.orderDateEnd!)}
                            onChange={(date: Date | null) => setReportFilters({ ...reportFilters, orderDateEnd: date?.toISOString() })}
                            dateFormat={"dd/MM/yyyy"}
                        />
                    </div>
                    <div>
                        <label htmlFor="orderStatus">Order status</label><br />
                        <select onChange={(e) => setReportFilters({ ...reportFilters, orderStatus: +e.target.value })}>
                            {Object.entries(OrderStatus).map(([key, val]) => 
                                <option value={val}>{val === 0 ? "All" : key.charAt(0).toUpperCase() + key.slice(1)}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="paymentStatus">Payment status</label><br />
                        <select onChange={(e) => setReportFilters({ ...reportFilters, paymentStatus: +e.target.value })}>
                            {Object.entries(PaymentStatus).map(([key, val]) => 
                                <option value={val}>{val === 0 ? "All" : key.charAt(0).toUpperCase() + key.slice(1)}</option>
                            )}
                        </select>
                    </div>
                    <button type="submit">Filter</button>
                    <button type="reset" onClick={() => setReportFilters(reportFilterDefaults)}>Reset</button>
                </FormFilter>
                {!loading ? <>
                    {reportData && reportData.length > 0 ?
                        <ResultsTable>
                            <thead>
                                <tr>
                                    <th>Order date</th>
                                    <th>Order status</th>
                                    <th>Payment status</th>
                                    <th>Order address</th>
                                    <th>Order country</th>
                                    <th>Total cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map(order => 
                                    <tr>
                                        <td>{`${new Date(order.orderDate).toDateString()}`}</td>
                                        <td>{getEnumName(OrderStatus, order.orderStatus).charAt(0).toUpperCase() + getEnumName(OrderStatus, order.orderStatus).slice(1)}</td>
                                        <td>{getEnumName(PaymentStatus, order.paymentStatus).charAt(0).toUpperCase() + getEnumName(PaymentStatus, order.paymentStatus).slice(1)}</td>
                                        <td>{order.orderAddress}</td>
                                        <td>{order.orderCountry}</td>
                                        <td>£{order.totalCost}</td>
                                    </tr>
                                )}
                            </tbody>
                        </ResultsTable>
                    : <h3>No results found</h3>}
                </> : <Loader />}
            </ReportDiv>
        </div>
    </>
    );
}

export default Reports;

const ReportDiv = styled.div`
    border: 1px solid black;
    margin: 40px;
    width: 80%;
`

const FormFilter = styled.form`
    display: flex;
    justify-content: center;
    gap: 20%;
    padding: 20px;
`

const ResultsTable = styled.table`
    width: 100%;
    padding: 20px;

    & td {
        text-align: center;        
    }
`