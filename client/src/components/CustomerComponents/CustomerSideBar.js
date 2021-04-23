import React, { useState } from "react";

import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
    SubMenu
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Pool from "../../UserPool";

import { FaList } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { GrTransaction, GrNewWindow } from "react-icons/gr";
import {RiRefund2Fill} from "react-icons/ri"

import "react-pro-sidebar/dist/css/styles.css";
import "./CustomerSidebar.css";


const CustomerSideBar = () => {

    const [menuHome, setmenuHome] = useState(true)

    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
        }
    };

    return (
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
                            <MenuItem   icon={<FiHome />}>
                                <Link to="/customerhome">Home</Link>
                            </MenuItem>
                            <MenuItem  icon={<FaList />}>
                                <Link to="/customerhome/accounts">View Account Details</Link>
                            </MenuItem>
                            <MenuItem  icon={<GrNewWindow />}>
                                <Link to="/customerhome/addexternalpayee">Add/View External Payees</Link>
                            </MenuItem>
                            <MenuItem icon={<GrTransaction />}>
                                <Link to="/customerhome/newtransaction">
                                    New Transaction
                                </Link>
                            </MenuItem>                         
                            <MenuItem icon={<CgProfile />}>
                                <Link to="/customerhome/myprofile">
                                    My Profile
                                </Link>
                            </MenuItem>
                            <MenuItem  icon={<RiRefund2Fill />}>
                                <Link to="/customerhome/requestrefund">
                                    Request/Track Refund
                                </Link>
                            </MenuItem >
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
    );
};

export default CustomerSideBar;