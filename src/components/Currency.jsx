import { FaAngleRight } from "react-icons/fa6";
import { FaAnglesDown } from "react-icons/fa6";
import "../styles/currency.css";
import { useEffect, useState } from "react";
import axios from "axios";
function Currency() {
  const currenciesUrl =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";
  const [amountFrom, setAmountFrom] = useState(1);
  const [convertFrom, setConvertFrom] = useState("");
  const [convertTo, setConvertTo] = useState("azn");
  const [currencies, setCurrencies] = useState([]);
  const [amounTo, setAmounTo] = useState();
  const getCurrens = async () => {
    const resp = await axios.get(currenciesUrl);
    const data = resp.data;
    const keys = Object.keys(data).slice(2);
    setCurrencies(keys);
  };
  useEffect(() => {
    getCurrens();
  }, []);

  useEffect(() => {
    if (currencies.length > 0) {
      setConvertFrom(currencies[0]);
    }
  }, [currencies]);

  const exchangeCurrency =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
  const exChange = async () => {
    const res = await axios.get(`${exchangeCurrency}${convertFrom}.json`);
    const data = res.data[convertFrom];
    const amountTo = (amountFrom * data[convertTo]).toFixed(4);
    setAmounTo(amountTo);
  };
  return (
    <div className="valyutaWrapper">
      <div className="valyutaConvertor">
        <h1 id="title">Valyuta Konvertoru</h1>

        <div className="inps">
          <input
            type="number"
            value={amountFrom}
            onChange={(e) => setAmountFrom(e.target.value)}
          />
          <select
            value={convertFrom}
            onChange={(e) => setConvertFrom(e.target.value)}
          >
            {currencies.map((currencyItem, index) => (
              <option key={index} value={currencyItem}>
                {currencyItem}
              </option>
            ))}
          </select>
          <FaAngleRight className="arrowRight" />
          <FaAnglesDown className="arrowDown" />
          <select
            value={convertTo}
            onChange={(e) => setConvertTo(e.target.value)}
          >
            {currencies.map((currencyItem, index) => (
              <option key={index} value={currencyItem}>
                {currencyItem}
              </option>
            ))}
          </select>
          <input
            id="amounTo"
            type="number"
            value={amounTo}
            onChange={(e) => setAmountFrom(e.target.value)}
          />
        </div>
        <button onClick={exChange} className="change">
          Dəyiş
        </button>
      </div>
    </div>
  );
}

export default Currency;
