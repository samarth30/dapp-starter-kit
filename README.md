# dapp-starter-kit

# defining a smart contract 
     -- signer is defined above no need to define again
     -- const smartcontract =new Contract(address of smart contract,abi of      smartcontract, signer);

# calling smart contract function

```
const onclick = async (a) => {
   
    try {
      const tx = await smartcontract.setCompleted(a.toString());
      const txsign = await tx.wait();
      window.location.reload();
    } catch (e) {
      swal("error in doing transaction you are not admin");
    }
  };
```

# getting data from smart contract functions
```
 if you want to call data from smart contract follow below
       suppose there is function in smart contract which returns something
```

```
 await smartcontract
         .functioninsmartcontract(accounts[0].toString())
         .then((result) => {
           console.log("vesting schedule data ", result);
         });
```

```

       suppose there is a call function only or a public variable
       await smartcontract.functioninsmartcontract();

```

# eth to wei

```
   
     use this ethers.utils.parseEther(inputamount.toString())
   
```

# wei to eth
```
  ethers.utils.formatUnits(unLockedTokens, 18))
```

