const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')


test('normalizeURL strip protocol', () => {
    const input = "https://blog.boot.dev/path"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test('normalizeURL trailing slash', () => {
    const input = "https://blog.boot.dev/path/"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = "https://BLOG.bOot.dev/path/"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = "https://blog.boot.dev/path/"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML single', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path/">
            Boot.dev Blog
        </a>
    </body>
</html>    
`
    const inputBaseUrl = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML multiple', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/">
            Boot.dev Blog
        </a>
        <a href="http://www.crabmustard.codes/"
        </a>
        <a href="/path/">
        Boot.dev Blog
        </a>
    </body>
</html>    
`
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ["https://blog.boot.dev/", "http://www.crabmustard.codes/", "https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">
            Boot.dev Blog
        </a>
    </body>
</html>    
`
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})
test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="invalid">
            Boot.dev Blog
        </a>
    </body>
</html>    
`
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = []
    expect(actual).toEqual(expected)
})