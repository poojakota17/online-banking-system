import React, { useState } from "react";

import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import {Link} from "react-router-dom";

import { GrTransaction, GrUserAdd} from "react-icons/gr";
import {RiRefund2Fill} from "react-icons/ri"

import "react-pro-sidebar/dist/css/styles.css";
import "../CustomerComponents/CustomerSidebar.css";
import Pool from "../../UserPool";
import {FiHome, FiLogOut} from "react-icons/fi";
import {MdSupervisorAccount} from "react-icons/all";


const AdminSideBar = () =>{

    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
        }
    };
    return(
        <>
            <div id="header">

                <ProSidebar>
                    <SidebarHeader>

                        <div className="logotext">

                            <p> "ABC BANK"</p>

                        </div>

                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem icon={<FiHome />}>
                                <Link to="/bankerhome">Home</Link>
                            </MenuItem>
                            <MenuItem icon={<GrUserAdd />}>
                                <Link to="/bankerhome/addcustomer">Customer Services</Link>
                            </MenuItem>
                            <MenuItem icon={<RiRefund2Fill />}>
                            <Link to="/bankerhome/processrefunds">Process Refunds</Link>
                            </MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem icon={<FiLogOut />} onClick={logout}>
                                <Link to="/">LOGOUT</Link>
                            </MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </>

    )

};
export default AdminSideBar;