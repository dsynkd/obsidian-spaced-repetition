import builtins from "builtin-modules";
import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import process from "process";

const prod = process.argv[2] === "production";

function copyFiles() {
    const buildDir = "build";
    if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir, { recursive: true });
    }
    fs.copyFileSync("styles.css", path.join(buildDir, "styles.css"));
    fs.copyFileSync("manifest.json", path.join(buildDir, "manifest.json"));
}

const context = await esbuild.context({
    entryPoints: ["src/main.ts"],
    bundle: true,
    external: ["obsidian", "electron", ...builtins],
    format: "cjs",
    target: "es2018",
    logLevel: "info",
    sourcemap: "inline",
    sourcesContent: !prod,
    treeShaking: true,
    outfile: "build/main.js",
});

if (prod) {
    await context.rebuild().catch(() => process.exit(1));
    copyFiles();
    context.dispose();
} else {
    // Copy files initially for dev mode
    copyFiles();
    context.watch().catch(() => process.exit(1));
}
