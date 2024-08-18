import {
    blue,
    cyan,
    green,
    indigo,
    orange,
    purple,
    red,
    pink,
    lime,
    amber,
} from "@mui/material/colors";

const randomColors = [
    red[300],
    blue[300],
    cyan[300],
    lime[300],
    green[300],
    orange[300],
    purple[300],
    pink[300],
    indigo[300],
    amber[300],
];

export const createColors = () => {
    let index = 0;

    return () => {
        try {
            return randomColors[index++];
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            index = 0;
            return randomColors[index++];
        }
    };
};
