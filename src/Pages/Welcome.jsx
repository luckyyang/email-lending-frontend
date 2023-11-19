import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import './borrow.css';
import { logo } from '../assets'
import { Loader } from './'

//import { TransactionContext } from "../context/TransactionContext";
//import { shortenAddress } from "../utils/shortenAddress";
//import { Loader } from "./Loader";


/*"https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=023"
"https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=023"
*/

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-black";

const Input = ({ placeholder, placeholder1, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    placeholder1={placeholder1}
    type={type}
    step="0.1"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-black border-none text-sm white-glassmorphism"
  />
);




export default function Welcome({
  isLiquidated,
  healthFactor,
  balanceV2,
  totalMints,
  liquidationPrice,
  collateralAmounts,
  userCollateralValueInUsd,
  eth,
  depositAmountWETH,
  setDepositAmountWETH,
  handleDepositCollateral,
  mintAmount,
  setMintAmount,
  balance,
  isLoading,

}) {

  // Check if healthFactor is greater than 0, otherwise, set it to "0"
  const formattedHealthFactor = healthFactor && Number(healthFactor) > 0 && Number(healthFactor) <= 10000000
    ? Number(healthFactor).toLocaleString(undefined, { maximumFractionDigits: '5' })
    : "0";



  const bal2 = balanceV2 ? balanceV2 : "0";
  const ratio = (userCollateralValueInUsd / totalMints) * 100;
  const withdraw = (userCollateralValueInUsd - totalMints * 1.5) / eth
  const generate = (userCollateralValueInUsd / 1.5 - totalMints)


  const bal = balance ? balance : "0";
  const liq = liquidationPrice ? liquidationPrice : "0";
  const rat = ratio ? ratio : "0";
  const wit = withdraw ? withdraw : "0";
  const gen = generate ? generate : "0";
  const tot = totalMints ? totalMints : "0";


  return (
    <div className="">
      <div className="sm:flex flex-wrap -mx-3 mb-2 justify-between">
        <div className="sm:w-1/2 w-1/2 xl:w-[33%] px-20">
          <div className=" w-full bg-transparent  text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
            <div className="text-gray-700">

              <div className="info-container">
                <p>Liquidation Price</p>
                <div className="tooltip">
                  <BsInfoCircle fontSize={5} color="black" className="info-icon" />
                  <span className="tooltiptext">Liquidation Price: <br />
                    <small>This is the price at which your position becomes vulnerable to liquidation if the market goes against
                      you and your collateral ratio drops below the required minimum level of 150%.</small>
                  </span>
                </div>
              </div>
              <p className="font-semibold text-2xl">{Number(liq).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>
          </div>
        </div>

        <div className="sm:w-1/2 w-1/2 xl:w-[33%] px-20">
          <div className=" w-full bg-transparent text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
            <div className="text-gray-700">

              <div className="info-container">
                <p>Collateralization ratio</p>
                <div className="tooltip">
                  <BsInfoCircle fontSize={5} color="black" className="info-icon" />
                  <span className="tooltiptext">
                    Collateral Ratio: <br />
                    <small>It's a percentage that's figured out by dividing the value of your deposited ETH in USD by the
                      amount of your minted DAI. A lower Collateral Ratio implies there's less ETH supporting your DAI,
                      which raises the risk of liquidation.</small>
                  </span>
                </div>
              </div>
              <p className="text-center font-semibold text-2xl">{Number(rat).toLocaleString(undefined, { maximumFractionDigits: '2' })}&nbsp;%</p>
            </div>
          </div>
        </div>

        <div className="w-1/2 xl:w-[33%] px-20">
          <div className=" w-full bg-transparent text-blue-400 rounded-lg flex items-center p-6">
            <div className="text-gray-700">

              <div className="info-container">
                <p>Locked Collateral</p>
                <div className="tooltip">
                  <BsInfoCircle fontSize={5} color="black" className="info-icon" />
                  <span className="tooltiptext">Collateral Locked: <br />
                    <small>This represents the quantity of ETH you've securely placed into Universel Protocol as a form of
                      collateral. It's essentially a safeguarding measure to back your financial activities within the Universel
                      Protocol ecosystem. This locked collateral serves as a guarantee for transactions and loans you engage in,
                      ensuring the stability and security of the platform's operations.</small>
                  </span>
                </div>
              </div>
              <p className="text-center font-semibold text-2xl">{Number(collateralAmounts).toLocaleString(undefined, { maximumFractionDigits: '2' })}&nbsp; ETH</p>
            </div>
          </div>
        </div>

        <div className="w-1/2 xl:w-[33%] px-20">
          <div className=" w-full bg-transparent text-blue-400 rounded-lg flex items-center p-6">
            <div className="text-gray-700">

              <div className="info-container">
                <p>DAI Debt </p>
                <div className="tooltip">
                  <BsInfoCircle fontSize={5} color="black" className="info-icon" />
                  <span class="tooltiptext">
                    DAI Debt<br />
                    <small>This is the amount of debt you've incurred within the Universel Protocol ecosystem, denominated
                      in DAI (Universel Dollar). It's essentially the financial obligation you owe to the platform or other users,
                      typically arising from borrowing DAI or participating in other financial activities. Managing your DAI Debt is
                      important as it directly impacts your financial stability and ability to use the Universel Protocol platform effectively.</small>
                  </span>
                </div>
              </div>
              <p className="font-semibold text-2xl">{Number(tot).toLocaleString(undefined, { maximumFractionDigits: '2' })}&nbsp; DAI</p>
            </div>
          </div>
        </div>


        <div className="w-1/2 xl:w-[33%] px-20">
          <div className=" w-full bg-transparent text-blue-400 rounded-lg flex items-center p-6">
            <div className="text-gray-700">

              <div className="info-container">
                <p>Available to Withdraw </p>
                <div className="tooltip">
                  <BsInfoCircle fontSize={5} color="black" className="info-icon" />
                  <span class="tooltiptext">
                    Available to Withdraw<br />
                    <small>This is the portion of your assets within the Universel Protocol platform that you can take out or
                      withdraw at any given moment. It represents the funds or assets that are not currently engaged in any
                      active transactions, loans, or collateral obligations. This balance is readily accessible for you to move
                      or use outside of the platform as you see fit, providing liquidity and flexibility to your financial activities.</small>
                  </span>
                </div>
              </div>
              <p className="text-center font-semibold text-2xl">{Number(wit).toLocaleString(undefined, { maximumFractionDigits: '2' })}&nbsp; ETH</p>
            </div>
          </div>
        </div>


        <div className="w-1/2 xl:w-[33%] px-20">
          <div className=" w-full bg-transparent text-blue-400 rounded-lg flex items-center p-6">
            <div className="text-gray-700">
              <div className="info-container">
                <p className="">Available to Generate </p>
                <div className="tooltip">
                  <BsInfoCircle fontSize={5} color="black" className="info-icon" />
                  <span class="tooltiptext">
                    Available to Generate<br />
                    <small>This indicates the specific amount of DAI (Universel Dollar) that you have the
                      capability to generate within the Universel Protocol ecosystem. It represents the funds in DAI
                      that you can mint or create based on your existing collateral and financial activities within the platform.
                      This availability signifies your potential to increase your DAI holdings or participate in various financial
                      transactions within the Universel Protocol system.</small>
                  </span>
                </div>
              </div>
              <p className="text-center font-semibold text-2xl">{Number(gen).toLocaleString(undefined, { maximumFractionDigits: '2' })}&nbsp; DAI</p>
            </div>
          </div>
        </div>

      </div>





      <table className="w-full mb-10 mt-40">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Token</th>
            <th className="p-2">Minted (DAI)</th>
            <th className="p-2">Deposit ETH</th>
            <th className="p-2">Mint DAI</th>
            <th className="p-2">Deposit</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b p-2 px-5">
            <td className="p-4">
              <div className="w-6 h-6 rounded-full border-2 border-white flex justify-center items-center">
                <img fontSize={16} src="https://cryptologos.cc/logos/versions/ethereum-eth-logo-diamond-purple.svg?v=025" />ETH
              </div>

            </td>
            <td className="p-4">Minted (DAI)</td>
            <td className="p-4">
              <input
                placeholder="Amount (WETH)"
                type="number"
                step="1"
                value={depositAmountWETH}
                onChange={(e) => setDepositAmountWETH(e.target.value)}
                className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-black border-none text-sm "
              />
            </td>
            <td className="p-4">
              <input
                placeholder="Mint (DAI)"
                type="number"
                step="1"
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
                className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-black border-none text-sm "
              />
            </td>
            <td className="p-4">
              {isLoading
                ? <Loader />
                : (
                  <button
                    type="button"
                    onClick={handleDepositCollateral}
                    className="text-black w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                  >
                    Deposit Collateral
                  </button>
                )}
            </td>
          </tr>

          <tr className="border-b p-2 px-5">
            <td className="p-4">
              <div className="w-8 h-8 rounded-full border-2 border-white flex justify-center items-center">
                <img fontSize={16} src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026" /> USDC
              </div>

            </td>
            <td className="p-4">Minted (DAI)</td>
            <td className="p-4">
              <input
                placeholder="Amount (WETH)"
                type="number"
                step="1"
                value={depositAmountWETH}
                onChange={(e) => setDepositAmountWETH(e.target.value)}
                className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-black border-none text-sm "
              />
            </td>
            <td className="p-4">
              <input
                placeholder="Mint (DAI)"
                type="number"
                step="1"
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
                className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-black border-none text-sm "
              />
            </td>
            <td className="p-4">
              {isLoading
                ? <Loader />
                : (
                  <button
                    type="button"
                    onClick={handleDepositCollateral}
                    className="text-black w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                  >
                    Deposit Collateral
                  </button>
                )}
            </td>
          </tr>


        </tbody>
      </table>




    </div>
  );
}


