import React from 'react'

//import misc Web3
import detectEthereumProvider from '@metamask/detect-provider'

//import contracts json
import contract_json          from '../Contracts/usdAbi.json'
import contract_token_json    from '../Contracts/tokensabi.json'
import contract_engine_json   from '../Contracts/dai_engine.json'
import contract_stake_json    from '../Contracts/stakeDai.json'

//import web3
//import { ethers } from 'ethers';
import Web3 from 'web3'


class Loader extends React.Component {

    async componentDidMount() {
        const provider = await detectEthereumProvider()
        if (provider) {
        } 
        else {console.log('No web3 provider detected. Please install MetaMask!')}

        //get web3
        const web3  = new Web3(provider)

        //get network id
        const netId = await web3.eth.net.getId()

        //empty contract instances
        let contract
        let contractV1
        let contractV2
        let contractPre
        let contractEngine
        let contractSta
        

        
        //Sepolia
        if(netId === 11155111) {
            //get rebaser V1 contract //////////////////////////////////////////////////   eth feed 0x694AA1769357215DE4FAC081bf1f309aDC325306
            const contract_abi      = contract_json
            const contract_abi_t    = contract_token_json    
            const contract_abi_e    = contract_engine_json
            const contract_abi_s    = contract_stake_json
            const contract_addr     = '0xD31C4a7810c250C546D97675adA79534Ca2E51E9' //<------------ DAI 
            const contract_addrV1   = '0xA827b8878afC04BEe542B27a9D63C22643b356bc' // <------------ usdc  
            const contract_addrV2   = '0xC026b2Adf6a73cbCF609bb771B99f80dc391Dd72' // <------------ weth 
            const contract_addrPre  = '0x8B6dD3AA74e7a432982eC615AE16a0C1Ac8Cc891' // <------------ DAI Engine   
            const contract_addrSta  = '0xf80a844B19369B7eF4a939C5A84C3A2E49B03771'  // <------------ Staking
            contract                = new web3.eth.Contract(contract_abi, contract_addr)
            contractV1              = new web3.eth.Contract(contract_abi_t, contract_addrV1)
            contractV2              = new web3.eth.Contract(contract_abi_t, contract_addrV2)
            contractEngine          = new web3.eth.Contract(contract_abi_e, contract_addrPre)
            contractPre             = new web3.eth.Contract(contract_abi_e, contract_addrPre)
            contractSta             = new web3.eth.Contract(contract_abi_s, contract_addrSta)
            ////////////////////////////////////////////////////////////////////////////
          
            
            this.props.setNetwork('Sepolia')
        }

                ///////////////////////////////////////////////////////////////////////////


        if(contract) {
            const name = await contract.methods.name().call()
            if(name)  {console.log('Connected to', name, 'at net id', netId)}
            if(!name) {window.alert('contract not found at ' + netId)}

            //set ref to rebaser contract in state
            this.props.setContract(contract)
        }
        else {
            console.log('contract not found at net id', netId)
        }
                ///////////////////////////////////////////////////////////////////////////


        if(contractV1) {
            const name = await contractV1.methods.name().call()
            if(name)  {console.log('Connected to', name, 'V1 at net id', netId)}
            if(!name) {window.alert('contractV1 not found at ' + netId)}

            //get data
            this.props.getContractData(contractV1)

            //set ref to rebaser contract in state
            this.props.setContractV1(contractV1)
        }
        else {
            console.log('contractV1 not found at net id', netId)
        }

                ///////////////////////////////////////////////////////////////////////////


        if(contractV2) {
            const name = await contractV2.methods.name().call()
            if(name)  {console.log('Connected to', name, 'V2 at net id', netId)}
            if(!name) {window.alert('contractV2 not found at ' + netId)}

            //get data
            this.props.getContractData(contractV2)

            //set ref to rebaser contract in state
            this.props.setContractV2(contractV2)
        }
        else {
            console.log('contractV2 not found at net id', netId)
        }

        ///////////////////////////////////////////////////////////////////////////


        if(contractEngine) {
            
            console.log('Connected to Engine contract at net id', netId)

            //get data
            this.props.getContractDataE(contractEngine)
            

            //set ref to pre contract in state
            this.props.setContractE(contractEngine)

        }
        else {
            console.log('contractEngine not found at net id', netId)
        }



        if(contractPre) {
            console.log('Connected to Precontract at net id', netId)

            //get data
            this.props.getContractDataP(contractPre)

            
            

            //set ref to pre contract in state
            this.props.setContractPre(contractPre)

        }
        else {
            console.log('contractPre not found at net id', netId)
        }

        ///////////////////////////////////////////////////////////////////////////

        if(contractSta) {
            console.log('Connected to Staking contract at net id', netId)

            //get data
            //this.props.getContractStake(contractSta)

            //set ref to presale contract in state
            this.props.setContractDai(contractSta)
        }
        

        
    }

    render() {
        return(
            <title>loader</title>
        )
    }
}

export default Loader;