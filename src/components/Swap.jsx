import React from 'react';
import '../App.css';
import Logo from './img/1.png';
import { useState, useEffect } from "react";

import { ethers } from 'ethers';
import { GearFill } from 'react-bootstrap-icons';
import { BeatLoader } from 'react-spinners';

import PageButton from './PageButton';
import ConnectButton from './ConnectButton';
import ConfigModal from './ConfigModal';
import CurrencyField from "./CurrencyField";
import { Link } from 'react-router-dom';

import { getWethContract, getUniContract, getPrice, runSwap } from "../AlphaRouterService";

const Main = () => {

  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);

  const [slippageAmount, setSlippageAmount] = useState(2);
  const [deadlineMinutes, setDeadlineMinutes] = useState(10);
  const [showModal, setShowModal] = useState(undefined);

  const [inputAmount, setInputAmount] = useState(undefined);
  const [outputAmount, setOutputAmount] = useState(undefined);
  const [transaction, setTransaction] = useState(undefined);
  const [loading, setLoading] = useState(undefined);
  const [ratio, setRatio] = useState(undefined);
  const [ethContract, setEthContract] = useState(undefined);
  const [uniContract, setUniContract] = useState(undefined);
  const [ethAmount, setEthAmount] = useState(undefined);
  const [uniAmount, setUniAmount] = useState(undefined);

  const [hamToggle, setHamToggle] = useState(false);


  useEffect(() => {
    const onLoad = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const ethContract = getWethContract();
      setEthContract(ethContract);

      const uniContract = getUniContract();
      setUniContract(uniContract);
    }
    onLoad();
  }, []);

  const getSigner = async provider => {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);
  }
  const isConnected = () => signer !== undefined;
  const getWalletAddress = () => {
    signer.getAddress()
      .then(address => {
        setSignerAddress(address);

        //todo: connect weth and uni contracts
        ethContract.balanceOf(address)
          .then(res => {
            setEthAmount(Number(ethers.utils.formatEther(res)));
          })
        uniContract.balanceOf(address)
          .then(res => {
            setUniAmount(Number(ethers.utils.formatEther(res)));
          })

      });
  }

  if (signer !== undefined) {
    getWalletAddress();
  }

  const getSwapPrice = (inputAmount) => {
    setLoading(true)
    setInputAmount(inputAmount)

    const swap = getPrice(
      inputAmount,
      slippageAmount,
      Math.floor(Date.now() / 1000 + (deadlineMinutes * 60)),
      signerAddress
    ).then(data => {
      setTransaction(data[0])
      setOutputAmount(data[1])
      setRatio(data[2])
      setLoading(false)
    })
  }


  return (
    <div className={hamToggle ? 'App mobile-nav-active' : 'App'}>

      <i className="fa fa-bars mobile-nav-toggle d-xl-none" onClick={() => setHamToggle(!hamToggle)}></i>

      <header id="header">
        <div className="d-flex flex-column">

          <div className="pt-2">
            <Link to="/"><img src={Logo} alt="" className="img-fluid" /></Link>
          </div>

          <nav id="navbar" className="nav-menu navbar">
            <ul id="myMenu">
              <li>
                <div>
                  <Link to="#about" className="nav-link scrollto active"><i className="pl-2 fa fa-home"></i></Link>
                </div>
                <div>
                  Home
                </div>
              </li>
              <li className='nav-item-active'>
                <div>
                  <Link to="#about" className="nav-link scrollto"><i className="pl-2 fa fa-exchange"></i></Link>
                </div>
                <div>
                  Swap
                </div>
              </li>
              <li>
                <div>
                  <Link to="#about" className="nav-link scrollto"><i className="pl-2 fa fa-line-chart"></i></Link>
                </div>
                <div>
                  Trade
                </div>
              </li>
              <li>
                <div class="pl-2">
                  <Link to="#about" className="nav-link scrollto"><i className="pl-2 fa fa-dollar"></i></Link>
                </div>
                <div>
                  Wallet
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className='appNav'>

        <div className='rightNav'>
          <div className='connectButtonContainer'>
            <ConnectButton
              provider={provider}
              isConnected={isConnected}
              signerAddress={signerAddress}
              getSigner={getSigner}
            />
          </div>
          <div className='my-2 buttonContainer'>
            <PageButton name={"..."} isBold={true} />
          </div>
        </div>

      </div>

      <div className='appBody'>
        <div className='swapContainer'>
          <div className='swapHeader'>
            <div>
              <span className='swapText text-center'>Simple DEX</span>
              <span className='gearContainer' onClick={() => setShowModal(true)}>
                <GearFill />
              </span>
            </div>
            <p className='swapDesc text-center'>Swap tokens using ethereum Dex</p>
            {showModal && (
              <ConfigModal
                onClose={() => setShowModal(false)}
                setDeadlineMinutes={setDeadlineMinutes}
                deadlineMinutes={deadlineMinutes}
                setSlippageAmount={setSlippageAmount}
                slippageAmount={slippageAmount}
              />
            )}
          </div>

          <div className=''>
            <div className="row">
              <div className="col-lg-6 has-icon">
                <div className="currency-item">
                  <CurrencyField
                    field="input"
                    tokenName="ETH"
                    getSwapPrice={getSwapPrice}
                    signer={signer}
                    balance={ethAmount}
                  />
                  <i className = "fa fa-exchange"></i>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className="currency-item">
                  <CurrencyField
                    field="output"
                    tokenName="UNI"
                    value={outputAmount}
                    signer={signer}
                    balance={uniAmount}
                    spinner={BeatLoader}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='ratioContainer pl-4'>
            {ratio && (
              <>
                {`1 UNI = ${ratio} ETH`}
              </>
            )}
          </div>

          <div className='swapButtonContainer'>
            {isConnected() && inputAmount ? (
              <div
                className='w-100 btn-grad'
                onClick={() => runSwap(transaction, signer)}
              >
                Swap
              </div>
            ) : (
              <div
                className='w-100 btn-grad'
                onClick={() => getSigner(provider)}
              >
                Connect Wallet
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}

export default Main