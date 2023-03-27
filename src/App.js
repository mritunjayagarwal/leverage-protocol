import './App.css';
import { useState, useEffect } from "react";
import { ethers } from 'ethers';
import { GearFill } from 'react-bootstrap-icons';
import { BeatLoader } from 'react-spinners';

import PageButton from './components/PageButton';
import ConnectButton from './components/ConnectButton';
import ConfigModal from './components/ConfigModal';
import CurrencyField from "./components/CurrencyField";

import { getWethContract, getUniContract, getPrice, runSwap } from "./AlphaRouterService";

function App() {

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
    <div className="App">
      <div className='appNav'>

        <div className='my-2 buttonContainer buttonContainerTop'>
          <PageButton name={"Swap"} isBold={true} />
          <PageButton name={"Pool"} />
          <PageButton name={"Vote"} />
          <PageButton name={"Chart"} />
        </div>

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
            <span className='swapText'>Swap</span>
            <span className='gearContainer' onClick={() => setShowModal(true)}>
              <GearFill />
            </span>
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

          <div className='swapBody'>
            <CurrencyField
              field="input"
              tokenName="WETH"
              getSwapPrice={getSwapPrice}
              signer={signer}
              balance={ethAmount}
            />
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

          <div className='ratioContainer'>
            {ratio && (
              <>
                {`1 UNI = ${ratio} WETH`}
              </>
            )}
          </div>

          <div className='swapButtonContainer'>
            {isConnected() && inputAmount ? (
              <div
                className='swapButton'
                onClick={() => runSwap(transaction, signer)}
              >
                Swap
              </div>
            ) : (
              <div
                className='swapButton'
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

export default App;
