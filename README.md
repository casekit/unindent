# @casekit/unindent

A tiny utility to make writing tests that assert against multiline strings a bit easier.

When used as a tagged template literal, it trims any empty lines from the start and end of a multiline string, then, for the remaining lines, finds the shortest indentation and then unindents the whole string by that amount. This explanation perhaps makes it sound more complex than it is - an example of usage will hopefully help make it clear that its behaviour is pretty intuitive:

```typescript
import { unindent } from "@casekit/unindent";

describe("createSql", () => {
    test("with unindent", () => {
        expect(createSql(postsModel)).toEqual(unindent`
            CREATE TABLE posts (
                id UUID NOT NULL PRIMARY KEY,
                title TEXT NOT NULL,
                content TEXT NOT NULL
            );
        `);
    });

    test("without unindent", () => {
        expect(createSql(postsModel)).toEqual(`CREATE TABLE posts (
    id UUID NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL
);`);
    });
});
```
