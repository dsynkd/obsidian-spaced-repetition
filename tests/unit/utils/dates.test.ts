import { formatDate } from "src/utils/dates";

describe("Format date", () => {
    test("Different input overloads", () => {
        expect(formatDate(new Date(2023, 0, 1))).toBe("2023-01-01");
        expect(formatDate(2023, 1, 1)).toBe("2023-01-01");
        // Use a timestamp that represents 2023-01-01 12:00:00 UTC to avoid timezone issues
        // 1672574400000 = 2023-01-01 12:00:00 UTC
        expect(formatDate(1672574400000)).toBe("2023-01-01");
    });

    test("handles a leap year date", () => {
        expect(formatDate(2020, 2, 29)).toBe("2020-02-29");
    });
});
