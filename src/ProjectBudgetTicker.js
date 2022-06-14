import React from "react";

export const ProjectBudgetTicker = ({projExpenditure, dayExpenditure}) => {
    return (
        <>
            <div className="expenditureContainer">
                <p>Total Expenditure for This Project: ${projExpenditure}.00</p>
                <p>Total Expenditure of This Day: ${dayExpenditure}.00</p>
            </div>
        </>
    )
}