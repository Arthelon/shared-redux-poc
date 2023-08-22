import typescript from "rollup-plugin-typescript2";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
    input: "src/reducer.ts",
    output: {
        file: "build/bundle.js",
        format: "esm",
    },
    plugins: [
        nodeResolve(),
        typescript({
            declarationDir: "./build",
        }),
    ],
};