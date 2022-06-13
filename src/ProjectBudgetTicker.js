import React from "react";

export const ProjectBudgetTicker = ({projExpenditure, dayExpenditure}) => {
    return (
        <>
        <h2>Total Expenditure for This Project: ${projExpenditure}.00</h2>
        <h3>Total Expenditure of This Day: ${dayExpenditure}.00</h3>
        </>
    )
}