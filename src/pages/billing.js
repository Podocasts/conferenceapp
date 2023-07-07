import { Button } from "@mui/material";
import { FileIo, StorageHandler, WalletHandler } from "jackal.js";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const Billing = () => {
  const [walletinfo, setWalletInfo] = useState();

  useEffect(() => {
    getWalletInfo();
  }, []);

  const getWalletInfo = async () => {
    const chainConfig = {
      // mainnet chain config
      chainId: "jackal-1",
      chainName: "Jackal",
      rpc: "https://rpc.jackalprotocol.com",
      rest: "https://api.jackalprotocol.com",
      bip44: {
        coinType: 118,
      },
      coinType: 118,
      stakeCurrency: {
        coinDenom: "JKL",
        coinMinimalDenom: "ujkl",
        coinDecimals: 6,
      },
      bech32Config: {
        bech32PrefixAccAddr: "jkl",
        bech32PrefixAccPub: "jklpub",
        bech32PrefixValAddr: "jklvaloper",
        bech32PrefixValPub: "jklvaloperpub",
        bech32PrefixConsAddr: "jklvalcons",
        bech32PrefixConsPub: "jklvalconspub",
      },
      currencies: [
        {
          coinDenom: "JKL",
          coinMinimalDenom: "ujkl",
          coinDecimals: 6,
        },
      ],
      feeCurrencies: [
        {
          coinDenom: "JKL",
          coinMinimalDenom: "ujkl",
          coinDecimals: 6,
          gasPriceStep: {
            low: 0.002,
            average: 0.002,
            high: 0.02,
          },
        },
      ],
      features: [],
    };

    const walletConfig = {
      selectedWallet: "leap",
      signerChain: "jackal-1",
      enabledChains: ["jackal-1"],
      queryAddr: "https://grpc.jackalprotocol.com",
      txAddr: "https://rpc.jackalprotocol.com",
      chainConfig: chainConfig,
    };

    const wallet = await WalletHandler.trackWallet(walletConfig);
    setWalletInfo(wallet);
  };
  const handleClick = async () => {
    const storage = await StorageHandler.trackStorage(walletinfo, "1.0.x");
    const fileIo = await FileIo.trackIo(walletinfo, "1.0.x");
    const walletaddress = await walletinfo.getAccounts();
    console.log(storage.getStorageJklPrice(1, 1), "DAdafasfa");

    const data = await storage.getStoragePaymentInfo(walletaddress[0]?.address);
    console.log(data, "DAdafasfa");
    if (data?.spaceAvailable === 0) {
      await storage.buyStorage(walletaddress[0]?.address, 1, 1);
      const listOfFolders = ["Home"];
      const msg = storage.makeStorageInitMsg();
      await fileIo.generateInitialDirs(msg, listOfFolders);
    }
  };
  return (
    <Wrapper>
      <Button variant="outlined" onClick={handleClick}>
        Purchase
      </Button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(35 45 69);
  box-sizing: border-box;
  padding: 30px;
  gap: 30px;
  min-height: 100vh;
  position: relative;
`;
export default Billing;
