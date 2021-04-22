import React from 'react';
import SignUpComponent from "../SignUpComponent";
import AdminSideBar from "./AdminSideBar";

export default function AddCustomer() {
    return (
        <>
            <header className="pageHeader">
                <h5 className="center">ADD CUSTOMER</h5>

            </header>
            <SignUpComponent groupname="CustomerGroup" />

        </>
    );
}