import Link from "next/link";
import Layout from "../components/Layout";

const Index = () => {
  return (
    <Layout>
      <ul style={{ fontSize: "20px" }}>
        <li>
          <Link href="/provider_and_signer">Provider And Signer</Link>
        </li>
        <li>
          <Link href="/primitives">Primitives</Link>
        </li>
        <li>
          <Link href="/reference_types">Reference Types</Link>
        </li>
      </ul>
    </Layout>
  );
};

export default Index;
