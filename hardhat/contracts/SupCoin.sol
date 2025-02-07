// filepath: /D:/PERSO/Documents/SupInfo/5BLOC/exercice/React/hardhat-boilerplate-master/contracts/SupCoin.sol
// SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.28;

// We import this library to be able to use console.log
import "hardhat/console.sol";

// We import this library to be able to use ERC20
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// This is the main building block for smart contracts.
contract SupCoin is ERC20 {
    // An address type variable is used to store ethereum accounts.
    address public owner;

    /**
     * Contract initialization.
     */
    constructor(uint256 initialSupply) ERC20("SupCoin", "SUP") {
        owner = msg.sender;
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    /**
     * A function to transfer tokens.
     *
     * The `public` modifier makes a function callable from outside
     * the contract and within the contract.
     */
    function transfer(address to, uint256 amount) public override returns (bool) {
        // Check if the transaction sender has enough tokens.
        // If `require`'s first argument evaluates to `false` then the
        // transaction will revert.
        require(balanceOf(msg.sender) >= amount, "Not enough tokens");

        // We can print messages and values using console.log, a feature of
        // Hardhat Network:
        console.log(
            "Transferring from %s to %s %s tokens",
            msg.sender,
            to,
            amount
        );

        // Transfer the amount.
        _transfer(msg.sender, to, amount);

        return true;
    }

    /**
     * Read only function to retrieve the token balance of a given account.
     *
     * The `public` modifier indicates that it doesn't modify the contract's
     * state, which allows us to call it without executing a transaction.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return super.balanceOf(account);
    }
}