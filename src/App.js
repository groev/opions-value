import React, { useState, useEffect } from "react";
import bs from "black-scholes";
import { Chart } from "react-charts";

import Form from "./components/Form";

function App() {
  const [result, setResult] = useState(0);
  const [values, setValues] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const array = [];
    let i;

    for (i = values[2] * 365; i > 0; i--) {
      let dataNew = values;
      dataNew[2] = i / 365;
      array.push([
        values[2] - i,
        bs.blackScholes(
          dataNew[0],
          dataNew[1],
          dataNew[2],
          dataNew[3],
          dataNew[4],
          dataNew[5]
        )
      ]);
    }
    console.log(array);
    setData([array]);
  }, [values]);
  function calculate(e = null, values) {
    if (e) {
      e.preventDefault();
    }
    const strikedate = values.strikeDate;
    const date1 = new Date();
    const date2 = new Date(strikedate);

    const Difference_In_Time = date2.getTime() - date1.getTime();
    const Diff_In_Years = Difference_In_Time / (1000 * 3600 * 24) / 365;
    const data = [
      values.currentPrice,
      values.strikePrice,
      Diff_In_Years,

      values.volatility / 100,
      0.015,
      values.type
    ];

    setValues(data);
    const bsResult = bs.blackScholes(
      data[0],
      data[1],
      data[2],
      data[3],
      data[4],
      data[5]
    );
    console.log(values);
    if (bsResult) {
      setResult(bsResult);
    }
    return bsResult;
  }
  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: "linear",
        position: "bottom"
      },
      { hardMin: 0, type: "linear", position: "left" }
    ],
    []
  );
  return (
    <div className="App">
      <h1>Options value with Black Scholes</h1>
      <div class="container">
        <div className="chart">
          <Chart data={data} axes={axes} />
        </div>
        <div>
          <div className="currentValue">{parseFloat(result).toFixed(2)}$</div>

          <Form calculate={calculate} />
        </div>
      </div>
    </div>
  );
}
export default App;
