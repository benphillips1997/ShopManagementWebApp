import styled from "styled-components";
import Navbar from "../../modules/navbar";
import type { OrderStatus, PaymentStatus } from "../../enums";
import { useState } from "react";
import type { ReportDataResponse, ReportFilters } from "../../api/interfaces";
import { api } from "../../api/client";

const reportFilterDefaults: ReportFilters = {
    orderDateStart: new Date(new Date().getFullYear(), new Date().getMonth() - 1).toISOString(),
    orderDateEnd: new Date().toISOString(),
    orderStatus: 0,
    paymentStatus: 0
}

function Reports() {
    const [reportFilters, setReportFilters] = useState<ReportFilters>(reportFilterDefaults);
    const [reportData, setReportData] = useState<ReportDataResponse>();
    const [loading, setLoading] = useState(false);

    const filterReport = (event: React.SubmitEvent) => {
        event.preventDefault();
        setLoading(true);

        api.GET("/api/Report/GetFilteredOrders", { body: reportFilters }).then(response => {
            if (!response.error && response.data) {
                //setReportData(response.data.orders)
            }
            else {
                throw Error();
            }
        }).catch(error => {
            console.error(error);
        }).finally(() => setLoading(false))
    }

    return (
    <>
        <Navbar />
        <ReportDiv>
            <FilterDiv>
                <form onSubmit={filterReport}>

                </form>
            </FilterDiv>
            <ResultsDiv>
                <table>

                </table>
            </ResultsDiv>
        </ReportDiv>
    </>
    );
}

export default Reports;

const ReportDiv = styled.div`
    border: 1px solid black;
    margin: 40px;
`

const FilterDiv = styled.div`

`

const ResultsDiv = styled.div`

`