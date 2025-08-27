const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const orderRoute = require("./orderRoute");
const paymentRoute = require("./paymentRoute");
const productRoute = require("./productRoute");

router.use("/user", userRoute);
router.use("/order", orderRoute);
router.use("/payment", paymentRoute);
router.use("/product", productRoute);


// ===== Challenge Route: HilariaApiTest (BSC Testnet) (BSC Testnet) =====
const { ethers } = require("ethers");

const RPC_URL = process.env.RPC_URL || "https://data-seed-prebsc-1-s1.binance.org:8545/";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0x8d2Af210F8055eDb8A5224beC90A6129897AF42f";

// Minimum ABI with required readings
const ABI = [
  "function admin() view returns (address)",
  "function commission() view returns (uint256)",
  "function getLink(uint256 id) view returns (tuple(string url,uint256 price,address owner,bool active))",
  "function hasAccess(address user) view returns (bool)"
];

//const provider = new ethers.JsonRpcProvider(RPC_URL);
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

// GET /HilariaApiTest?linkId=0&user=0x...
router.get("/HilariaApiTest", async (req, res) => {
  console.log(`[${new Date().toISOString()}] /HilariaApiTest called`, req.query);
  try {
    const linkId = Number.isFinite(Number(req.query.linkId)) ? Number(req.query.linkId)  : 0;
    const user = (req.query.user ||  "0x0000000000000000000000000000000000000000").toString();

    // Readings
    const [admin, commission, linkTuple, access] = await Promise.all([
      contract.admin(),
      contract.commission(),
      contract.getLink(linkId).catch(() => null),
      contract.hasAccess(user).catch(() => null),
    ]);

    // Logs required by the test
    console.log("=== HilariaApiTest ===");
    console.log("Contrato:", CONTRACT_ADDRESS);
    console.log("Admin:", admin);
    console.log("Commission (wei):", commission?.toString?.() ?? commission);
    console.log(`getLink(${linkId}):`, linkTuple);
    console.log(`hasAccess(${user}):`, access);

    // JSON response for verification
    res.json({
      network: "BSC Testnet",
      contract: CONTRACT_ADDRESS,
      admin,
      commissionWei: commission?.toString?.() ?? commission,
      linkId,
      link:
        linkTuple && {
          url: linkTuple.url,
          priceWei: linkTuple.price?.toString?.() ?? linkTuple.price,
          owner: linkTuple.owner,
          active: linkTuple.active,
        },
      checkedUser: user,
      hasAccess: access,
    });
  } catch (err) {
    console.error("[HilariaApiTest][ERROR]", err);
    res.status(500).json({
      error: "Erro ao buscar dados do contrato",
      details: String(err),
    });
  }
});
module.exports = router;