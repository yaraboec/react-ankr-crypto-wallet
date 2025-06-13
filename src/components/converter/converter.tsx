import { useCallback, useState } from "react";
import { Button, Dropdown, Form, InputGroup, Spinner } from "react-bootstrap";
import { isAddress } from "ethers";
import toastr from "toastr";

import { useAppDispatch } from "hooks/state";
import { setBalances } from "state/slices/balancesSlice";
import { BlockchainDetails, blockchains } from "types/blockchain";
import {
  getBlockchainDetails,
  getConvertedWalletBalances,
} from "utils/blockchain";
import { getTokenPrice } from "utils/provider";
import Refresher from "components/refresher/refresher";

import "./converter.scss";

export default function Converter() {
  const dispatch = useAppDispatch();

  const [address, setAddress] = useState<string>("");
  const [isAddressValid, setIsAddressValid] = useState<boolean>(true);
  const [isNetworkAvailable, setIsNetworkAvailable] = useState<boolean>(true);
  const [tokenPrice, setTokenPrice] = useState<string>("");
  const [blockchain, setBlockchain] = useState<BlockchainDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getBalances = useCallback(async () => {
    setIsLoading(true);

    const balances = await getConvertedWalletBalances(address, tokenPrice);
    dispatch(setBalances(balances));

    setIsLoading(false);
  }, [dispatch, address, tokenPrice]);

  const setTokenDetails = async (blockchain: string | null) => {
    if (!blockchain) return;
    setIsLoading(true);

    const blockchainDetails = getBlockchainDetails(blockchain);
    setBlockchain(blockchainDetails);

    try {
      const tokenPrice = await getTokenPrice(blockchain);
      setTokenPrice(tokenPrice.usdPrice);
      setIsNetworkAvailable(true);
    } catch {
      setIsNetworkAvailable(false);
      toastr.warning("Blockchain is not available");
    }

    setIsLoading(false);
  };

  const setWalletAddress = (address: string) => {
    if (!isAddress(address)) {
      setIsAddressValid(false);
    } else {
      setIsAddressValid(true);
      setAddress(address);
    }
  };

  const canRefresh = (): boolean => {
    if (
      !isLoading &&
      isNetworkAvailable &&
      address &&
      isAddressValid &&
      blockchain
    ) {
      return true;
    }
    return false;
  };

  const canGetBalances = (): boolean =>
    isLoading ||
    !isNetworkAvailable ||
    !address ||
    !blockchain ||
    !isAddressValid;

  return (
    <div className="converter">
      <div className="selectors">
        <InputGroup>
          <Form.Control
            id="address"
            type="text"
            placeholder="Input address"
            onChange={(e) => {
              setWalletAddress(e.target.value);
            }}
            isInvalid={!isAddressValid}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            Invalid address
          </Form.Control.Feedback>
        </InputGroup>
        <Dropdown onSelect={setTokenDetails}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {blockchain ? blockchain.displayName : "Select Token"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {blockchains.map((blockchain) => (
              <Dropdown.Item key={blockchain.name} eventKey={blockchain.name}>
                {blockchain.displayName}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Refresher canRefresh={canRefresh()} actionOnRefresh={getBalances} />
      </div>
      <div className="submit mt-3">
        <Button
          className="get-balances-button"
          onClick={getBalances}
          disabled={canGetBalances()}
        >
          Get balances
        </Button>
        <Spinner
          hidden={!isLoading}
          className="spinner"
          animation="border"
          variant="primary"
        />
      </div>
    </div>
  );
}
