import Titled from "../../abi/titled/Titled";
import Layout from "../../components/Layout";

const TitledIndex = ({ address, name }) => {
  const result = address ? (
    <h3>{`contract with address ${address} has title ${name}`}</h3>
  ) : (
    <h2>Nothing found</h2>
  );

  return <Layout>{result}</Layout>;
};

export default TitledIndex;

export async function getServerSideProps(context) {
  const address = context.query.address;
  if (address) {
    try {
      const name = await Titled(address).name();
      return {
        props: { address, name },
      };
    } catch (error) {
      console.error(error);
    }
  }
  return {
    props: {},
  };
}
