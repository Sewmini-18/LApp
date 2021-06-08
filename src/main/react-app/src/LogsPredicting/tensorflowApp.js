import React, { useEffect, useReducer, useState } from "react";
import {createModel, generateData, trainModel,} from "./tensor";
import { OPTIMIZERS } from "./optimizers";
import * as tf from "@tensorflow/tfjs-core";
import "./tensstyle.css";
import { Button } from "react-bootstrap";
import BackImage from "../components/pages/images/114.jpg";


const initialModelOptions = {
  optimizer: "adam",
  learningRate: 0.01,
  epochs: 100,
};


function modelReducer(state, action) {
  switch (action.type) {
    case "SET_OPTIMIZER":
      return { ...state, optimizer: action.value };
    case "SET_LEARNINGRATE":
      return { ...state, learningRate: parseFloat(action.value) };
    case "SET_EPOCHS":
      return { ...state, epochs: parseInt(action.value) };
    default:
      return state;
  }
}

function TensorflowApp() {

  const [input, label] = generateData();
  const [modelOptions, dispatch] = useReducer(
    modelReducer,
    initialModelOptions
  );

  const [modelReady, setModelReady] = useState(true);
  const [target, setTarget] = useState(0);
  const [prediction, setPrediction] = useState("");
  const [model, setModel] = useState(createModel(modelOptions));

  const handleChangeTarget = (e) => {
    const datavalue = setTarget(Number(e.target.value));
  };

  const handleChangeModelOptions = (action) => (e) => {
    dispatch({ type: action, value: e.target.value });
  };

  const handleTrain = () => {
    setModelReady(false);
    trainModel(model, input, label, modelOptions.epochs).then(() =>
      setModelReady(true)
    );
  };

  useEffect(() => {
    setTarget(0);
    setPrediction("0");
    setModel(createModel(modelOptions));
  }, [modelOptions]);

  const setModal = () => {
    model
      .predict(tf.tensor([target]))
      .data()
      .then((data) => setPrediction(parseFloat(data).toFixed(2).toString()));
  };

  // wii affect after render the function, re render after every update.
  useEffect(() => {
    document.title = "Log Prediction";
    document.body.style.backgroundImage = `url(${ BackImage })`;
    document.body.style.backgroundRepeat = `no-repeat`;
    document.body.style.backgroundSize = "100%";
    document.body.style.opacity ="80%";
    setModal();
  }, [target]);

  const mTop = {
    marginTop: "30px",
    display: "flex",
  };

  return (
    <div className="container" style={{ width: "50rem" }}>
      <section className="sectionx" style={mTop}>
        <h2 style={{ color: "#36005a" }}> -- -- -- - Model-- -- -- - </h2>
        <label htmlFor="optiFn"> Optimizer function </label>
        <select
          className="selectx"
          id="optiFn"
          style={{ paddingLeft: "20px" }}
          value={modelOptions.optimizer}
          onChange={handleChangeModelOptions("SET_OPTIMIZER")}
        >
          {" "}
          {Object.keys(OPTIMIZERS).map((key) => (
            <option key={key} value={OPTIMIZERS[key].libelle}>
              {" "}
              {OPTIMIZERS[key].libelle}
            </option>
          ))}
        </select>

        <label htmlFor="learningRate">
          {" "}
          <br /> Learning rate{" "}
        </label>
        <input
          className="inputx"
          id="learningRate"
          value={modelOptions.learningRate}
          onChange={handleChangeModelOptions("SET_LEARNINGRATE")}
          disabled={!modelReady}
          type="number"
        />
        <br />
      </section>

      <section className="sectionx" style={mTop}>
        <h2 style={{ color: "#36005a" }}> -- -- - Training-- -- - </h2>
        <label htmlFor="epochs"> Epochs </label>
        <input
          className="inputx"
          id="epochs"
          value={modelOptions.epochs}
          onChange={handleChangeModelOptions("SET_EPOCHS")}
          disabled={!modelReady}
          type="number"
        />
        <br />
        <div>
          {" "}
          {`${modelReady ? "Model is ready" : "Model is training..."}`}
        </div>
        <br />
        <Button
          variant="success"
          className="btnx"
          onClick={handleTrain}
          disabled={!modelReady}
        >
          Train model <br />
        </Button>{" "}
        <br />
      </section>

      <section className="sectionx" style={mTop}>
        <h2 style={{ color: "#36005a" }}> -- -- - Predict-- -- - </h2>
        <label htmlFor="target"> Input time of log file</label>
        <input
          className="inputx"
          id="target"
          value={target}
          onChange={handleChangeTarget}
          disabled={!modelReady}
          type="number"
        />
        <br />
      </section>

      <section className="sectionx" style={{ marginTop: "30px", marginBottom: "80px" }}>
        <h2 style={{ color: "#36005a" }}> -- -- - Results-- -- - </h2>
        <br />
        <p>
          {" "}
          Predicted length of request: <strong> {prediction} </strong>{" "}
        </p>
      </section>
    </div>
  );
}
export default TensorflowApp;
