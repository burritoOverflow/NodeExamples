### Regarding caching (see lines 20-24)--from NodeJS in Action (2nd), page 167:

EJS supports optional, in -memory caching of template functions:
after parsing your template file once, EJS will store the function
that’s created by the parsing.Rendering a cached template will be
faster because the parsing step can be skipped.
If you’re doing initial development of a Node web application,
and you want to see any changes you make to your template files
reflected immediately, don’t enable cach - ing.But if you’re
deploying an application to production, enabling caching is a quick,
easy win. Caching is conditionally enabled via the NODE_ENV environment variable.
