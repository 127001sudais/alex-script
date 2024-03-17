# SPL-Token Monitor Script

## Introduction

This NodeJS script automates the monitoring of SPL-token transactions to identify and act upon unauthorized wallet activities. It achieves this by comparing transaction wallets against a pre-defined whitelist. Any wallet not included in the whitelist is automatically frozen by the `freezeAuthority` wallet, and its details are recorded in an Excel sheet for further action or review.

The primary goal of this script is to enhance the security of SPL-token transactions by preventing unauthorized access and usage.

## Features

- Automatic monitoring of SPL-token transactions.
- Verification against a whitelist to identify unauthorized wallets.
- Freezing of unauthorized wallets using a `freezeAuthority` wallet.
- Recording of unauthorized wallet details in an Excel sheet.

## Requirements

Before installing and using this script, ensure you meet the following requirements:

- NodeJS (LTS version)
- A valid SPL-token `freezeAuthority` wallet address
- Access to a list of whitelisted wallet addresses
