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


const AdminSideBar = () =>{
    const [menuHome, setmenuHome] = useState(true)
    const [menuAddUser, setmenuAddUser] = useState(false)
    const [menuViewTransactions, setmenuViewTransactions] = useState(false)
    const [menuProcessRefund, setmenuProcessRefund] = useState(false)
    const setActive = (value) => {
        console.log(value);

        if(value === "home"){
            setmenuHome(true)
            setmenuProcessRefund(false)
            setmenuViewTransactions(false)
            setmenuAddUser(false)

        }
        else if(value=="adduser"){
        setmenuAddUser(true)
            setmenuProcessRefund(false)
            setmenuViewTransactions(false)
            setmenuHome(false)
        }
        else if(value=="viewtransactions"){
            setmenuViewTransactions(true)
            setmenuProcessRefund(false)
            setmenuHome(false)
            setmenuAddUser(false)
        }
        else if(value=="processrefund"){
            setmenuProcessRefund(true)
            setmenuAddUser(false)
            setmenuHome(false)
            setmenuViewTransactions(false)
        }
    }
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
                            <MenuItem  active={menuHome} onClick={() => setActive("home")} icon={<FiHome />}>
                                <Link to="/bankerhome">Home</Link>
                            </MenuItem>
                            <MenuItem active={menuAddUser} onClick={() => setActive("adduser")} icon={<GrUserAdd />}>
                                <Link to="/bankerhome/addcustomer">Add Customers</Link>
                            </MenuItem>
                            <MenuItem active={menuProcessRefund} onClick={() => setActive("processrefund")} icon={<RiRefund2Fill />}>
                            <Link to="/bankerhome/processrefunds">Process Refunds</Link>
                            </MenuItem>
                            <MenuItem active={menuViewTransactions} onClick={() => setActive("viewtransactions")} icon={<GrTransaction />}>
                                <Link to="/bankerhome/viewtransactions" >View Transactions</Link>
                            </MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem icon={<FiLogOut />} onClick={logout}>Logout
                                {/*<Link to="/">LOGOUT</Link>*/}
                            </MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </>

    )

};
export default AdminSideBar;