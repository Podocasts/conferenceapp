import { Button } from "@mui/material";
import { FileIo, StorageHandler, WalletHandler } from "jackal.js";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { addUser } from "../action/user";
import { useSnackbar } from "notistack";

const Billing = () => {
  const [walletinfo, setWalletInfo] = useState();
  const [price, setPrice] = useState();
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getWalletInfo();
  }, []);
  const billdata = [
    { title: "BASIC", storage: 0.002, price: "$0.02 USD" },
    { title: "ADVANCE", storage: 1, price: "$8 USD" },
    { title: "ELITE", storage: 5, price: "$40 USD" },
    { title: "PRO", storage: 100, price: "$800  USD" },
  ];
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
    const walletaddress = await wallet.getAccounts();
    const storage = await StorageHandler.trackStorage(wallet, "1.0.x");
    addUser(walletaddress[0]?.address);
    setWalletInfo(wallet);
    getPrice(wallet);
    const data = await storage.getStoragePaymentInfo(walletaddress[0]?.address);
    console.log(data?.end, "DAdafasfa");
    if (data?.spaceAvailable === 0) {
    } else {
      setEndDate(data?.end);
    }
  };
  const getPrice = async (wallet) => {
    const storage = await StorageHandler.trackStorage(wallet, "1.0.x");
    let data = [];
    (async () => {
      for (var i = 0; i < billdata.length; i++) {
        const pricedata =
          (await storage.getStorageJklPrice(1, billdata[i].storage)) / 1000000;
        data.push(pricedata);
      }
      setPrice(data);
    })();
  };
  const handleClick = async (storageData) => {
    console.log(storageData);
    const storage = await StorageHandler.trackStorage(walletinfo, "1.0.x");
    const fileIo = await FileIo.trackIo(walletinfo, "1.0.x");
    const walletaddress = await walletinfo.getAccounts();
    const data = await storage.getStoragePaymentInfo(walletaddress[0]?.address);
    console.log(data, "DAdafasfa");
    if (data?.spaceAvailable === 0) {
      await storage.buyStorage(walletaddress[0]?.address, 1, storageData);
      const listOfFolders = ["Home"];
      const msg = storage.makeStorageInitMsg();
      await fileIo.generateInitialDirs(msg, listOfFolders);
    } else {
      enqueueSnackbar("You already purchased.");
    }
  };
  const handlePath = (path) => {
    navigate(path);
  };
  return (
    <Wrapper>
      <ButtonWrapper>
        <Button variant="contained" onClick={() => handlePath("/")}>
          Go to APP
        </Button>
        <Button variant="contained" onClick={() => handlePath("/dashboard")}>
          Go to Dashboard
        </Button>
      </ButtonWrapper>
      {endDate && (
        <>
          Expires Date : <>{new Date(endDate.toString())}</>
        </>
      )}
      <CardWrapper>
        {billdata?.map((item, key) => (
          <CardContainer key={key}>
            <Title>{item.title}</Title>
            <div>{item.storage + " TB"}</div>
            <div>{item.price}</div>
            <div>{price && price[key] + " JKL"}</div>
            <Button
              variant="contained"
              onClick={() => handleClick(item.storage)}
            >
              Purchase
            </Button>
          </CardContainer>
        ))}
      </CardWrapper>
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
  color: white;
  justify-content: center;
`;
const CardWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  width: 100%;
  gap: 20px;
  @media screen and (max-width: 600px) {
    margin-top: 200px;
  }
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  padding: 30px;
  background-color: rgb(41 39 46);
  &:hover {
    background-color: rgb(32 26 45);
  }
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
`;
const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 30px;
  right: 30px;
  gap: 30px;
  button {
    padding: 10px 20px;
    font-size: 20px;
  }
  box-sizing: border-box;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    right: 0px;
    padding: 30px;
  }
`;
export default Billing;
