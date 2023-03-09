/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    networkName: "goerli",
    primitivesAddress: "0xE3c438a87c3d3aBE58316fF7c3D345eFD9dE0462",
    referenceTypesAddress: "0xacaa0854172908c12c1Ed72ab5e53C442356dcF3",
    strangeFactoryAddress: "0x46B66CA90A9f08f4E80f76d0d736e75CAD538aBC"
    // strangeFactoryAddress: "0x263c74D9789aa16BaAA033214BBE9ED6f5c6BE60"
  },
};

module.exports = nextConfig;
