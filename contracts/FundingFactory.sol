/*
    Instructions to deploy factory
    1. Deploy the factory address
    2. set the protocol fees and protocol address using the functions in the factory
    3. Then call createProject function to create projects


**/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./FundingProject.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Factory is Ownable {

    // create a child contract storage
    address[] public projects;
    uint256 protocolFees; // In Percentage
    address protocolV1;
    event ProjectCreated(address indexed _project, address indexed _creator); //project creation event

    function createProject(uint256 _minimum, uint256 _target, string memory _projectURI) public{
        Project project = new Project(_minimum, _target, _projectURI, msg.sender, protocolFees, protocolV1);
        address projectId = address(project);
        projects.push(projectId);
        emit ProjectCreated(projectId, msg.sender);
    }

    // returns all the child arrays
    function getProjects() public view returns(address[] memory){
        return projects;
    }

    // functions to set the value of tokenAddress
    function setProtocolFees(uint256 _protocolFees) public onlyOwner {
        protocolFees = _protocolFees;
    }

    function getProtocolFees() public view returns(uint256) {
        return protocolFees;
    }

    function getprotocolAddress() public view returns(address){
        return protocolV1;
    }

    // function to set the protocol address to accumulate fees
    function setProtocolAddress(address _protocol) public onlyOwner {
        protocolV1 = _protocol;
    }

}