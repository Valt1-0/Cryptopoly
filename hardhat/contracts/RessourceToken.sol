// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract ResourceToken is ERC721URIStorage {
    uint256 private _tokenIds;
    IERC20 private paymentToken;
    uint256 public maxOwnership = 4;
    uint256 public transactionCooldown = 5 minutes;
    error PaymentFailed(); // Custom error

    enum ResourceType {
        MAISON,
        VILLA,
        HOTEL
    }

    struct House {
        string name;
        ResourceType resourceType;
        uint256 value;
        string ipfsHash;
        address[] previousOwners;
        uint256 createdAt;
        uint256 lastTransferAt;
        bool available;
    }

    mapping(uint256 => House) public houses;
    mapping(address => uint256) public lastTransactionTime;

    event HouseMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string name,
        ResourceType resourceType,
        uint256 value,
        string ipfsHash
    );
    event HousePurchased(
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 value
    );
    event HouseListed(uint256 indexed tokenId, uint256 value);

    constructor(address paymentTokenAddress) ERC721("ResourceToken", "RTK") {
        _tokenIds = 0;
        paymentToken = IERC20(paymentTokenAddress);
    }

    function mintHouse(
        string memory name,
        ResourceType resourceType,
        uint256 value,
        string memory ipfsHash
    ) public returns (uint256) {
        require(
            balanceOf(msg.sender) < maxOwnership,
            "Ownership limit reached"
        );

        _tokenIds += 1;
        uint256 newItemId = _tokenIds;
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, ipfsHash);

        houses[newItemId] = House({
            name: name,
            resourceType: resourceType,
            value: value,
            ipfsHash: ipfsHash,
            previousOwners: new address[](0),
            createdAt: block.timestamp,
            lastTransferAt: block.timestamp,
            available: true
        });

        emit HouseMinted(
            newItemId,
            msg.sender,
            name,
            resourceType,
            value,
            ipfsHash
        );
        return newItemId;
    }

    function purchaseHouse(uint256 tokenId) public {
        require(houses[tokenId].available, "House not available for sale");
        try
            paymentToken.transferFrom(
                msg.sender,
                ownerOf(tokenId),
                houses[tokenId].value
            )
        {} catch {
            revert PaymentFailed();
        }

        require(
            balanceOf(msg.sender) < maxOwnership,
            "Ownership limit reached"
        );
        require(
            block.timestamp >=
                lastTransactionTime[msg.sender] + transactionCooldown,
            "Cooldown active"
        );

        address previousOwner = ownerOf(tokenId);
        _transfer(previousOwner, msg.sender, tokenId);

        houses[tokenId].previousOwners.push(previousOwner);
        houses[tokenId].lastTransferAt = block.timestamp;
        houses[tokenId].available = false;
        lastTransactionTime[msg.sender] = block.timestamp;

        emit HousePurchased(tokenId, msg.sender, houses[tokenId].value);
    }

    function listHouseForSale(uint256 tokenId, uint256 value) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner");
        require(!houses[tokenId].available, "House is already on sale");

        houses[tokenId].value = value;
        houses[tokenId].available = true;

        emit HouseListed(tokenId, value);
    }

    function getMyHouses() public view returns (uint256[] memory) {
        uint256 count = balanceOf(msg.sender);
        uint256[] memory ownedHouses = new uint256[](count);
        uint256 index = 0;

        for (uint256 i = 1; i <= _tokenIds; i++) { 
            if (ownerOf(i) == msg.sender) {
                ownedHouses[index] = i;
                index++;
            }
        }
        return ownedHouses;
    }

    function getAvailableHouses()
        public
        view
        returns (uint256[] memory, address[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (houses[i].available) {
                count++;
            }
        }

        uint256[] memory availableHouses = new uint256[](count);
        address[] memory owners = new address[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (houses[i].available) {
                availableHouses[index] = i;
                owners[index] = ownerOf(i);
                index++;
            }
        }
        return (availableHouses, owners);
    }

    function getResourceTypes() public pure returns (string[] memory) {
        string[] memory types = new string[](3);
        types[0] = "MAISON";
        types[1] = "VILLA";
        types[2] = "HOTEL";
        return types;
    }

    function getHouse(
        uint256 tokenId
    )
        public
        view
        returns (
            string memory name,
            string memory resourceType,
            uint256 value,
            string memory ipfsHash,
            uint256 createdAt,
            uint256 lastTransferAt,
            bool available
        )
    {
        require(tokenId > 0 && tokenId <= _tokenIds, "Invalid tokenId");
        House storage house = houses[tokenId];

        return (
            house.name,
            getResourceTypeAsString(house.resourceType),
            house.value,
            house.ipfsHash,
            house.createdAt,
            house.lastTransferAt,
            house.available
        );
    }

    function getResourceTypeAsString(
        ResourceType resourceType
    ) internal pure returns (string memory) {
        if (resourceType == ResourceType.MAISON) return "MAISON";
        if (resourceType == ResourceType.VILLA) return "VILLA";
        if (resourceType == ResourceType.HOTEL) return "HOTEL";
        return "";
    }
}
