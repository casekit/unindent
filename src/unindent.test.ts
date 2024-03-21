import { describe, test, expect } from "vitest";
import { unindent } from "./unindent";

describe("unindent", () => {
    test("it strips whitespace from the left-hand side of multiline strings", () => {
        expect(unindent`
        CREATE TABLE posts (
            id UUID NOT NULL PRIMARY KEY,
            title TEXT NOT NULL,
            content TEXT NOT NULL
        )
      `).toEqual(`CREATE TABLE posts (
    id UUID NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL
)`);
    });

    test("it strips empty lines from the start and end of the string", () => {
        expect(unindent`

        CREATE TABLE posts (
            id UUID NOT NULL PRIMARY KEY,
            title TEXT NOT NULL,
            content TEXT NOT NULL
        )


      `).toEqual(`CREATE TABLE posts (
    id UUID NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL
)`);
    });

    test("it doesn't break when given an empty string", () => {
        expect(unindent``).toEqual("");
    });

    test("it doesn't break when given a string consisting entirely of whitespace", () => {
        expect(unindent`
         

                         
        `).toEqual("");
    });

    test("it works with tabs", () => {
        expect(unindent`
		  CREATE TABLE posts (
		      id UUID NOT NULL PRIMARY KEY,
		      title TEXT NOT NULL,
		      content TEXT NOT NULL
		  )
		`).toEqual(`CREATE TABLE posts (
    id UUID NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL
)`);
    });

    test("it handles empty lines in the middle of the string", () => {
        expect(unindent`

        CREATE TABLE posts (
            id UUID NOT NULL PRIMARY KEY,

            title TEXT NOT NULL,

            content TEXT NOT NULL
        )


      `).toEqual(`CREATE TABLE posts (
    id UUID NOT NULL PRIMARY KEY,

    title TEXT NOT NULL,

    content TEXT NOT NULL
)`);
    });
});
