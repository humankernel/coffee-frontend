import { mostFrequent, removeEmptyValues } from "./utils";
import { describe, expect, it } from "vitest";

describe("mostFrecuent", () => {
    it("should return the most common str in the array", () => {
        const items = ["a", "b", "a"];
        const expected = "a";

        expect(mostFrequent(items)).toBe(expected);
    });

    it("should return the most common int in the array", () => {
        const items = [1, 2, 1, 4, 2, 1, 3];
        const expected = 1;

        expect(mostFrequent(items)).toBe(expected);
    });

    it("should return undefined when array is empty", () => {
        const items: number[] = [];
        const expected = undefined;

        expect(mostFrequent(items)).toBe(expected);
    });
});

describe("removeEmptyValues", () => {
    it("should remove b from obj", () => {
        const obj = { a: "hi", b: "", c: "bye" };
        const expected = { a: "hi", c: "bye" };

        expect(removeEmptyValues(obj)).toEqual(expected);
    });

    it("should not remove anything", () => {
        const obj = { a: "hi", b: "Hello", c: "bye" };
        const expected = { a: "hi", b: "Hello", c: "bye" };

        expect(removeEmptyValues(obj)).toEqual(expected);
    });
});
