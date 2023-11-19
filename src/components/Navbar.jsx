import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import './contribute.css';

import { logo } from "../assets"
import { Link, useLocation } from "react-router-dom";

    // eslint-disable-next-line react/prop-types
    const NavBarItem = ({ title, classprops, to }) => { // Add a new "to" prop for the URL
        const location = useLocation();

        // Check if the current location matches the "to" prop
        const isActive = location.pathname === to;

        return (
            <li className={`mx-4 cursor-pointer ${classprops}`}>
                <Link to={to} className={`${isActive ? "text-black font-semibold border-b-2 border-blue-400" : "text-white"}`}>
                    {title}
                </Link>
            </li>
        );
    }



  function abbreviate(address) {
    let addr, start, end, abbr
  
    addr = address
    start = addr.substring(0, 4)
    end = addr.substring((addr.length - 4), addr.length)
    abbr = start + '...' + end
  
    return abbr
  }
  
  function isMobile(dimensions) {
    return dimensions.width < 1000
  }
  








export default function Navbar({
    // eslint-disable-next-line react/prop-types
    dimensions,
    account,
    onConnect,
    network
}) {

    const [toggleMenu, setToggleMenu] = React.useState(false);

    return (
        <nav className="flex-center fixed top-0 z-50 w-full border-b-2 border-black-200 bg-black-100 py-2 text-black eth-card">
            <div className="flex-between mx-auto w-full max-w-screen-2xl px-6 xs:px-8 sm:px-16 p-4 flex md:justify-center justify-between items-center ">
                <div className="md:flex-[0.75] flex-initial flex items-center justify-center md:justify-start">
                    <Link to='/' className="md:flex-[0.75] flex-initial flex items-center justify-center md:justify-start" >
                        <img src={logo} width={55} height={40} alt="logo" className="w-22 cursor-pointer" />
                        <p className="text-gradient_blue-purple text-[32px] ml-2">ETHGlobal</p>
                    </Link>
                </div>


                <ul className="text-black md:flex hidden list-none flex-row justify-center items-center flex-initial ml-8 md:ml-12 left-[40px]">
                    {[
                        { title: "Pay Debt", to: "/paydebt" },
                        { title: "Withdraw", to: "/withdraw" },
                        { title: "Rewards", to: "/stake" },

                    ].map((item, index) => (
                        <NavBarItem key={item.title + index} title={item.title} to={item.to} /> // Pass the URL as "to" prop
                    ))}
                </ul>

               


                <div className="flex relative">
                    {!toggleMenu && (
                        <HiMenuAlt4 fontSize={28} className="text-black md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
                    )}
                    {toggleMenu && (
                        <AiOutlineClose fontSize={28} className="text-black md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                    )}
                    {toggleMenu && (
                        <ul
                            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
                        >
                            <li className="text-xl w-full text-black my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
                            {[
                                { title: "Mint DAI", to: "/" },
                                { title: "Pay Debt", to: "/paydebt" },
                                { title: "Withdraw", to: "/withdraw" },
                                { title: "Rewards", to: "/stak" },
                               
                                
                            ].map(
                                (item, index) => <NavBarItem key={item.title + index} title={item.title} to={item.to} classprops="my-2 text-lg" />,
                            )}
                        </ul>
                    )}
                </div>

                



                <div className="flex justify-end items-center md:flex-initial md:block ">
                    <div  className="flex-links">
                        {account ?
                            <div className='flex default'>
                                <div className='flex default panel padded nav-wallet'>

                                    <div className="small-icon w-embed">
                                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_55_56)">
                                                <path d="M8.57143 3.5C8.57143 3.15528 8.50492 2.81394 8.37569 2.49546C8.24646 2.17698 8.05705 1.8876 7.81827 1.64384C7.5795 1.40009 7.29602 1.20673 6.98404 1.07482C6.67206 0.942898 6.33769 0.875 6 0.875C5.66232 0.875 5.32794 0.942898 5.01596 1.07482C4.70398 1.20673 4.4205 1.40009 4.18173 1.64384C3.94295 1.8876 3.75354 2.17698 3.62431 2.49546C3.49508 2.81394 3.42857 3.15528 3.42857 3.5C3.42857 3.84472 3.49508 4.18606 3.62431 4.50454C3.75354 4.82302 3.94295 5.1124 4.18173 5.35616C4.4205 5.59991 4.70398 5.79327 5.01596 5.92518C5.32794 6.0571 5.66232 6.125 6 6.125C6.33769 6.125 6.67206 6.0571 6.98404 5.92518C7.29602 5.79327 7.5795 5.59991 7.81827 5.35616C8.05705 5.1124 8.24646 4.82302 8.37569 4.50454C8.50492 4.18606 8.57143 3.84472 8.57143 3.5ZM2.57143 3.5C2.57143 2.57174 2.93265 1.6815 3.57563 1.02513C4.21862 0.368749 5.09069 0 6 0C6.90931 0 7.78138 0.368749 8.42437 1.02513C9.06735 1.6815 9.42857 2.57174 9.42857 3.5C9.42857 4.42826 9.06735 5.3185 8.42437 5.97487C7.78138 6.63125 6.90931 7 6 7C5.09069 7 4.21862 6.63125 3.57563 5.97487C2.93265 5.3185 2.57143 4.42826 2.57143 3.5ZM0.857143 13.125H11.1429C11.1107 10.9457 9.36964 9.1875 7.22411 9.1875H4.77589C2.63304 9.1875 0.891964 10.9457 0.857143 13.125ZM0 13.1879C0 10.4945 2.1375 8.3125 4.77589 8.3125H7.22411C9.8625 8.3125 12 10.4945 12 13.1879C12 13.6363 11.6438 14 11.2045 14H0.795536C0.35625 14 0 13.6363 0 13.1879Z" fill="white"></path>
                                            </g>
                                            <defs>
                                                <clippath id="clip0_55_56">
                                                    <rect width="12" height="14" fill="white"></rect>
                                                </clippath>
                                            </defs>
                                        </svg>

                                    </div>
                                    {account && ('[' + abbreviate(account) + ']')}
                                </div>
                            </div>
                            :
                            isMobile(dimensions) ?
                                network === 'Sepolia' ?
                                    <button className='oversize' onClick={onConnect} disabled={!network}>
                                        <h3 className="flex flex-row justify-center items-center my-2 bg-[#393990] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                                            Connect
                                        </h3>
                                    </button>
                                    :
                                    <h3 className="flex flex-row justify-center items-center my-2 bg-[#e32929] p-3 rounded-full cursor-pointer hover:bg-[#bd3925]">
                                        Switch to Sepolia
                                    </h3>

                                :
                                <div className='flex default panel padded center'>
                                    {network === 'Sepolia' ?
                                        <button onClick={onConnect} disabled={!network}>
                                            <h3 className="flex flex-row text-black justify-center items-center my-2 bg-[#ffffff]  p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                                                Connect Wallet
                                            </h3>
                                        </button>
                                        :
                                        <h3 className="flex flex-row justify-center items-center my-2 bg-[#e32929] p-3 rounded-full cursor-pointer hover:bg-[#bd3925]">
                                            Switch to Sepolia
                                        </h3>
                                    }
                                </div>
                        }

                       

                        

                    </div>
                </div>

                <ul className="flex-center gap-x-10 max-md:hidden  md:gap-x-10">
                    <li className="body-text text-gradient_blue-purple !font-bold">
                        <Link
                            to="https://dexscreener.com/"
                            target="_blank"
                        >
                        </Link>
                    </li>
                    
                </ul>

            </div>
        </nav>
    )
}

