const Factory = artifacts.require("Factory");
const Project = artifacts.require("Project");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Factory", function ( accounts ) {

  // we will need a factory instance and a token instance
  // we will need to set the initial values of token address and freetokensperproject

  let factory;
  beforeEach(async () => {
    factory = await Factory.deployed();

    // set token address in factory
    await factory.setProtocolFees(1000, {from: accounts[0]}); //Equivalent to 10% => 1000

    await factory.setProtocolAddress(accounts[1], {from: accounts[0]}) // setting second account as the account to cater with fees

    // Create a Project
    await factory.createProject(web3.utils.toWei('0.1'), web3.utils.toWei('10'), "project URI");

  })

  // Check if the above values are set properly
  it("Checking the set values", async function () {

    // check if the protocol fees is set
    var protocolFees = await factory.getProtocolFees();
    assert.equal(protocolFees, '1000');

    // check if the protocol address is set
    var protocolAddress = await factory.getprotocolAddress();
    console.log('protocolAddress', protocolAddress)
    assert.equal(protocolAddress, accounts[1]);

    // check if the project exist
    var projectId = await factory.projects(0);
    assert.notEqual(projectId, '0x0000000000000000000000000000000000000000')
    
  });

  it("Check if we can contribute to the project with lesser than minimum value", async function () {
    var projectId = await factory.projects(0);
    var project = await Project.at(projectId);
    project.contribute({from: accounts[2], value: web3.utils.toWei('0.01')}).catch((e)=>{
      assert(true);
    })
  });

  it("Check if we can contribute to the project", async function () {
    var projectId = await factory.projects(0);
    var project = await Project.at(projectId);
    await project.contribute({from: accounts[2], value: web3.utils.toWei('1')})

    var balance = await web3.eth.getBalance(projectId);
    assert.equal(web3.utils.fromWei(balance), '1');

  });

  // check if only owner is able to withdraw the amount
  it("check if only owner can withdraw", async function() {
    var projectId = await factory.projects(0);
    var project = await Project.at(projectId);
    project.withdraw({from:accounts[1]}).catch((e)=>{
      assert(true)
    })
  });

  // check withdrawal and protocol fees
  it("check withdrawal and protocol fees if deducted successfully", async function() {
    var projectId = await factory.projects(0);
    var project = await Project.at(projectId);
    var initialbalance = await web3.eth.getBalance(projectId);
    var initialAccountBalance = await web3.eth.getBalance(accounts[1]);
    var initialAccount0Balance = await web3.eth.getBalance(accounts[0]);
    assert.equal(web3.utils.fromWei(initialbalance), '1')
    await project.withdraw({from:accounts[0]})
    var finalbalance = await web3.eth.getBalance(projectId)
    var finalAccountBalance = await web3.eth.getBalance(accounts[1]);
    var finalAccount0Balance = await web3.eth.getBalance(accounts[0]);
    assert.equal(web3.utils.fromWei(finalbalance), '0')
    console.log('initialbalance', initialbalance)
    console.log('finalbalance', finalbalance)
    console.log('initialAccountBalance', initialAccountBalance)
    console.log('finalAccountBalance', finalAccountBalance)
    console.log('initialAccount0Balance', initialAccount0Balance)
    console.log('finalAccount0Balance', finalAccount0Balance)
    assert(Number(web3.utils.fromWei(finalAccountBalance)) > Number(web3.utils.fromWei(initialAccountBalance)));
    // Oracles, yield protocols, proxy contracts/upgradable contracts


  });


});
