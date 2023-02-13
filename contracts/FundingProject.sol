// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Project {

    uint256 minimumAmount; 
    uint256 targetAmount;
    string projectURI;
    uint256 balance=0;
    address owner;
    uint256 totalFunded = 0;
    uint256 protocolFees;
    address protocol;

    mapping (address => uint256) funderAddresses;
    address[] funder;


    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor(uint256 _minimumAmount, uint256 _targetAmount, string memory _projectURI, address _creator, uint256 _protocolFees, address _protocol) {
        minimumAmount = _minimumAmount;
        targetAmount = _targetAmount;
        projectURI = _projectURI;
        owner = _creator;
        protocolFees = _protocolFees;
        protocol = _protocol;
    }

    // contribute function which will be responsible for contributions to this project
    function contribute() public payable {
        require(msg.value >= minimumAmount);
        balance = balance + msg.value;
        totalFunded = totalFunded + msg.value;
        funderAddresses[msg.sender] = funderAddresses[msg.sender] + msg.value;
        funder.push(msg.sender);
    }

    // function to check contributions of a particular address
    function getContribution(address _user) public view returns(uint256) {
        return funderAddresses[_user];
    }

    // function to get the total funded in this project till date
    function getTotalFundedAmount() public view returns(uint256){
        return totalFunded;
    }

    // function to get all the investors, may contain duplicate data
    function getAllInvestors() public view returns(address[] memory){
        return funder;
    }

    // function to get the owner of the project
    function getOwner() public view returns(address){
        return owner;
    }

    // function to withdraw the amount which would be owner only
    function withdraw() public onlyOwner {
        payable(protocol).transfer((balance * protocolFees) / 10000);
        balance = balance - ( (balance * protocolFees) / 10000);
        payable(owner).transfer(balance);
        balance=0;
    }

    // get project data
    function getProjectData() public view returns(uint256, uint256, string memory, address, uint256, uint256){
        return (minimumAmount, targetAmount, projectURI, owner, balance, totalFunded);
    }

}