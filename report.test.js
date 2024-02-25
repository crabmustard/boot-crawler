const { test, expect } = require('@jest/globals')
const { sortPages } = require('./report.js')


test('sortPages 5 pages', () => {
    const input = {
        "https://wagslane.dev/path5": 5,
        "https://wagslane.dev4": 4,
        "https://wagslane.dev/path1": 1,
        "https://wagslane.dev3": 3,
        "https://wagslane.dev7": 7,
    }
    const actual = sortPages(input)
    const expected = [
        ["https://wagslane.dev7", 7],
        ["https://wagslane.dev/path5", 5],
        ["https://wagslane.dev4", 4],
        ["https://wagslane.dev3", 3],
        ["https://wagslane.dev/path1", 1]
    ]
    expect(actual).toEqual(expected)
})

test('sortPages 2 pages', () => {
    const input = {
        "https://wagslane.dev/path": 1,
        "https://wagslane.dev": 3
    }
    const actual = sortPages(input)
    const expected = [
        ["https://wagslane.dev", 3],
        ["https://wagslane.dev/path", 1]
    ]
    expect(actual).toEqual(expected)
})