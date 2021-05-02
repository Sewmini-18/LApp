import * as tf from "@tensorflow/tfjs";
import { OPTIMIZERS } from "./optimizers";

import modeData from "./modeldata.json";

export function getactual(){
  const values = modeData
      .map((nat) => ({
        fileLength: nat.Length,
      }));
  return values;
}

export function data() {

  const values = modeData
    .map((nat) => ({
      time: nat.Time,
      fileLength: nat.Length,
    }))
    .filter((nat) => nat.time != null && nat.fileLength != null);
  return values;
}

export function generateData() {
  return tf.tidy(() => {

    const getInput = data().map((nat) => nat.time);
    const getLable = data().map((nat) => nat.fileLength);

    const input = tf.tensor(getInput, [getInput.length, 1]);
    const label = tf.tensor(getLable, [getLable.length, 1]);

    return [input, label];
  });
}

export function createModel({
  units = 1,
  learningRate = 0.01,
  optimizer = "adam",
}) {
  const selectOptimizer = (optimizer) => {
    return OPTIMIZERS[optimizer].fn(learningRate);
  };

  const model = tf.sequential();
  model.add(tf.layers.dense({ units, inputShape: [1] }));
  model.compile({
    optimizer: selectOptimizer(optimizer),
    loss: "meanSquaredError",
  });
  return model;
}

export async function trainModel(model, input, label, epochs = 150) {
  await model.fit(input, label, { epochs });
}
