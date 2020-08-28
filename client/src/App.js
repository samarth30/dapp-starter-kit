import React, { useEffect, useState } from "react";
import Helloabi from "./contracts/Hello.json";
import Web3 from "web3";
import Navbar from "./Navbar";

const App = () => {
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();

    //esl
  }, []);
  let content;
  const [loading2, setloading2] = useState(false);

  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [Hello, setHello] = useState({});

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    setLoading(true);
    const web3 = window.web3;

    let url = window.location.href;
    console.log(url);

    const accounts = await web3.eth.getAccounts();

    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = Helloabi.networks[networkId];
    console.log(networkData);
    if (networkData) {
      const hello = new web3.eth.Contract(Helloabi.abi, networkData.address);
      setHello(hello);

      setLoading(false);
    } else {
      window.alert("Forsage contract not deployed to detected network.");
      setloading2(true);
    }
  };

  if (loading === true) {
    content = (
      <p className="text-center">
        Loading...{loading2 ? <div>load on mainenet </div> : ""}
      </p>
    );
  } else {
    content = (
      <div class="container">
        <h1>hello</h1>
      </div>
    );
  }

  return (
    <div>
      <Navbar account={account} />
      {content}
    </div>
  );
};

export default App;
