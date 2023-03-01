/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    networkName: "goerli",
    primitivesAddress: "0xE3c438a87c3d3aBE58316fF7c3D345eFD9dE0462",
    referenceTypesAddress: "0xacaa0854172908c12c1Ed72ab5e53C442356dcF3"
  },
};

module.exports = nextConfig;
