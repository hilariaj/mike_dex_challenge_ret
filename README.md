
# DEX Challenge API – [your Name]ApiTest

This project is part of a technical challenge to demonstrate integration with smart contracts on blockchain, on-chain data reading, and exposure through a REST API.

---

## Features
- Query a smart contract on the **BSC Testnet**
- Return information such as:
  - **Admin**
  - **Commission**
  - **Link** (by ID)
  - **User access permission**
- Test endpoint ready for validation.

---

## Tech Stack
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Ethers.js](https://docs.ethers.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## Installation & Usage

### 1. Clone the repository
git clone https://github.com/user/mike_dex_challenge_ret.git
cd mike_dex_challenge_ret

### 2. Install dependencies
npm install

### 3. Set up environment variables
Adjust the variables as needed. Create a .env file based on the example:
cp server/.env.example server/.env

### 4. Run the server
npm start

---

### Main Routes
API Test: GET /[yourName]ApiTest?linkId=0&user=0x0000000000000000000000000000000000000000
Local example: http://localhost:3099/[yourName]ApiTest

---

## Smart Contract Used 
BSC Testnet
Address: 0x8d2af210f8850eDb8a5224bcC9A6129897Af42f


