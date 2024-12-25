const std = @import("std");

export fn predictNextSecretNumber(input: u32) u32 {
    const MASK: u32 = 0xFFFFFF; // 16777215 in decimal
    var result = input;
    result = ((result << 6) ^ result) & MASK;
    result = ((result >> 5) ^ result) & MASK;
    result = ((result << 11) ^ result) & MASK;
    return result;
}

export fn encodeSequence(a: u32, b: u32, c: u32, d: u32) u32 {
    const PRIME: u32 = 31;
    var hash: u32 = 0;

    hash = hash * PRIME + (a + 1000);
    hash = hash * PRIME + (b + 1000);
    hash = hash * PRIME + (c + 1000);
    hash = hash * PRIME + (d + 1000);

    return hash;
}
