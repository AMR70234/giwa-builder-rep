const { ethers } = require('ethers');

const RPC_URL = 'https://sepolia-rpc.giwa.io';
const CONTRACT_ADDRESS = '0x2b3176f8D3d0C5D1D58e662c5a7180E4E9fEf71B';
const ABI = [
  "event ProfileCreated(address indexed user, string handle, uint256 timestamp)"
];

async function main() {
  console.log('🔍 GIWA RPC Diagnostic\n' + '='.repeat(50));

  const provider = new ethers.JsonRpcProvider(RPC_URL, { chainId: 91342, name: 'giwa-sepolia' }, { staticNetwork: true });
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  // Test 1: Basic connectivity
  console.log('\n[1/4] Testing basic RPC connectivity...');
  let latestBlock;
  try {
    latestBlock = await provider.getBlockNumber();
    console.log(`✅ Connected. Latest block: ${latestBlock}`);
  } catch (e) {
    console.log(`❌ FAILED: ${e.message}`);
    console.log('\n>>> The RPC itself is unreachable. Check your internet connection or the RPC URL.');
    return;
  }

  // Test 2: Full range query (0 to latest) — what our original code tried
  console.log('\n[2/4] Testing full-range eth_getLogs (block 0 to latest)...');
  try {
    const filter = contract.filters.ProfileCreated();
    const events = await contract.queryFilter(filter, 0, 'latest');
    console.log(`✅ SUCCESS. Found ${events.length} ProfileCreated event(s).`);
    events.forEach(e => console.log(`   - ${e.args.user} (block ${e.blockNumber})`));
  } catch (e) {
    console.log(`❌ FAILED: ${e.message}`);
    if (e.info) console.log(`   info: ${JSON.stringify(e.info)}`);
  }

  // Test 3: Small recent range query (last 5000 blocks)
  console.log('\n[3/4] Testing small-range eth_getLogs (last 5,000 blocks)...');
  try {
    const filter = contract.filters.ProfileCreated();
    const fromBlock = Math.max(0, latestBlock - 5000);
    const events = await contract.queryFilter(filter, fromBlock, latestBlock);
    console.log(`✅ SUCCESS. Found ${events.length} ProfileCreated event(s) in this range.`);
  } catch (e) {
    console.log(`❌ FAILED: ${e.message}`);
    if (e.info) console.log(`   info: ${JSON.stringify(e.info)}`);
  }

  // Test 4: Tiny range query (last 100 blocks) — sanity check that logs work at all
  console.log('\n[4/4] Testing tiny-range eth_getLogs (last 100 blocks)...');
  try {
    const filter = contract.filters.ProfileCreated();
    const fromBlock = Math.max(0, latestBlock - 100);
    const events = await contract.queryFilter(filter, fromBlock, latestBlock);
    console.log(`✅ SUCCESS. eth_getLogs works on this RPC (found ${events.length} events in tiny range).`);
  } catch (e) {
    console.log(`❌ FAILED: ${e.message}`);
    console.log('\n>>> eth_getLogs may be disabled entirely on this public RPC.');
  }

  console.log('\n' + '='.repeat(50));
  console.log('Diagnostic complete. Share this full output.');
}

main().catch(e => console.error('Unexpected error:', e));
