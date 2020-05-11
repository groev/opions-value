import React, { useState, useEffect } from "react";

export default function Form(props) {
  const [values, setValues] = useState({
    currentPrice: 100,
    strikeDate: "2020-06-19",
    strikePrice: 90,
    type: "call",
    volatility: 50
  });
  useEffect(() => {
    calculate(null, values);
  }, [values]);

  function updateValue(e) {
    const target = e.target;
    setValues(prevState => {
      prevState[target.name] = target.value;
      return prevState;
    });
    calculate(e, values);
  }
  const setCall = e => {
    console.log("clicked");
    let newArr = { ...values };
    newArr.type = "call";
    setValues(newArr);
    return;
  };
  const setPut = e => {
    console.log("clicked");
    let newArr = { ...values };
    newArr.type = "put";
    setValues(newArr);
    return;
  };
  const { calculate } = props;
  return (
    <form id="calcForm" onSubmit={e => calculate(e, values)}>
      <label>
        Current Price:{" "}
        <input
          onChange={e => updateValue(e)}
          value={values.currentPrice}
          type="number"
          name="currentPrice"
        />
      </label>
      <label>
        Strike Price
        <input
          onChange={e => updateValue(e)}
          value={values.strikePrice}
          type="number"
          name="strikePrice"
        />
      </label>
      <label>
        Volatility
        <input
          onChange={e => updateValue(e)}
          value={values.volatility}
          type="number"
          name="volatility"
        />
      </label>
      <label>
        Expire Date
        <input
          onChange={e => updateValue(e)}
          value={values.strikeDate}
          type="date"
          name="strikeDate"
        />
      </label>
      <label>
        Call:{" "}
        <input
          onChange={e => setCall(e)}
          type="radio"
          name="oType"
          value="call"
          checked={values.type === "call" ? true : false}
        />
        Put:{" "}
        <input
          onChange={e => setPut(e)}
          type="radio"
          name="oType"
          value="put"
          checked={values.type === "put" ? true : false}
        />
      </label>
    </form>
  );
}
