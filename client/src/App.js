import React, { useEffect, useState } from "react";
import Helloabi from "./contracts/Hello.json";
import Web3 from "web3";
import Navbar from "./Navbar";
import Body from "./Body";
import Admin from "./Admin";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

const App = () => {
  const [refresh, setrefresh] = useState(0);

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
    if (
      typeof window.ethereum == "undefined" ||
      typeof window.web3 == "undefined"
    ) {
      return;
    }
    const web3 = window.web3;

    let url = window.location.href;
    console.log(url);

    const accounts = await web3.eth.getAccounts();

    if (accounts.length == 0) {
      return;
    }
    setAccount(accounts[0]);
    // const networkId = await web3.eth.net.getId();
    // const networkData = Helloabi.abi.networks[networkId];
    // console.log(networkData);
    // if (networkData) {
    // const hello = new web3.eth.Contract(Helloabi.abi, networkData.address);
    // setHello(hello);

    setLoading(false);
    // } else {
    //   window.alert("the contract not deployed to detected network.");
    //   setloading2(true);
    // }
  };

  const onclick = async (a) => {
    await Hello.methods
      .setCompleted(a.toString())
      .send({ from: account })
      .once("recepient", (recepient) => {
        console.log("success");
      })
      .on("error", () => {
        console.log("error");
      });
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
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Fragment>
                  <Body />
                </Fragment>
              )}
            />

            <Route
              path="*"
              render={() => (
                <Fragment>
                  <Body />
                </Fragment>
              )}
            />

            <Route
              path="/admin"
              render={() => (
                <Fragment>
                  <Admin />
                </Fragment>
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }

  return (
    <div>
      <Navbar account={account} />

      {account == "" ? (
        <div className="container">
          {" "}
          Connect your wallet to application{"   "}{" "}
          <button onClick={walletAddress}>metamask</button>
        </div>
      ) : (
        content
      )}
      {/* {content} */}
    </div>
  );
};

export default App;
