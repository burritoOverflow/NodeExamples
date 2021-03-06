Examples from 'Node.js 8 the Right Way', chapter 3

To demonstrate the net-watcher examples, we'll need three terminals: one for the service, one for the client, 
and one to trigger changes to the file.

In one terminal use watch to touch the target file at one-second intervals:
```
$ watch -n 1 touch ../filesystem/target.txt
```

In a second terminal, run the watcher service:
```
$ node net-watcher.js ../filesystem/target.txt
Listening for subscribers.
Subscriber connected.

```

In a third terminal, use netcat to connect to the service
```
$ nc localhost 60300
Now watching ../filesystem/target.txt for changes.File changed Thu Aug 15 2019 18:58:11 GMT-0400 (Eastern Daylight Time)
File changed Thu Aug 15 2019 18:58:12 GMT-0400 (Eastern Daylight Time)
File changed Thu Aug 15 2019 18:58:13 GMT-0400 (Eastern Daylight Time)
File changed Thu Aug 15 2019 18:58:14 GMT-0400 (Eastern Daylight Time)
File changed Thu Aug 15 2019 18:58:15 GMT-0400 (Eastern Daylight Time)
```

For the example chat server (net-module-example.js):
To connect a client:
```
$ nc localhost 8000                                                  [21:54:03]
Hello Client!
Your id is: 0
hello
0: hello
```

Now with another shell:
```
$ nc localhost 8000
Hello Client!
Your id is: 1
Hello
1: Hello
```

Note on the first shell:
```
$ nc localhost 8000                                                  [21:54:03]
Hello Client!
Your id is: 0
hello
0: hello
1: Hello
```
