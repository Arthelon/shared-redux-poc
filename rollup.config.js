import typescript from "rollup-plugin-typescript2";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
    input: "src/reducer.ts",
    output: {
        file: "build/bundle.js",
        format: "esm",
    },
    plugins: [
        peerDepsExternal(),
        nodeResolve(),
        commonjs(),
        typescript({
            declarationDir: "./build",
        }),
    ],
};
