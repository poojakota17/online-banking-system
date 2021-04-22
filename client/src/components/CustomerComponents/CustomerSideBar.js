import React, { useState } from "react";

import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
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
    const [menuAccounts, setmenuAccounts] = useState(false)
    const [menuPayee, setmenuPayee] = useState(false)
    const [menuProfile, setmenuProfile] = useState(false)
    const [menuViewTransaction, setmenuViewTransaction] = useState(false)
    const [menuNewTransaction, setmenuNewTransaction] = useState(false)
    const [menuRefund, setmenuRefund] = useState(false)


    const setActive = (value) => {
        console.log(value);

        if(value === "account"){
            setmenuAccounts(true);
            setmenuHome(false);
            setmenuPayee(false);
            setmenuProfile(false);
            setmenuViewTransaction(false);
            setmenuNewTransaction(false);
            setmenuRefund(false);
        }
        else if(value === "home"){
            setmenuHome(true);
            setmenuAccounts(false);           
            setmenuPayee(false);
            setmenuProfile(false);
            setmenuViewTransaction(false);
            setmenuNewTransaction(false);
            setmenuRefund(false);
        }
        else if(value === "addpayee"){
            setmenuHome(false);
            setmenuAccounts(false);           
            setmenuPayee(true);
            setmenuProfile(false);
            setmenuViewTransaction(false);
            setmenuNewTransaction(false);
            setmenuRefund(false);
        }
        else if(value === "newtrans"){
            setmenuHome(false);
            setmenuAccounts(false);           
            setmenuPayee(false);
            setmenuProfile(false);
            setmenuViewTransaction(false);
            setmenuNewTransaction(true);
            setmenuRefund(false);
        }
        else if(value === "viewtrans"){
            setmenuHome(false);
            setmenuAccounts(false);           
            setmenuPayee(false);
            setmenuProfile(false);
            setmenuViewTransaction(true);
            setmenuNewTransaction(false);
            setmenuRefund(false);
        }
        else if(value === "profile"){
            setmenuHome(false);
            setmenuAccounts(false);           
            setmenuPayee(false);
            setmenuProfile(true);
            setmenuViewTransaction(false);
            setmenuNewTransaction(false);
            setmenuRefund(false);
        }
        else if(value === "refund"){
            setmenuHome(false);
            setmenuAccounts(false);           
            setmenuPayee(false);
            setmenuProfile(false);
            setmenuViewTransaction(false);
            setmenuNewTransaction(false);
            setmenuRefund(true);
        }
    }

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
                            <MenuItem  active={menuHome} onClick={() => setActive("home")} icon={<FiHome />}>
                                <Link to="/customerhome">Home</Link>
                            </MenuItem>
                            <MenuItem active={menuAccounts} onClick={() => setActive("account")} icon={<FaList />}>
                                <Link to="/customerhome/accounts">Accounts</Link>
                            </MenuItem>
                            <MenuItem active={menuPayee} onClick={() => setActive("addpayee")} icon={<GrNewWindow />}>
                                <Link to="/customerhome/addexternalpayee">Add External Payee</Link>
                            </MenuItem>
                            <MenuItem active={menuNewTransaction} onClick={() => setActive("newtrans")} icon={<GrTransaction />}>
                                <Link to="/customerhome/newtransaction">
                                    New Transaction
                                </Link>
                            </MenuItem>                         
                            <MenuItem active={menuProfile} onClick={() => setActive("profile")} icon={<CgProfile />}>
                                <Link to="/customerhome/myprofile">
                                    My Profile
                                </Link>
                            </MenuItem>
                            <MenuItem active={menuRefund} onClick={() => setActive("refund")} icon={<RiRefund2Fill />}>
                                <Link to="/customerhome/requestrefund">
                                    Request For Refund
                                </Link>
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
    );
};

export default CustomerSideBar;