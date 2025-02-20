// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SupCoin
 * @dev ERC20 Token with ownership, minting, and burning functionalities.
 */
contract SupCoin is ERC20, Ownable {
    /**
     * @dev Contract constructor that initializes the token supply to the deployer.
     * @param initialSupply The initial supply of tokens (before applying decimals).
     */
    constructor(
        uint256 initialSupply
    ) ERC20("SupCoin", "SUP") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    /**
     * @dev Function to mint new tokens. Only the owner can call this function.
     * @param to The address that will receive the newly minted tokens.
     * @param amount The amount of tokens to mint.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        _mint(to, amount);
    }

    /**
     * @dev Function to burn tokens from the caller's account.
     * @param amount The amount of tokens to burn.
     */
    function burn(uint256 amount) external {
        require(amount > 0, "Burn amount must be greater than zero");
        _burn(msg.sender, amount);
    }

    /**
     * @dev Override the transfer function to add additional security checks if needed.
     * The ERC20 implementation already checks balances, so no extra logic is needed.
     * @param to The recipient address.
     * @param amount The amount to transfer.
     * @return bool Returns true if the transfer succeeds.
     */
    function transfer(
        address to,
        uint256 amount
    ) public override returns (bool) {
        require(to != address(0), "Cannot transfer to zero address");
        return super.transfer(to, amount);
    }
}
