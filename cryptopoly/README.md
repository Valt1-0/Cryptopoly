# Cryptopoly

Cryptopoly is a decentralized finance platform that empowers you to take control of your assets. With Cryptopoly, you can trade assets, lend, borrow, and earn interest in a secure and decentralized environment.

## Getting Started

This project uses React and Vite for the frontend. Follow the instructions below to set up the project locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Valt1-0/cryptopoly.git
    cd cryptopoly
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Project

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

This will start the Vite development server and you can view the application at `http://localhost:port`.

### Building for Production

To build the project for production, run:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

### Project Structure

- `src/pages`: Contains the main pages of the application (`Home.jsx`, `Market.jsx`, `AddHouse.jsx`)
- `src/components`: Contains reusable components (`Card.jsx`)
- `src/context`: Contains the wallet context (`walletContext.jsx`)
- `src/utils`: Contains utility functions (`pinata.js`)

### Configuration

The project uses Vite for bundling and development. The configuration file is `vite.config.js`.

### Smart Contracts

The project interacts with smart contracts deployed on the blockchain. The contract artifacts are located in the `src/contracts` directory.

### Wallet Integration

The project integrates with MetaMask for wallet functionality. The wallet context is managed in `src/context/walletContext.jsx`.

### IPFS Integration

The project uses IPFS for storing and retrieving metadata. The utility functions for IPFS are located in `src/utils/pinata.js`.

### License

This project is licensed under the MIT License.

### Acknowledgements

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Ethers.js](https://docs.ethers.io/v5/)
- [IPFS](https://ipfs.io/)

 

