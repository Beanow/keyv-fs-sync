[![license BlueOak-1.0.0](https://badgen.net/badge/license/BlueOak-1.0.0)](LICENSE.md)

# Keyv FS Sync

A pretty simple filesystem based backend for Keyv.

**Status:** prototype

### Motivation

My use-case was to have a simple, transparent, filesystem based cache for HTTP requests (using `got`).
But as I would be storing binary data, using `keyv-file` would grow out of hand.

This library uses very simple filesystem operations to implement the Map API.
Get = reading a file.
Set = writing a file.
Delete = deleting a file.
etc...

Again for simplicity sake, this uses the node.js synchronous filesystem API.
Should this be a bottleneck for you somehow, you probably need something more elaborate than this library anyway.
Try Redis instead?

### Other work

[keyv-fs](https://github.com/roneyrao/keyv-fs) exists, but seems unmaintained and has a number uneccesary dependencies.
