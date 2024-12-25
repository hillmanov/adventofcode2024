import { $ } from "bun";

await $`zig build-exe native.zig \
    -target wasm32-freestanding \
    -fno-entry \
    --export=predictNextSecretNumber \
    --export=encodeSequence \
    -O ReleaseFast`;

await $`rm ./native.wasm.o`;



