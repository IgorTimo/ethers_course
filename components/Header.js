import Link from "next/link";
import { useAppContext } from "../hooks/useAppContext";
import connectMetaMask from "../utils/connectMetaMask";

const Header = () => {
  const { contextState, updateContextState } = useAppContext();
  const currentAccount = contextState?.currentAccount;

  const handleConnectClick = async () => {
    try {
      const currentAccount = await connectMetaMask();
      updateContextState({ currentAccount });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        borderBottom: "1px solid black",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Link href="/">{`<- Home`}</Link>
      {currentAccount ? (
        <span>{currentAccount}</span>
      ) : (
        <button onClick={handleConnectClick}>Connect</button>
      )}
    </div>
  );
};

export default Header;
