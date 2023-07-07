import styled from "styled-components";
import {
  FileIo,
  FileUploadHandler,
  StorageHandler,
  WalletHandler,
} from "jackal.js";
import { useEffect, useState } from "react";
import {
  audioIcon,
  backIcon,
  createfolderIcon,
  documentIcon,
  fileIcon,
  folderIcon,
  imageIcon,
  logo,
  videoIcon,
} from "../components/Images";
import ListIcon from "../icons/listIcon";
import DeleteIcon from "../icons/DeleteIcon";
import DownloadIcon from "../icons/DownloadIcon";
import useOutsideClick from "../utils/useOutSideClick";
import Uploader from "../components/Uploader";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { ImSearch } from "react-icons/im";
import { useSnackbar } from "notistack";
import { Divider } from "@material-ui/core";
import ShowerDialog from "../components/ShowerModal";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [rowData, setRowData] = useState();
  const [folderData, setFolderData] = useState();
  const [selectParentFolder, setSelectParentFolder] = useState();
  const [walletinfo, setWalletInfo] = useState();
  const [foldername, setFoldername] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [refreshflag, setRefreshFlag] = useState(0);
  const [fileTriggerFlag, setFileTriggerFlag] = useState(null);
  const [fileTriggerFlag2, setFileTriggerFlag2] = useState(null);
  const [searchDataFiles, setSearchDataFiles] = useState();
  const [searchDataFolder, setSearchDataFolder] = useState();
  const [modalFlag, setModalFlag] = useState(false);
  const [createfileFlag, setCreatFileFlag] = useState(false);
  const [base64Data, setBase64Data] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    getWalletInfo();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      walletinfo && handleSelectParent(walletinfo, selectParentFolder);
    }, 2000);
  }, [refreshflag]);
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
    const storage = await StorageHandler.trackStorage(wallet);
    const walletaddress = await wallet.getAccounts();

    const data = await storage.getStoragePaymentInfo(walletaddress[0]?.address);
    console.log(data, "DAdafasfa");
    if (data?.spaceAvailable === 0) {
      return navigate("/billing");
    }

    setWalletInfo(wallet);
    const parentFolderPath = "s/Home"; // replace this with your own path
    setSelectParentFolder(parentFolderPath);
    handleSelectParent(wallet, parentFolderPath);
  };
  const handleClickOutside = () => {
    setFileTriggerFlag(null);
  };
  const handleClickOutside2 = () => {
    setFileTriggerFlag2(null);
  };
  const ref = useOutsideClick(handleClickOutside);
  const ref2 = useOutsideClick(handleClickOutside2);
  const handleCreateFolder = async () => {
    if (foldername) {
      const fileIo = await FileIo.trackIo(walletinfo, "1.0.x");
      const parent = await fileIo.downloadFolder(selectParentFolder);
      const listOfFolders = [`${foldername}`];
      console.log(listOfFolders, "listOfFolders");
      await fileIo.createFolders(parent, listOfFolders);
      setRefreshFlag(!refreshflag);
      enqueueSnackbar("New Folder Uploaded");
      setCreatFileFlag(false);
    } else {
      return enqueueSnackbar("Please Enter Folder Name ");
    }
  };
  const handleDownload = async (filename) => {
    const fileIo = await FileIo.trackIo(walletinfo, "1.0.x");
    const walletaddress = await walletinfo.getAccounts();
    const file = await fileIo.downloadFile(
      {
        rawPath: selectParentFolder + "/" + filename,
        owner: walletaddress[0]?.address,
        isFolder: false,
      },
      {
        track: 0,
      }
    );
    const fileData = file.receiveBacon();
    const base64 = await convertBase64(fileData);
    const link = document.createElement("a");
    link.href = base64;
    link.download = filename;
    link.click();
    setRefreshFlag(!refreshflag);
    enqueueSnackbar("File Download Successful");
  };
  const handleShower = async (filename) => {
    const fileIo = await FileIo.trackIo(walletinfo, "1.0.x");
    const walletaddress = await walletinfo.getAccounts();
    const file = await fileIo.downloadFile(
      {
        rawPath: selectParentFolder + "/" + filename,
        owner: walletaddress[0]?.address,
        isFolder: false,
      },
      {
        track: 0,
      }
    );
    const fileData = file.receiveBacon();
    const base64 = await convertBase64(fileData);

    const data = {
      base64: base64,
      type: filename?.substring(filename?.lastIndexOf(".") + 1),
    };
    console.log(data, "base64");
    setBase64Data(data);
    setModalFlag(true);
  };
  const handleSearchFile = (e) => {
    const searchContent = e.target.value;
    const searchDataFiles = Object.keys(rowData)?.map((item, key) => {
      const file = rowData[[item]];
      console.log(file, "item");
      if (file?.name?.toLowerCase().includes(searchContent?.toLowerCase())) {
        return rowData[item];
      }
    });
    const searchDataFolders = folderData?.map((item) => {
      if (
        item?.path
          ?.split("/")
          ?.pop()
          ?.toLowerCase()
          .includes(searchContent?.toLowerCase())
      ) {
        return item;
      }
    });
    if (searchContent === "") {
      setSearchDataFiles(rowData);
      setSearchDataFolder(folderData);
    } else {
      setSearchDataFiles(searchDataFiles);
      setSearchDataFolder(searchDataFolders);
    }
  };
  // const testDownload = async (filename) => {
  //   console.log(filename, "filename");
  //   const fileIo = await FileIo.trackIo(walletinfo, "1.0.x");
  //   const file = await fileIo.downloadFolder(filename);
  //   console.log(file);
  // };
  const handleChangePath = () => {
    navigate("/");
  };
  const handleDelete = async (filename) => {
    const fileIo = await FileIo.trackIo(walletinfo, "1.0.x");
    const parent = await fileIo.downloadFolder(selectParentFolder);
    await fileIo.deleteTargets([filename], parent);
    setRefreshFlag(!refreshflag);
    enqueueSnackbar(`${filename?.toUppercase()} is Deleted`);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      fileReader.readAsDataURL(file);
    });
  };

  const handleSelectParent = async (walletinfo, item) => {
    const fileIo = await FileIo.trackIo(walletinfo, "1.0.x");
    const parentFolderPath = item; // replace this with your own path
    setSelectParentFolder(parentFolderPath);
    const parent = await fileIo.downloadFolder(parentFolderPath);
    const data = parent.getChildFiles();
    const datafolder = parent.getChildDirs();
    const folderdata = datafolder?.map((item) => ({
      path: parent?.getWhereAmI() + "/" + parent?.getWhoAmI() + "/" + item,
    }));
    setFolderData(folderdata);
    setSearchDataFolder(folderdata);
    setRowData(data);
    setSearchDataFiles(data);
  };

  const handleClick = async (walletinfo) => {
    if (!selectedFile)
      return enqueueSnackbar("Please Select File using Uploader ");
    const fileName = selectedFile?.name;
    const fileIo = await FileIo.trackIo(walletinfo, "1.0.x");

    const parentFolderPath = selectParentFolder; // replace this with your own path

    const handler = await FileUploadHandler.trackFile(
      selectedFile,
      parentFolderPath
    );

    const parent = await fileIo.downloadFolder(parentFolderPath);

    const uploadList = {
      [fileName]: {
        data: null,
        exists: false,
        handler: handler,
        key: fileName,
        uploadable: await handler.getForUpload(),
      },
    };
    // ... do something with the file or return it
    console.log(uploadList);
    await fileIo.staggeredUploadFiles(uploadList, parent, {
      counter: 0,
      complete: 0,
    });
    setRefreshFlag(!refreshflag);
    setSelectedFile("");
    enqueueSnackbar("New File Uploaded!");
  };

  return walletinfo ? (
    <Wrapper>
      <HearderContainer>
        <IconImage
          image={logo}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
          }}
        ></IconImage>
        <UploadButton
          style={{ width: "150px", margin: "10px 0px" }}
          onClick={handleChangePath}
        >
          Go to App
        </UploadButton>
      </HearderContainer>

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          background: "rgb(0,0,0,0.3)",
          marginTop: "10px",
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1, color: "white" }}
          placeholder="Search Folder and Files"
          onChange={handleSearchFile}
          onKeyDown={(ev) => {
            console.log(`Pressed keyCode ${ev.key}`);
            if (ev.key === "Enter") {
              ev.preventDefault();
            }
          }}
        />
        <IconButton
          type="button"
          sx={{ p: "10px", color: "white" }}
          aria-label="search"
        >
          <ImSearch />
        </IconButton>
      </Paper>
      <GridWrapper>
        <LeftGridWrapper>
          <TitlePath>
            {selectParentFolder !== "s/Home" && (
              <IconImage
                image={backIcon}
                style={{ width: "24px" }}
                onClick={() =>
                  handleSelectParent(
                    walletinfo,
                    selectParentFolder?.replace(/\/\w+$/, "")
                  )
                }
              />
            )}

            {selectParentFolder?.substring(2)}
          </TitlePath>
          <Divider />

          <Title>All Folders</Title>
          <CardContainer>
            {searchDataFolder?.map(
              (item, key) =>
                item?.path !== undefined && (
                  <IconContainer>
                    <TriggerIconContainer
                      ref={ref}
                      onClick={(e) => {
                        if (key === fileTriggerFlag) {
                          setFileTriggerFlag(null);
                        } else {
                          setFileTriggerFlag(key);
                        }
                        e.stopPropagation();
                      }}
                    >
                      <ListIcon />
                    </TriggerIconContainer>
                    {fileTriggerFlag === key && (
                      <TriggerDiv>
                        <TriggerDivIconWrapper
                          onClick={() => {
                            const string1 = selectParentFolder;
                            const string2 = item?.path;
                            let diffIndex = 0;
                            while (
                              diffIndex < string1.length &&
                              diffIndex < string2.length &&
                              string1[diffIndex] === string2[diffIndex]
                            ) {
                              diffIndex++;
                            }

                            const result = string2
                              .substring(diffIndex)
                              .replace("/", "");
                            handleDelete(result);
                          }}
                        >
                          <DeleteIcon /> Delete
                        </TriggerDivIconWrapper>
                        {/* <TriggerDivIconWrapper onClick={() => testDownload(item?.path)}>
                  <DownloadIcon /> Download
                </TriggerDivIconWrapper> */}
                      </TriggerDiv>
                    )}

                    <IconImage
                      image={folderIcon}
                      onClick={() => handleSelectParent(walletinfo, item?.path)}
                    />
                    <IconText>{item?.path?.split("/").pop()}</IconText>
                  </IconContainer>
                )
            )}
          </CardContainer>
          <Divider />

          <Title>ALL Files</Title>
          <CardContainer>
            {searchDataFiles &&
              Object.keys(searchDataFiles).map((item, index) => {
                const file = searchDataFiles[[item]];
                console.log(file, "file");
                let flag = 0;
                let image = fileIcon;
                if (item !== "undefined" && file !== "undefined") {
                  if (file?.type?.search("image") === 0) {
                    image = imageIcon;
                    flag = 1;
                  }
                  if (file?.type?.search("video") === 0) {
                    image = videoIcon;
                    flag = 1;
                  }
                  if (file?.type?.search("audio") === 0) {
                    image = audioIcon;
                    flag = 1;
                  }
                  if (
                    file?.type?.search("application") === 0 ||
                    file?.type?.search("text") === 0
                  ) {
                    image = documentIcon;
                    flag = 1;
                  }
                }

                return (
                  item !== "undefined" &&
                  file !== undefined && (
                    <IconContainer key={index}>
                      <TriggerIconContainer
                        ref={ref2}
                        onClick={(e) => {
                          if (index === fileTriggerFlag2) {
                            setFileTriggerFlag2(null);
                          } else {
                            setFileTriggerFlag2(index);
                          }
                          e.stopPropagation();
                        }}
                      >
                        <ListIcon />
                      </TriggerIconContainer>
                      {fileTriggerFlag2 === index && (
                        <TriggerDiv>
                          <TriggerDivIconWrapper
                            onClick={() => handleDownload(file?.name)}
                          >
                            <DownloadIcon /> Download
                          </TriggerDivIconWrapper>
                          <TriggerDivIconWrapper
                            onClick={() => handleDelete(file?.name)}
                          >
                            <DeleteIcon style={{ cursor: "pointer" }} /> Delete
                          </TriggerDivIconWrapper>
                        </TriggerDiv>
                      )}
                      <IconImage
                        image={image}
                        onClick={() => handleShower(file?.name)}
                      >
                        <IconText>
                          {flag === 0 &&
                            file?.name?.substring(
                              file?.name?.lastIndexOf(".") + 1
                            )}
                        </IconText>
                      </IconImage>
                      <NameWrapper>
                        <IconText>{file?.name?.split(".")[0]}</IconText>.
                        {file?.name?.substring(
                          file?.name?.lastIndexOf(".") + 1
                        )}
                      </NameWrapper>
                      <SizeText>
                        {file?.size < 1000 && file?.size + " B"}
                        {file?.size < 1000000 &&
                          file?.size > 1000 &&
                          file?.size / 1000 + " KB"}
                        {file?.size > 1000000 && file?.size / 1000000 + " MB"}
                      </SizeText>
                    </IconContainer>
                  )
                );
              })}
          </CardContainer>
        </LeftGridWrapper>
        <RightGridWrapper>
          <UploadWrapper>
            <Uploader
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
            <UploadButton onClick={() => handleClick(walletinfo)}>
              Upload New File
            </UploadButton>
          </UploadWrapper>
          <IconContainer onClick={() => setCreatFileFlag(!createfileFlag)}>
            <IconImage image={createfolderIcon} />
            <IconText>Create New Folder</IconText>
          </IconContainer>
          {createfileFlag && (
            <>
              <Paper
                component="form"
                sx={{
                  p: "10px 0px",
                  display: "flex",
                  alignItems: "center",
                  background: "rgb(0,0,0,0.3)",
                  maxWidth: "270px",
                  width: "100%",
                }}
              >
                <InputBase
                  sx={{ ml: 2, flex: 1, color: "white" }}
                  placeholder="Please Enter Your Folder Name"
                  onChange={(e) => setFoldername(e.target.value)}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                      ev.preventDefault();
                    }
                  }}
                />
              </Paper>
              <CreateNewFolderWrapper>
                <UploadButton onClick={() => handleCreateFolder()}>
                  Save
                </UploadButton>
                <UploadButton onClick={() => setCreatFileFlag(false)}>
                  Cancel
                </UploadButton>
              </CreateNewFolderWrapper>
            </>
          )}
        </RightGridWrapper>
      </GridWrapper>
      <ShowerDialog
        setModalFlag={setModalFlag}
        modalFlag={modalFlag}
        base64Data={base64Data}
      />
    </Wrapper>
  ) : (
    <Wrapper />
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
const GridWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  @media screen and (max-width: 470px) {
    flex-direction: column-reverse;
  }
`;
const HearderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
`;
const RightGridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  width: 30%;
  margin-top: 50px;
  @media screen and (max-width: 768px) {
    width: 50%;
  }
  @media screen and (max-width: 470px) {
    width: 100%;
    align-items: center;
  }
`;
const LeftGridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;
  @media screen and (max-width: 768px) {
    width: 50%;
  }
  @media screen and (max-width: 470px) {
    width: 100%;
    justify-content: center;
  }
`;
const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  flex-wrap: wrap;
  @media screen and (max-width: 470px) {
    width: 100%;
    justify-content: center;
  }
`;
const IconContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  height: 200px;
  border-color: transparent;
  border-radius: 0.375rem;
  background: rgb(40 51 78);
  max-width: 270px;
  width: 100%;
`;
const TriggerIconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
  margin: 0;
  cursor: pointer;
  color: rgb(255, 255, 255, 0.5);
`;

const TriggerDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 45px;
  box-shadow: 0px 3px 10px #00000017;
  background-color: rgb(42 51 78);
  right: 20px;
  transition: margin-top 0.2s;
  border-radius: 0.375rem;
  width: 60%;
`;
const TriggerDivIconWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  color: white;
  padding: 20px;
`;
const IconImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 100px;
  width: 60%;
  cursor: pointer;
`;

const IconText = styled.div`
  color: rgb(255 255 255);
  max-width: 150px;
  text-align: center;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const SizeText = styled.div`
  color: rgb(148 163 184);
  width: 150px;
  text-align: center;
`;
const UploadButton = styled.button`
  background-color: rgb(30 64 175 / 0.9);
  color: rgb(255 255 255);
  border-radius: 4px;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  outline: none;
  border: 0;
  cursor: pointer;
  width: 100%;
  &:active {
    box-shadow: 3px 3px 3px 1px rgba(0, 0, 0, 0.2);
  }
`;
const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 270px;
  width: 100%;
  gap: 20px;
`;
const CreateNewFolderWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 270px;
`;
const TitlePath = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 30px;
  font-weight: 600;
  color: white;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: white;
`;
const NameWrapper = styled.div`
  color: white;
  display: flex;
`;

export default Dashboard;
