import { ethers, Contract } from "ethers";
import React, { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Helloabi from "./contracts/Hello.json";
import Web3 from "web3";
import Navbar from "./Navbar";
import swal from "sweetalert";

const App = () => {
  const [refresh, setrefresh] = useState(0);
  const [getNetwork, setNetwork] = useState("");

  let content;
  const [loading2, setloading2] = useState(false);

  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [Hello, setHello] = useState({});
  const [SIGNER, SETSIGNER] = useState({});
  const [flag, setflag] = useState(0);
  // const provider = await detectEthereumProvider();
  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    setLoading(true);
    if (typeof window.ethereum == "undefined") {
      return;
    }

    const ethereum = window.ethereum;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    SETSIGNER(signer);

    let url = window.location.href;
    console.log(url);

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(accounts);
    if (accounts.length == 0) {
      return;
    }

    setAccount(accounts[0]);

    var networkId;
    await provider.getNetwork().then((result) => {
      networkId = result.chainId;
    });
    if (networkId) {
      // set network name here
      setNetwork("Kovan");
      // defining a smart contract ;
      // signer is defined above no need to define again
      // const smartcontract = new Contract( /* address of smart contract*/  , /*  abi of smart contract */, signer);
      let smartcontract;
      setHello(smartcontract);

      // if you want to call data from smart contract follow below
      // suppose there is function in smart contract which returns something

      // await smartcontract
      //   .functioninsmartcontract(accounts[0].toString())
      //   .then((result) => {
      //     console.log("vesting schedule data ", result);
      //   });

      // suppose there is a call function only or a public variable
      // await smartcontract.functioninsmartcontract();

      setLoading(false);
    } else {
      window.alert("the contract not deployed to detected network.");
      setloading2(true);
    }
  };

  const onclick = async (a) => {
    // if you want to go from eth to wei
    // use this ethers.utils.parseEther(inputamount.toString())
    // ethers.utils.formatUnits(unLockedTokens, 18))
    // try {
    //   const tx = await smartcontract.setCompleted(a.toString());
    //   const txsign = await tx.wait();
    //   window.location.reload();
    // } catch (e) {
    //   swal("error in doing transaction you are not admin");
    // }
  };

  const walletAddress = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    window.location.reload();
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();

    if (refresh == 1) {
      setrefresh(0);
      loadBlockchainData();
    }
    //esl
  }, [refresh]);

  if (loading === true) {
    content = (
      <p className="text-center">
        Loading...{loading2 ? <div>loading....</div> : ""}
      </p>
    );
  } else {
    content = (
      <div class="container">
        <main role="main" class="container">
          <div class="jumbotron">
            <h1>Project</h1>
            <div className="row" style={{ paddingTop: "30px" }}>
              {" "}
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>text 1</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>text 2</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>text 3</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <button className="btn btn-primary">Click on it</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar account={account} getNetwork={getNetwork} />

      {account == "" ? (
        <div className="container">
          {" "}
          Connect your wallet to application{"   "}{" "}
          <button onClick={walletAddress} style={{ color: "black" }}>
            metamask
          </button>
        </div>
      ) : (
        content
      )}
    </div>
  );
};

export default App;
