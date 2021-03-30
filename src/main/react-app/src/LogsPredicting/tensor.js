import * as tf from "@tensorflow/tfjs";
import { OPTIMIZERS } from "./optimizers";

import modeData from './modeldata.json';

export function data(){
    // const getData = await fetch(modeData);
    // const jsonData = await getData.json();
    const values = modeData.map(nat=>({
        time:nat.Time,
        fileLength:nat.Length,
    }))
        .filter(nat => (nat.time != null && nat.fileLength != null));
    return values;
}

function makeTensors(data){
    const getInput = data.map(nat => nat.time);
    const getLable = data.map(nat => nat.fileLength);

    const input = tf.tensor(getInput, [getInput.length, 1]);
    const label = tf.tensor(getLable, [getLable.length, 1]);
    return [input, label];
}

export function generateData() {
    return tf.tidy(() => {
        // console.log(data)
        // Step 1. Shuffle the data
        // tf.util.shuffle(data());
        //

        const getInput = data().map(nat => nat.time);
        const getLable = data().map(nat => nat.fileLength);
        // console.log(getInput)
        // console.log(getLable)
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
