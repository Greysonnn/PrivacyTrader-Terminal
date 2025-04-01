# PrivacyTrader-Terminal

Lightweight, privacy-focused desktop application designed for professional traders who need real-time orderbook data and rapid trade execution capabilities.

Built with Python and PyQt5, it connects directly to Interactive Brokers' API to provide Level II market data for stocks and futures across multiple exchanges.

Unlike cloud-based alternatives, PrivacyTrader stores all data locally with AES-256 encryption, has zero telemetry, and operates with minimal network footprint.

The application complements TradingView for charting while focusing exclusively on orderbook visualization and trade execution. With its clean, minimal interface, traders can quickly place market, limit, and stop orders with ease.

PrivacyTrader is ideal for day traders, scalpers, and privacy-conscious investors who prioritize data security and execution speed over complex features.

![image](https://github.com/user-attachments/assets/93732bc9-ec09-47cb-9b40-eded255c2ccb)

### API Config Button in Header

- "API Config" button in the top navigation bar
- When clicked, it opens a modal dialog for entering API credentials

### Secure API Configuration Dialog
The dialog includes fields for all necessary IBKR API credentials:

- **API Key** - With show/hide toggle for security
- **API Secret** - With show/hide toggle for security
- **Account ID** - For identifying the specific trading account
- **API Endpoint** - Configurable endpoint (default: api.interactivebrokers.com)
- **Port** - Configurable port (default: 4001)
- **Encryption Toggle** - Option to enable/disable AES-256 encryption


### Security Features

- Password fields mask sensitive information by default
- Show/hide toggles allow temporary viewing of credentials when needed
- Clear indication that credentials are stored locally with encryption
- The dialog emphasizes the privacy-first approach with a reminder about local encryption


### Integration with App

- The status bar now shows the connected account ID
- API settings are stored in state and would be encrypted before saving to local storage
- The configuration follows the privacy-first approach specified in the requirements


### Implementation Notes

In a real implementation:

1. API credentials would be encrypted using AES-256 before storing locally
2. The app would use these credentials to establish a connection to IBKR
3. No credentials would ever be transmitted to any server other than IBKR
4. The app would validate credentials before saving them
5. A master password would be required to decrypt and use the stored credentials


## Technicals

![image](https://github.com/user-attachments/assets/3305970d-7bfe-4766-b0c1-e53550cafc59)

Set up IBKR paper trading account and API credentials

Install Python 3.11, PyQt5, ib_insync, cryptography, pysqlcipher3

Configure development environment with IDE (PyCharm/VSCode)


