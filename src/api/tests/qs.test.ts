import MockAdapter from "axios-mock-adapter";
import { expect, it } from "vitest";
import { getCsById } from "../qs";
import { api } from "..";

const mock = new MockAdapter(api);

mock.onGet("/qs/1").reply(200, {
    id: 1,
    desc: "",
});

it("should return the qs with id 1", async () => {
    const qs = await getCsById(1);
    expect(qs).toEqual({
        id: 1,
        desc: "",
    });
});
