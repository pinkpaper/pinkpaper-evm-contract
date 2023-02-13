const fs = require('fs')
var Factory = artifacts.require('Factory');
var Project = artifacts.require('Project');

module.exports = function (deployer) {
    deployer.deploy(Factory).then(() => {

        // if (Factory._json) {
        //     fs.mkdir('./src/deployed', { recursive: true }, (err) => {
        //         if (err) throw err
        //     })
        //     // Save abi file to deployedABI.
        //     fs.writeFile(
        //         './src/deployed/fundingfactory',
        //         JSON.stringify(Factory._json.abi, 2),
        //         (err) => {
        //             if (err) throw err
        //             console.log(`The abi of ${Factory._json.contractName} is recorded on deployedABI file`)
        //         }
        //     )
        //     fs.writeFile(
        //         './src/deployed/fundingproject',
        //         JSON.stringify(Project._json.abi, 2),
        //         (err) => {
        //             if (err) throw err
        //             console.log(`The abi of ${Project._json.contractName} is recorded on deployedABI file`)
        //         }
        //     )
        // }
        // fs.writeFile('./src/deployed/FactoryAddress', Factory.address, (err) => {
        //     if (err) throw err
        //     console.log(
        //         `The deployed contract address * ${Factory.address} * is recorded on deployedAddress file`
        //     )
        // })
    })



}