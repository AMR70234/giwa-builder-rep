const hre = require("hardhat");

async function main() {
  console.log("🚀 بدء نشر العقد على GIWA Sepolia...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📤 هيتم النشر من المحفظة:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 الرصيد الحالي:", hre.ethers.formatEther(balance), "ETH");

  if (balance === 0n) {
    console.log("⚠️  رصيدك صفر! اعمل claim من الفوسيت الأول: https://faucet.giwa.io");
    process.exit(1);
  }

  const GiwaBuilderRep = await hre.ethers.getContractFactory("GiwaBuilderRep");
  const contract = await GiwaBuilderRep.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("✅ العقد اتنشر بنجاح!");
  console.log("📍 عنوان العقد:", address);
  console.log("🔍 شوفه على الـ Explorer:");
  console.log(`   https://sepolia-explorer.giwa.io/address/${address}`);
}

main().catch((error) => {
  console.error("❌ حصل خطأ أثناء النشر:", error);
  process.exitCode = 1;
});
