# Digital Transaction Analysis

The project explores the rising usage of digital payment methods and the transformative impact of Unified Payments Interface (UPI) on financial inclusion and secure digital payments in India. Motivated by the rapid digitalization of financial transactions, this work aims to provide detailed insights into evolving payment trends to support policymakers and financial analysts.

Data acquisition involves scraping diverse, authoritative sources such as the NPCI website, RBI reports, and annual financial releases. The collected raw data undergoes a meticulous cleaning pipeline and is stored efficiently using an Object-Relational Mapping (ORM) framework with a SQLite database, enabling structured management across multiple interconnected tables.

Additionally, a robust backend and an interactive frontend have been developed to facilitate seamless access to the datasets and provide dynamic visualizations. These intuitive graphics simplify complex information, empower stakeholders to monitor growth and changes in digital transactions, and drive informed decision-making and strategic innovation within the fintech sector.


## Installation

#### Clone the project

```bash
  git clone https://github.com/viren711/DigitalTransactionAnalysis
  cd DigitalTransactionAnalysis
```

#### Install necessary libraries

```bash
    pip install -r requirements.txt
```

#### Backend

- Run the flask app

```bash
  cd Backend
  python app.py
```

- The backend runs on PORT 5000
    

#### Frontend

- Install node modules and other dependencies

```bash
  cd Frontend
  npm i
  npm run dev
```

- The backend runs on PORT 5173
## API Reference

The listed APIs serve as endpoints for fetching various tables related to digital transactions and predictive analytics.

```http
  GET /api/ecosystem
  GET /api/digital_payments
  GET /api/bankwise_top10_upi
  GET /api/digital_payments_with_25_preds
  GET /api/digital_payments_predictions_26_27
```



## Authors

- [Viren Mehta (25M2132)](https://www.github.com/viren711)
- [Shikhar Rai (25M2128)](https://www.github.com/Shikhar-Rai-007)
- [Vedant Chavan (25M2124)](https://www.github.com/VedantChavan03)


## Acknowledgements

 - [NPCI Website](https://www.npci.org.in/product/ecosystem-statistics/upi)
 - [RBI Annual Report](https://www.rbi.org.in/Scripts/AnnualReportMainDisplay.aspx)

