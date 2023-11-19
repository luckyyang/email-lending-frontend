
import Navbar from "./components/Navbar";
import Loader from './components/Loader3';
import Footer from "./components/Footer3";
import Loader1 from "./components/Loader";


import Welcome from "./Pages/Welcome";
import Stake from './Pages/Stake';
import Burnusd from './Pages/Burnusd';


//Router
import { Routes, Route } from "react-router-dom"

//hooks
import { useState, useEffect } from 'react'

import { ethers } from 'ethers';
import "./App.css";
import axios from 'axios'
import Web3 from 'web3'
import Withdraw from "./Pages/Withdraw";




function fromWei(amountOf) {
  const web3 = new Web3()
  const amountWei = amountOf.toString()
  const amountEth = web3.utils.fromWei(amountWei, 'ether')
  return amountEth
}

function toWei(amountOf) {
  const  web3      = new Web3()
  const  amountEth = amountOf.toString()
  const  amountWei = web3.utils.toWei(amountEth, 'ether')
  return amountWei  
}




const App = () => {



  const [isLoading, setIsLoading] = useState(false);
  const [network, setNetwork] = useState(undefined)
  const [account, setAccount] = useState(undefined)
  const [contract, setContract] = useState(undefined)
  const [contractV1, setContractV1] = useState(undefined)
  const [contractV2, setContractV2] = useState(undefined)
  const [contractEngine, setContractE] = useState(undefined)
  const [contractPre, setContractPre]  = useState(undefined)
  const [contractDai, setContractDai]  = useState(undefined)

  const [supply, setSupply] = useState(undefined)
  const [supplyPT, setSupplyPT] = useState(undefined)

  const [balance, setBalance] = useState(undefined)
  const [balanceV1, setBalanceV1] = useState(undefined)
  const [balanceV2, setBalanceV2] = useState(undefined)
  const [burned, setBurned] = useState(undefined)
  const [price, setPrice] = useState(undefined)
  const [priceMATICUSD, setPriceMATICUSD] = useState(undefined)

  const [totalMints, setTotalMints] = useState(undefined)
  const [healthFactor, setHealthFactor] = useState(undefined)
  const [liquidationPrice, setLiquidationPrice] = useState(undefined)
  const [collateralizationRatio, setCollateralizationRatio] = useState(undefined)
  const [unStablePrice, setUnStablePrice] = useState(undefined)
  const [collateralAmounts, setCollateralAmounts] = useState([]);
  const [availableWithdrawals, setAvailableWithdrawals] = useState([]);
  const [isLiquidated, setIsLiquidated] = useState(false);
  //const [depositAmount,          setDepositAmount]              = useState("");
  //const [withdrawAmount,         setWithdrawAmount]             = useState("");
  const [collateralId, setCollateralId] = useState(0);
  const [depositAmountUSDC, setDepositAmountUSDC] = useState('');
  const [collateralIdUSDC, setCollateralIdUSDC] = useState(0);
  const [depositAmountWETH, setDepositAmountWETH] = useState('');



  const [mintAmount, setMintAmount] = useState('');
  const [depositAmountWETHA, setDepositAmountWETHA] = useState('');
  const [collateralIdWETH, setCollateralIdWETH] = useState(1);
  // State variables for USDC withdrawal
  const [withdrawAmountUSDC, setWithdrawAmountUSDC] = useState('');
  // State variables for WETH withdrawal
  const [withdrawAmountWETH, setWithdrawAmountWETH] = useState('');

  const [userMintedUUSDByCollateral0, setUserMintedUUSDByCollateral0] = useState({});
  const [userMintedUUSDByCollateral1, setUserMintedUUSDByCollateral1] = useState({});
  const [userCollateralValueInUsd, setUserCollateralValueInUSD] = useState({});
  const [totalCollateralInUSD, setTotalCollateralInUSD] = useState({});

  const [totalCollateralValueVid0, setTotalCollateralValueVid0] = useState(0);
  const [totalCollateralValueVid1, setTotalCollateralValueVid1] = useState(0);

  const [isLocked, setIsLocked] = useState(undefined)
  const [approvedAmount, setApprovedAmount] = useState(0)

  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

  const [amountToMint, setAmountToMint] = useState('');
  const [amountToBurn, setAmountToBurn] = useState('');



  
  const [eth, setEth] = useState(undefined)


  //dimensions
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  //handle window resize (continuously)
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }

    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  })

  useEffect(() => {
    async function getBalance(atAddress) {
      try {
        if (!atAddress) {
          console.log('atAddress not defined');
          return;
        }
        if (!contract) {
          console.log('No contract detected');
          return;
        }
  
        const wei = await contract.methods.balanceOf(atAddress).call();
        const bal = wei ? fromWei(wei) : "0"; // Ensure bal is not NaN
        setBalance(bal);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }
    }, [])


  

  useEffect(() => {
    //set url
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&symbols=eth'

    //api call
    axios.get(url).then(response => {
      const eth = response.data[0].current_price
      setEth(eth)
      console.log(response.data[0].current_price)

    }).catch(error => {
      console.log(error)
    })
  }, [])





  async function onConnect() {
    //req. accounts from web3 provider
    const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

    //return if no account found
    if (!_accounts) { window.alert('[ERROR]: unable to connect: account not found'); return }

    //get account
    const atAddress = _accounts[0]

    //save in state
    setAccount(atAddress)

    //get balance uusd
    getBalance(atAddress)

    //get balance usdc
    getBalanceV2(atAddress)

    //get balance weth
    getBalanceV2(atAddress)

    getBalanceV1(atAddress)

    //get contract data
    getContractData(contract)

    //get contract data
    getContractDataP(atAddress)

    getContractDataEe(contractPre)

    getContractDataE(contractEngine)

    getContractStake(contractDai)

    getContractDai(atAddress)

    

    //debug
    console.log('connected to account', atAddress, 'on', network, 'network')
  }



  async function getBalance(atAddress) {
    try {
      if (!atAddress) {
        console.log('atAddress not defined');
        return;
      }
      if (!contract) {
        console.log('No contract detected');
        return;
      }

      const wei = await contract.methods.balanceOf(atAddress).call();
      const bal = wei ? fromWei(wei) : "0"; // Ensure bal is not NaN
      setBalance(bal);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }

  async function getBalanceV1(atAddress) {
    try {
      if (!atAddress) {
        console.log('atAddress not defined');
        return;
      }
      if (!contractV1) {
        console.log('No contract detected');
        return;
      }

      const wei = await contractV1.methods.balanceOf(atAddress).call();
      const bal = wei ? fromWei(wei) : "0"; // Ensure bal is not NaN
      setBalanceV1(bal);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }

  async function getBalanceV2(atAddress) {
    try {
      if (!atAddress) {
        console.log('atAddress not defined');
        return;
      }
      if (!contractV2) {
        console.log('No contract detected');
        return;
      }

      const wei = await contractV2.methods.balanceOf(atAddress).call();
      const bal = wei ? fromWei(wei) : "0"; // Ensure bal is not NaN
      setBalanceV2(bal);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }



  async function getContractData(atContract) {
    if (!atContract) { console.log('no contract detected'); return; }

    /*
    const rewY = await atContract.methods.rewardYield().call()
    const rate = rewY / 1000
    setRate(Number(rate))
    */

    const supplyWei = await atContract.methods.totalSupply().call()
    const supply = Number(fromWei(supplyWei))
    setSupply(supply)

    // 0x0000000000000000000000000000000000000000
    // 0x000000000000000000000000000000000000dEaD
    const burnedWei = await atContract.methods.balanceOf('0x0000000000000000000000000000000000000000').call()
    const burned = Number(fromWei(burnedWei))
    setBurned(burned)
  }

  async function getContractDataP(atAddress) {
    try {
      if (!contractPre) {
        console.log('ContractPre is not initialized.');
        return;
      }
     
      const colUsdWei = await contractPre.methods.getUserCollateralValueInUSD(atAddress).call();
      const colUsd = Number(fromWei(colUsdWei));
      console.log('User Collateral Value:', colUsd);

      setUserCollateralValueInUSD(colUsd);


      const userTotalMints = await contractPre.methods.userMintedUUSD(atAddress).call();
      //const TotalMintsValue = userTotalMints > 0 ? ethers.utils.formatUnits(userTotalMints, 18) : "0";
      const TotalMintsValue = Number(fromWei(userTotalMints));
      console.log('Total Mints:', TotalMintsValue);
      setTotalMints(TotalMintsValue);




      const userLiquidationPrice = await contractPre.methods.getLiquidationPrice(atAddress).call();
      const userCollateralizationRatio = await contractPre.methods.getCollateralizationRatio(atAddress).call();

      //const LiquidationPriceValue = userLiquidationPrice > 0 ? ethers.utils.formatUnits(userLiquidationPrice, 18) : "0";
      const LiquidationPriceValue = Number(fromWei(userLiquidationPrice));
      console.log('Liquidation Price:', LiquidationPriceValue);
      setLiquidationPrice(LiquidationPriceValue);


      //const CollateralizationRatioValue = userCollateralizationRatio > 0 ? ethers.utils.formatUnits(userCollateralizationRatio, 18) : "0";
      const CollateralizationRatioValue = Number(fromWei(userCollateralizationRatio));
      console.log('Collateralization Ratio:', (CollateralizationRatioValue/100 + 1)*100);
      setCollateralizationRatio((CollateralizationRatioValue/100 + 1)*100);

      const userHealthFactor = await contractPre.methods.getHealthFactor(atAddress).call();
      //const healthFactorValue = userHealthFactor > 0 ? ethers.utils.formatUnits(userHealthFactor, 18) : "0";
      const healthFactorValue = Number(fromWei(userHealthFactor));

      console.log('Health Factor:', healthFactorValue);
      setHealthFactor(healthFactorValue);


      const collateralAmount = await contractPre.methods.userCollateral(atAddress, 1).call();
      const collateralAmount1 = Number(fromWei(collateralAmount));
      console.log('User Collateral Value ETH:', collateralAmount1);
      setCollateralAmounts(collateralAmount1);

      const collateralAmounts1 = await Promise.all(
        Array.from({ length: 2 }, (_, i) => contractPre.methods.userCollateral(atAddress, i).call())
      );
      const collateralAmounts = collateralAmounts1.map(amount => Number(fromWei(amount)));
      console.log('User Collateral Value:', collateralAmounts);

      const availableWithdrawals1 = await Promise.all(
        Array.from({ length: 2 }, (_, i) => contractPre.methods.userCollateral(atAddress, i).call())
      );
      const availableWithdrawals = availableWithdrawals1.map(amount => Number(fromWei(amount)));
      console.log('User Collateral Value:', availableWithdrawals);

      const isLiquidated = await contractPre.methods.isLiquidated(atAddress).call();
      console.log('Is Liquidated', isLiquidated);

      
      setAvailableWithdrawals(availableWithdrawals);
      setIsLiquidated(isLiquidated);


      
    } catch (error) {
      console.error('Error fetching health factor:', error);
    }
  }

  async function getContractDataEe(contractPre) {
    if (!contractPre) { console.log('no contract detected'); return; }

    const priceWei = await contractPre.methods.unstableColPrice().call()
    //const price = priceWei > 0 ? ethers.utils.fromWei(priceWei, 18) : "0";
    const price    = Number(fromWei(priceWei))
    console.log('weth price:', price)
    setUnStablePrice(price)



    const vid0 = 0;
    const totalCollateralWeiVid0 = await contractPre.methods.totalCollateralInUSD(vid0).call();
    const totalCollateralUSDVid0 = Number(fromWei(totalCollateralWeiVid0));
    console.log('Total Collateral Value (vid=0) in USD:', totalCollateralUSDVid0);
    setTotalCollateralValueVid0(totalCollateralUSDVid0);

    const vid1 = 1;
    const totalCollateralWeiVid1 = await contractPre.methods.totalCollateralInUSD(vid1).call();
    const totalCollateralUSDVid11 = Number(fromWei(totalCollateralWeiVid1));
    const totalCollateralUSDVid1 = totalCollateralUSDVid11 * price;
    console.log('Total Collateral Value (vid=1) in USD:', totalCollateralUSDVid1);
    setTotalCollateralValueVid1(totalCollateralUSDVid1);

    const totalCol = totalCollateralUSDVid0 + totalCollateralUSDVid1;
    const totalCol1 = totalCol ? totalCol : "0";
    console.log('Total Collateral Value', totalCol1);
    setTotalCollateralInUSD(totalCol1);

  }









  async function getContractDataE(atAddress) {
    if (!contractEngine) { console.log('no contract detected'); return; }


    const supplyWei = await contractEngine.methods.getHealthFactor(atAddress).call()
    const supplyPT = Number(fromWei(supplyWei))
    setSupplyPT(supplyPT)

  }


  // Function to burn UUSD tokens works
  async function burnUusd() {
    try {
      if (!contractPre) {
        console.error('Presale contract is not initialized');
        return;
      }

      

      setIsLoading(true);
      // Approve the presale contract to spend USDC tokens
      const approvalTx = await contract.methods.approve(contractPre.options.address, Web3.utils.toWei(amountToBurn)).send({ from: account });
      await approvalTx;

      // Buy tokens from the presale contract
      const BurnTx = await contractPre.methods.burnUusd(Web3.utils.toWei(amountToBurn)).send({ from: account });
      await BurnTx;

      const userTotalMints = await contractPre.methods.userMintedUUSD(account).call();
      //const TotalMintsValue = userTotalMints > 0 ? ethers.utils.formatUnits(userTotalMints, 18) : "0";
      const TotalMintsValue = Number(fromWei(userTotalMints));
      console.log('Total Mints:', TotalMintsValue);
      setTotalMints(TotalMintsValue);

      const collateralAmount = await contractPre.methods.userCollateral(account, 1).call();
      const collateralAmount1 = Number(fromWei(collateralAmount));
      console.log('User Collateral Value ETH:', collateralAmount1);
      setCollateralAmounts(collateralAmount1);

      const wei = await contract.methods.balanceOf(account).call();
      const bal = wei ? fromWei(wei) : "0"; // Ensure bal is not NaN
      setBalance(bal);

      const wei1 = await contractV1.methods.balanceOf(account).call();
      const bal1 = wei ? fromWei(wei1) : "0"; // Ensure bal is not NaN
      setBalanceV1(bal1);

      const wei2 = await contractV2.methods.balanceOf(account).call();
      const bal2 = wei2 ? fromWei(wei2) : "0"; // Ensure bal is not NaN
      setBalanceV2(bal2);

      const userLiquidationPrice = await contractPre.methods.getLiquidationPrice(account).call();
      const userCollateralizationRatio = await contractPre.methods.getCollateralizationRatio(account).call();

      //const LiquidationPriceValue = userLiquidationPrice > 0 ? ethers.utils.formatUnits(userLiquidationPrice, 18) : "0";
      const LiquidationPriceValue = Number(fromWei(userLiquidationPrice));
      console.log('Liquidation Price:', LiquidationPriceValue);
      setLiquidationPrice(LiquidationPriceValue);

      //const CollateralizationRatioValue = userCollateralizationRatio > 0 ? ethers.utils.formatUnits(userCollateralizationRatio, 18) : "0";
      const CollateralizationRatioValue = Number(fromWei(userCollateralizationRatio));
      console.log('Collateralization Ratio:', (CollateralizationRatioValue/100 + 1)*100);
      setCollateralizationRatio((CollateralizationRatioValue/100 + 1)*100);

      const colUsdWei = await contractPre.methods.getUserCollateralValueInUSD(account).call();
      const colUsd = Number(fromWei(colUsdWei));
      console.log('User Collateral Value:', colUsd);

      setUserCollateralValueInUSD(colUsd);

      const userHealthFactor = await contractPre.methods.getHealthFactor(account).call();
      //const healthFactorValue = userHealthFactor > 0 ? ethers.utils.formatUnits(userHealthFactor, 18) : "0";
      const healthFactorValue = Number(fromWei(userHealthFactor));

      console.log('Health Factor:', healthFactorValue);
      setHealthFactor(healthFactorValue);

      console.log(`${amountToBurn} UUSD burned successfully.`);
      // You can update the UI or display a success message here

      setIsLoading(false);
      setAmountToBurn('');
    } catch (error) {
      console.error('Failed to burn UUSD:', error);
      // Handle the error and display an error message if necessary
    }
  }

  async function mintUusd() {

    try {
      if (!contractPre) {
        console.error('Presale contract is not initialized');
        return;
      }



      // Buy tokens from the presale contract
      const mintedTx = await contractPre.methods.mintUusd(ethers.utils.fromWei(amountToMint)).send({ from: account });
      await mintedTx;

      console.log(`${amountToMint} UUSD minted successfully.`);
      // You can update the UI or display a success message here

      setAmountToMint('');

    } catch (error) {
      console.error('Failed to mint UUSD:', error);
      // Handle the error and display an error message if necessary
    }
  }





  async function depositCollateral() {
    try {
      if (!contractPre || !contractV1 || !contractV2) {
        console.error('Contracts are not initialized');
        return;
      }

      // Choose the appropriate contract instance based on collateralId
      const collateralContract = collateralId === 0 ? contractV1 : contractV2;

      // Convert depositAmount to BigNumber
      const amountInWei = ethers.utils.fromWei(depositAmount.toString());

      // Check if the collateral contract is approved to spend the collateral token
      const allowance = await collateralContract.methods.allowance(account, contractPre.options.address).call();
      if (ethers.BigNumber.from(allowance).lt(amountInWei)) {
        // If not approved, perform the approval
        await collateralContract.methods.approve(contractPre.options.address, amountInWei).send({ from: account });
      }

      // Perform the deposit
      await contractPre.methods.depositCollateral(collateralId, amountInWei).send({ from: account });

      // Perform additional actions after deposit

      setDepositAmount('');
    } catch (error) {
      console.error('Error Depositing tokens:', error);
    }
  };


  const withdrawCollateralUSDC = async () => {
    try {
      if (!contractPre || !contract) {
        console.error('Contracts are not initialized');
        return;
      }
      // Choose the appropriate contract instance based on collateralId
      const collateralContract = contract;

      // Convert the withdraw amount to Wei
      const amountInWei = ethers.utils.fromWei(withdrawAmountUSDC);
      const allowance = await collateralContract.methods.allowance(account, contractPre.options.address).call();
      if (allowance < amountInWei) {
        // If not approved, perform the approval
        await collateralContract.methods.approve(contractPre.options.address, amountInWei).send({ from: account });
      }
      // Call the withdrawCollateral function on contractPre
      await contractPre.methods.withdrawCollateral(collateralIdUSDC, amountInWei).send({ from: account });

      // Perform additional actions after withdrawal
      setWithdrawAmountUSDC('');
    } catch (error) {
      console.error('Error Withdrawing tokens:', error);
    }
  };





  const withdrawCollateralWETH = async () => {
    try {
      if (!contractPre || !contract) {
        console.error('Contracts are not initialized');
        return;
      }

      // Choose the appropriate contract instance based on collateralId
      const collateralContract = contract;

      // Convert the withdraw amount to Wei
      const amountInWei = Web3.utils.toWei(withdrawAmountWETH);
      //const amountInWei = withdrawAmountWETH;

      // Fetch the unstableColPrice from contractPre
      const priceWei = await contractPre.methods.unstableColPrice().call();
      const unStablePrice = Web3.utils.toWei(priceWei); // Convert to a human-readable number

      
      console.log('Unstable price', unStablePrice)
      console.log('Amount price', amountInWei)
      

      setIsLoading(true);

      // Call the withdrawCollateral function on contractPre
      await contractPre.methods.withdrawCollateralNoBurn(collateralIdWETH, amountInWei).send({ from: account });

      // Perform additional actions after withdrawal
      // ...
      console.log(`${amountInWei} WETH successfully withdrawn.`);

      const userTotalMints = await contractPre.methods.userMintedUUSD(account).call();
      //const TotalMintsValue = userTotalMints > 0 ? ethers.utils.formatUnits(userTotalMints, 18) : "0";
      const TotalMintsValue = Number(fromWei(userTotalMints));
      console.log('Total Mints:', TotalMintsValue);
      setTotalMints(TotalMintsValue);

      const collateralAmount = await contractPre.methods.userCollateral(account, 1).call();
      const collateralAmount1 = Number(fromWei(collateralAmount));
      console.log('User Collateral Value ETH:', collateralAmount1);
      setCollateralAmounts(collateralAmount1);

      const wei = await contract.methods.balanceOf(account).call();
      const bal = wei ? fromWei(wei) : "0"; // Ensure bal is not NaN
      setBalance(bal);

      const wei1 = await contractV1.methods.balanceOf(account).call();
      const bal1 = wei ? fromWei(wei1) : "0"; // Ensure bal is not NaN
      setBalanceV1(bal1);

      const wei2 = await contractV2.methods.balanceOf(account).call();
      const bal2 = wei2 ? fromWei(wei2) : "0"; // Ensure bal is not NaN
      setBalanceV2(bal2);

      const userLiquidationPrice = await contractPre.methods.getLiquidationPrice(account).call();
      const userCollateralizationRatio = await contractPre.methods.getCollateralizationRatio(account).call();

      //const LiquidationPriceValue = userLiquidationPrice > 0 ? ethers.utils.formatUnits(userLiquidationPrice, 18) : "0";
      const LiquidationPriceValue = Number(fromWei(userLiquidationPrice));
      console.log('Liquidation Price:', LiquidationPriceValue);
      setLiquidationPrice(LiquidationPriceValue);

      //const CollateralizationRatioValue = userCollateralizationRatio > 0 ? ethers.utils.formatUnits(userCollateralizationRatio, 18) : "0";
      const CollateralizationRatioValue = Number(fromWei(userCollateralizationRatio));
      console.log('Collateralization Ratio:', (CollateralizationRatioValue/100 + 1)*100);
      setCollateralizationRatio((CollateralizationRatioValue/100 + 1)*100);

      const colUsdWei = await contractPre.methods.getUserCollateralValueInUSD(account).call();
      const colUsd = Number(fromWei(colUsdWei));
      console.log('User Collateral Value:', colUsd);

      setUserCollateralValueInUSD(colUsd);

      const userHealthFactor = await contractPre.methods.getHealthFactor(account).call();
      //const healthFactorValue = userHealthFactor > 0 ? ethers.utils.formatUnits(userHealthFactor, 18) : "0";
      const healthFactorValue = Number(fromWei(userHealthFactor));

      console.log('Health Factor:', healthFactorValue);
      setHealthFactor(healthFactorValue);








      setIsLoading(false);
      setWithdrawAmountWETH('');
    } catch (error) {
      console.error('Error Withdrawing tokens:', error);
    }
  };




  const depositCollateralUSDC = async () => {
    try {
      if (!contractPre || !contractV1) {
        console.error('Contracts are not initialized');
        return;
      }

      // Choose the appropriate contract instance based on collateralId
      const collateralContract = contractV1;


      const amountInWei = ethers.utils.fromWei(depositAmountUSDC);
      const allowance = await collateralContract.methods.allowance(account, contractPre.options.address).call();
      if (allowance < amountInWei) {
        // If not approved, perform the approval
        await collateralContract.methods.approve(contractPre.options.address, amountInWei).send({ from: account });
      }

      await contractPre.methods.depositCollateral1(collateralIdUSDC, amountInWei).send({ from: account });
      // Perform additional actions after deposit

      setDepositAmountUSDC('');
    } catch (error) {
      console.error('Error Depositing tokens:', error);
    }
  };


  const depositCollateralWETH = async () => {
    try {
      if (!contractPre || !contractV2) {
        console.error('Contracts are not initialized');
        return;
      }

      // Choose the appropriate contract instance based on collateralId
      const collateralContract = contractV2;

      const amountInWei = ethers.utils.fromWei(depositAmountWETH);
      const allowance = await collateralContract.methods.allowance(account, contractPre.options.address).call();
      if (allowance < amountInWei) {
        // If not approved, perform the approval
        await collateralContract.methods.approve(contractPre.options.address, amountInWei).send({ from: account });
      }

      await contractPre.methods.depositCollateral1(collateralIdWETH, amountInWei).send({ from: account });
      // Perform additional actions after deposit

      setDepositAmountWETH('');
    } catch (error) {
      console.error('Error Depositing tokens:', error);
    }
  };


  const handleDepositCollateral = async () => {
    try {
      if (!contractPre || !contractV2) {
        console.error('Contracts are not initialized');
        return;
      }

      // Choose the appropriate contract instance based on collateralId
      const collateralContract = contractV2;

      //const amountInWei = Number(toWei(depositAmountWETH));
      //console.log("deposit amount", depositAmountWETH);
      //console.log("deposit amount", amountInWei);
      /*
      const allowance = await collateralContract.methods.allowance(account, contractPre.options.address).call();
      if (allowance < depositAmountWETH) {
        // If not approved, perform the approval
        await collateralContract.methods.approve(contractPre.options.address, depositAmountWETH).send({ from: account });
      }
      */
      //await contractPre.methods.depositCollateral(collateralIdWETH, depositAmountWETH, Number(toWei(mintAmount))).send({ from: account });
      // Perform additional actions after deposit


      // Convert Ether to Wei
      const amountInWei = Web3.utils.toWei(depositAmountWETH, 'ether');
      const mintAmountInWei = Web3.utils.toWei(mintAmount, 'ether');

      setIsLoading(true);

      // Check allowance and approve if necessary
      const allowance = await contract.methods.allowance(account, contractPre.options.address).call();
      if (allowance < amountInWei) {
        await collateralContract.methods.approve(contractPre.options.address, amountInWei).send({ from: account });
      }

      // Call the depositCollateral function on your smart contract
      await contractPre.methods.depositCollateral(collateralIdWETH, amountInWei, mintAmountInWei).send({ from: account });

      
        
      ////////////////////////////////////////////////////////////////////////////////////////////////

      console.log(`${amountInWei} WETH successfully deposited and ${mintAmountInWei} successfully minted.`);

      const userTotalMints = await contractPre.methods.userMintedUUSD(account).call();
      //const TotalMintsValue = userTotalMints > 0 ? ethers.utils.formatUnits(userTotalMints, 18) : "0";
      const TotalMintsValue = Number(fromWei(userTotalMints));
      console.log('Total Mints:', TotalMintsValue);
      setTotalMints(TotalMintsValue);

      const collateralAmount = await contractPre.methods.userCollateral(account, 1).call();
      const collateralAmount1 = Number(fromWei(collateralAmount));
      console.log('User Collateral Value ETH:', collateralAmount1);
      setCollateralAmounts(collateralAmount1);

      const wei = await contract.methods.balanceOf(account).call();
      const bal = wei ? fromWei(wei) : "0"; // Ensure bal is not NaN
      setBalance(bal);

      const wei1 = await contractV1.methods.balanceOf(account).call();
      const bal1 = wei ? fromWei(wei1) : "0"; // Ensure bal is not NaN
      setBalanceV1(bal1);

      const wei2 = await contractV2.methods.balanceOf(account).call();
      const bal2 = wei2 ? fromWei(wei2) : "0"; // Ensure bal is not NaN
      setBalanceV2(bal2);

      const userLiquidationPrice = await contractPre.methods.getLiquidationPrice(account).call();
      const userCollateralizationRatio = await contractPre.methods.getCollateralizationRatio(account).call();

      //const LiquidationPriceValue = userLiquidationPrice > 0 ? ethers.utils.formatUnits(userLiquidationPrice, 18) : "0";
      const LiquidationPriceValue = Number(fromWei(userLiquidationPrice));
      console.log('Liquidation Price:', LiquidationPriceValue);
      setLiquidationPrice(LiquidationPriceValue);

      //const CollateralizationRatioValue = userCollateralizationRatio > 0 ? ethers.utils.formatUnits(userCollateralizationRatio, 18) : "0";
      const CollateralizationRatioValue = Number(fromWei(userCollateralizationRatio));
      console.log('Collateralization Ratio:', (CollateralizationRatioValue/100 + 1)*100);
      setCollateralizationRatio((CollateralizationRatioValue/100 + 1)*100);

      const colUsdWei = await contractPre.methods.getUserCollateralValueInUSD(account).call();
      const colUsd = Number(fromWei(colUsdWei));
      console.log('User Collateral Value:', colUsd);

      setUserCollateralValueInUSD(colUsd);

      const userHealthFactor = await contractPre.methods.getHealthFactor(account).call();
      //const healthFactorValue = userHealthFactor > 0 ? ethers.utils.formatUnits(userHealthFactor, 18) : "0";
      const healthFactorValue = Number(fromWei(userHealthFactor));

      console.log('Health Factor:', healthFactorValue);
      setHealthFactor(healthFactorValue);

      setDepositAmountWETH('');
      setMintAmount(''); // Reset mintAmount after deposit
      setIsLoading(false);
      //window.reload()
    } catch (error) {
      console.error('Error Depositing tokens:', error);
    }
  };


  const handleStakeDai = async (amount) => {
    try {
      if (!contractDai) {
        console.error('Contracts are not initialized');
        return;
      }
  
      // Check if the provided amount is valid
      if (isNaN(amount) || amount <= 0) {
        console.error('Invalid staking amount');
        return;
      }
  
      // Convert the amount to the required format (e.g., wei)
      const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
  
      // Perform the stake operation
      const tx = await contractDai.methods.stake(amountInWei).send({
        from: account, // Use the current user's wallet address
        gas: 200000, // Set an appropriate gas limit
      });
  
      console.log('Stake Transaction Hash:', tx.transactionHash);
  
      console.log('Transaction Receipt:', tx);
  
    } catch (error) {
      console.error('Error Staking tokens:', error);
    }
  };
  
  const handleWithdrawDai = async (amount) => {
    try {
      if (!contractDai) {
        console.error('Contracts are not initialized');
        return;
      }
  
      // Check if the provided amount is valid
      if (isNaN(amount) || amount <= 0) {
        console.error('Invalid withdrawal amount');
        return;
      }
  
      // Convert the amount to the required format (e.g., wei)
      const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
  
      // Perform the withdraw operation
      const tx = await contractDai.methods.withdraw(amountInWei).send({
        from: account, // Use the current user's wallet address
        gas: 200000, // Set an appropriate gas limit
      });
  
      console.log('Withdraw Transaction Hash:', tx.transactionHash);
  
      console.log('Transaction Receipt:', tx);
  
    } catch (error) {
      console.error('Error Withdrawing tokens:', error);
    }
  };
  


  return (
    <main>
      <div className='main'>
        <div className='gradient' />
      </div>




      <Loader
        setNetwork={setNetwork}
        setContract={setContract}
        setContractV1={setContractV1}
        setContractV2={setContractV2}
        getContractData={getContractData}
        getContractDataP={getContractDataP}
        getContractDataE={getContractDataE}
        setContractPre={setContractPre}
        setContractE={setContractE}
        
        setContractDai={setContractDai}
      />

      <div className='app'>
        <Navbar
          dimensions={dimensions}
          account={account}
          onConnect={onConnect}
          network={network}
         
        />
        
        {/** <Hero />
        

       */}

        <div className="lg:flex mt-10">
          <p className="w-full xl:w-[50%] text-3xl font-semibold mb-2 lg:mb-0 text-blue-600">Overview</p>
          <div className="w-1/2 xl:w-[50%] sm:w-1 sm:px-10 flex justify-start items-left">
            
          </div>
        </div>

        <div className="p-0 sm:w-96 w-full flex justify-start items-center">
          <p className="my-2 w-full p-0 outline-none bg-transparent text-black border-none text-sm"
           > 
          </p>
            <span className="absolute right-12 top-18 text-blue-600 text-[18px]">
              Current Price: 
              {Number(eth).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}  
              {/*Next Price: {Number(eth).toLocaleString('en-US', {style: 'currency', currency: 'USD'})} in 30 min */}
            </span>
        </div>


        


        <Routes>
          
         
          <Route
            path='stake'
            element={
              <Stake
                account={account}
                eth   = {eth}
                onConnect={onConnect}
                network={network}
                balance={balance}
                price={price}
                supply={supply}
                balanceV2={balanceV2}
                balanceV1={balanceV1}
                burned={burned}
                dimensions={dimensions}
                unStablePrice={unStablePrice}
                userCollateralValueInUsd={userCollateralValueInUsd}
                totalCollateralInUSD={totalCollateralInUSD}
                totalCollateralValueVid0={totalCollateralValueVid0}
                totalCollateralValueVid1={totalCollateralValueVid1}

                totalMints     = {totalMints}
                liquidationPrice   = {liquidationPrice}
                collateralAmounts    = {collateralAmounts}
                depositAmountUSDC   = {depositAmountUSDC}
                mintAmount    = {mintAmount}
                setDepositAmountUSDC = {setDepositAmountUSDC}
                setMintAmount  = {setMintAmount}
                isLoading     = {isLoading}
                handleStakeDai     = {handleStakeDai}
                handleWithdrawDai   = {handleWithdrawDai}
                
              />
            }
          />  

          <Route
            path='withdraw'
            element={
              <Withdraw
                isLoading           = {isLoading}
                account={account}
                eth   = {eth}
                onConnect={onConnect}
                network={network}
                balance={balance}
                price={price}
                supply={supply}
                balanceV2={balanceV2}
                balanceV1={balanceV1}
                burned={burned}
                dimensions={dimensions}
                unStablePrice={unStablePrice}
                userCollateralValueInUsd={userCollateralValueInUsd}
                totalCollateralInUSD={totalCollateralInUSD}
                totalCollateralValueVid0={totalCollateralValueVid0}
                totalCollateralValueVid1={totalCollateralValueVid1}
               

                totalMints                   = {totalMints}
                liquidationPrice             = {liquidationPrice}
                collateralAmounts            = {collateralAmounts}
                withdrawCollateralWETH       = {withdrawCollateralWETH}
                setWithdrawAmountWETH        = {setWithdrawAmountWETH}
                withdrawAmountWETH           = {withdrawAmountWETH}
              />
            }
          />

          
          <Route
            path='paydebt'
            element={
              <Burnusd
              isLoading       ={isLoading}
                account={account}
                eth   = {eth}
                onConnect={onConnect}
                network={network}
                balance={balance}
                price={price}
                supply={supply}
                balanceV2={balanceV2}
                balanceV1={balanceV1}
                burned={burned}
                dimensions={dimensions}
                unStablePrice={unStablePrice}
                userCollateralValueInUsd={userCollateralValueInUsd}
                totalCollateralInUSD={totalCollateralInUSD}
                totalCollateralValueVid0={totalCollateralValueVid0}
                totalCollateralValueVid1={totalCollateralValueVid1}
                

                totalMints     = {totalMints}
                liquidationPrice   = {liquidationPrice}
                collateralAmounts    = {collateralAmounts}
                burnUusd               = {burnUusd}
                setAmountToBurn       = {setAmountToBurn}
                amountToBurn        = {amountToBurn}
              />
            }
          />
          


          <Route
            path='/'
            element={
              <Welcome
                isLoading        ={isLoading}
                account={account}
                onConnect={onConnect}
                network={network}
                price={price}
                supply={supply}
                healthFactor={healthFactor}
                balance={balance}
                balanceV1={balanceV1}
                balanceV2={balanceV2}
                burned={burned}
                approvedAmount={approvedAmount}
                unStablePrice={unStablePrice}
                isLiquidated={isLiquidated}
                collateralAmounts={collateralAmounts}
                availableWithdrawals={availableWithdrawals}
                depositCollateral={depositCollateral}



                collateralId={collateralId}
                setCollateralId={setCollateralId}

                depositAmountWETH={depositAmountWETH}
                setDepositAmountWETH={setDepositAmountWETH}
                collateralIdWETH={collateralIdWETH}
                setCollateralIdWETH={setCollateralIdWETH}
                depositCollateralWETH={depositCollateralWETH}

                depositAmountUSDC={depositAmountUSDC}
                setDepositAmountUSDC={setDepositAmountUSDC}
                collateralIdUSDC={collateralIdUSDC}
                setCollateralIdUSDC={setCollateralIdUSDC}
                depositCollateralUSDC={depositCollateralUSDC}

                withdrawAmountUSDC={withdrawAmountUSDC}
                setWithdrawAmountUSDC={setWithdrawAmountUSDC}
                withdrawCollateralUSDC={withdrawCollateralUSDC}

                withdrawAmountWETH={withdrawAmountWETH}
                setWithdrawAmountWETH={setWithdrawAmountWETH}
                withdrawCollateralWETH={withdrawCollateralWETH}

                userMintedUUSDByCollateral0={userMintedUUSDByCollateral0}
                userMintedUUSDByCollateral1={userMintedUUSDByCollateral1}
                totalCollateralInUSD={totalCollateralInUSD}

                

                mintUusd={mintUusd}
                burnUusd={burnUusd}
                amountToBurn={amountToBurn}
                amountToMint={amountToMint}
                setAmountToMint={setAmountToMint}
                setAmountToBurn={setAmountToBurn}

                totalMints    = {totalMints}
                liquidationPrice  = {liquidationPrice}
                userCollateralValueInUsd     = {userCollateralValueInUsd}
                eth     = {eth}

                handleDepositCollateral        = {handleDepositCollateral}
                mintAmount                     = {mintAmount}
                setMintAmount                  = {setMintAmount}
              />
            }
          />
          

          
          
        </Routes>

        <Footer 
              dimensions={dimensions}
          />
      </div>
    </main>
  );
};

export default App;
