const { ethers } = require('ethers');

const RPC_URL = 'https://sepolia-rpc.giwa.io';
const CONTRACT_ADDRESS = '0x2b3176f8D3d0C5D1D58e662c5a7180E4E9fEf71B';
const ABI = ["event ProfileCreated(address indexed user, string handle, uint256 timestamp)"];

async function fetchAllEvents(readContract, readProvider, filter){
  const latest = await readProvider.getBlockNumber();
  const CHUNK = 99000;
  const WINDOW = 2000000;
  const fromBlock = Math.max(0, latest - WINDOW);
  const chunkStarts = [];
  for(let start = fromBlock; start <= latest; start += CHUNK) chunkStarts.push(start);
  console.log(`Querying ${chunkStarts.length} chunks in parallel...`);
  const t0 = Date.now();
  const chunkResults = await Promise.all(chunkStarts.map(async (start) => {
    const end = Math.min(start + CHUNK - 1, latest);
    try{
      return await readContract.queryFilter(filter, start, end);
    }catch(e){
      console.log(`  chunk ${start}-${end} FAILED: ${e.message}`);
      return [];
    }
  }));
  console.log(`Done in ${Date.now() - t0}ms`);
  return chunkResults.flat();
}

async function main(){
  const provider = new ethers.JsonRpcProvider(RPC_URL, { chainId: 91342, name: 'giwa-sepolia' }, { staticNetwork: true });
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
  const filter = contract.filters.ProfileCreated();
  const events = await fetchAllEvents(contract, provider, filter);
  console.log(`\n✅ TOTAL FOUND: ${events.length} ProfileCreated event(s)`);
  events.forEach(e => console.log(`   - ${e.args.user} "${e.args.handle}" (block ${e.blockNumber})`));
}

main().catch(e => console.error('FAILED:', e.message));
