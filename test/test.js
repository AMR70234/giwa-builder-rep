const hre = require("hardhat");
const { expect } = require("chai");

describe("GiwaBuilderRep", function () {
  let contract, deployer, alice, bob, carol;

  beforeEach(async function () {
    [deployer, alice, bob, carol] = await hre.ethers.getSigners();
    const factory = await hre.ethers.getContractFactory("GiwaBuilderRep");
    contract = await factory.deploy();
    await contract.waitForDeployment();
  });

  it("ينشئ بروفايل بنجاح", async function () {
    await contract.connect(alice).createProfile("alice.giwa", "ipfs://alice-bio");
    const profile = await contract.profiles(alice.address);
    expect(profile.handle).to.equal("alice.giwa");
    expect(profile.exists).to.equal(true);
  });

  it("يمنع إنشاء بروفايل مكرر", async function () {
    await contract.connect(alice).createProfile("alice.giwa", "");
    await expect(
      contract.connect(alice).createProfile("alice2.giwa", "")
    ).to.be.revertedWithCustomError(contract, "ProfileAlreadyExists");
  });

  it("يمنع الشخص من تصديق نفسه", async function () {
    await contract.connect(alice).createProfile("alice.giwa", "");
    await expect(
      contract.connect(alice).issueAttestation(alice.address, "Dev", "evidence")
    ).to.be.revertedWithCustomError(contract, "CannotAttestSelf");
  });

  it("يعطي وزن أساسي (1) لأول شهادة من مستخدم جديد", async function () {
    await contract.connect(alice).createProfile("alice.giwa", "");
    await contract.connect(bob).createProfile("bob.giwa", "");

    await contract.connect(alice).issueAttestation(bob.address, "Reliable Developer", "evidence-uri");

    const score = await contract.getScore(bob.address);
    expect(score).to.equal(1); // BASE_WEIGHT = 1 لأن alice سمعتها = 0 وقت الإصدار

    const attestations = await contract.getAttestations(bob.address);
    expect(attestations.length).to.equal(1);
    expect(attestations[0].issuerWeight).to.equal(1);
  });

  it("الوزن يزيد فعلياً كل ما سمعة المُصدِر تزيد (النقطة الجوهرية)", async function () {
    await contract.connect(alice).createProfile("alice.giwa", "");
    await contract.connect(bob).createProfile("bob.giwa", "");
    await contract.connect(carol).createProfile("carol.giwa", "");

    await contract.connect(bob).issueAttestation(alice.address, "Good Collaborator", "e1");
    await contract.connect(carol).issueAttestation(alice.address, "Good Collaborator", "e2");

    const aliceScoreBefore = await contract.getScore(alice.address);
    expect(aliceScoreBefore).to.equal(2);

    await contract.connect(alice).issueAttestation(bob.address, "Trusted", "e3");
    const bobAttestations = await contract.getAttestations(bob.address);
    expect(bobAttestations[0].issuerWeight).to.equal(1); // 1 + floor(2/10) = 1
  });

  it("يرجع كل شهادات شخص معين بشكل صحيح", async function () {
    await contract.connect(alice).createProfile("alice.giwa", "");
    await contract.connect(bob).createProfile("bob.giwa", "");
    await contract.connect(carol).createProfile("carol.giwa", "");

    await contract.connect(alice).issueAttestation(carol.address, "Cat1", "e1");
    await contract.connect(bob).issueAttestation(carol.address, "Cat2", "e2");

    const count = await contract.getAttestationCount(carol.address);
    expect(count).to.equal(2);
  });
});
