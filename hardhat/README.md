# Cryptopoly Hardhat Project

This project demonstrates a basic Hardhat use case for the Cryptopoly game. It includes contracts for `SupCoin` and `ResourceToken`, deployment scripts, and tasks for interacting with the contracts.

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [Hardhat](https://hardhat.org/) installed.

### Installation

Clone the repository and install the dependencies:

```shell
git clone <repository-url>
cd projet/hardhat
npm install
```

### Deployment

Deploy the contracts using the provided script:

```shell
npx hardhat run scripts/deployNFT.js --network localhost
```

### Tasks

You can run the following tasks to interact with the contracts:

- **Help**: Display Hardhat help
    ```shell
    npx hardhat help
    ```

- **Test**: Run the tests
    ```shell
    npx hardhat test
    ```

- **Report Gas**: Run the tests with gas reporting
    ```shell
    REPORT_GAS=true npx hardhat test
    ```

- **Node**: Start a local Hardhat node
    ```shell
    npx hardhat node
    ```

- **Faucet**: Send ETH and tokens to an address
    ```shell
    npx hardhat faucet --network localhost <receiver-address>
    ```

- **Create Houses**: Create houses for the ResourceToken contract
    ```shell
    npx hardhat create-houses --contract <ResourceToken-address> --network localhost
    ```

### Directory Structure

- `contracts/`: Contains the Solidity contracts
- `scripts/`: Contains the deployment scripts
- `tasks/`: Contains custom Hardhat tasks
- `test/`: Contains the test files

### Additional Resources

For more information, refer to the [Hardhat documentation](https://hardhat.org/getting-started/).
