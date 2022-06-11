import React from "react";

export const ProjectBudgetTicker = ({dayExpenditure}) => {
    return (
        <>
        <h2>Total Expenditure for This Project:</h2>
        <h2>{dayExpenditure}</h2>
        </>
    )
}