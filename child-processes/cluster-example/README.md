Let's start by making a server and performing a simple benchmark

```
$ node single-server.js                                                                
Process 1814 listening on port 8000
```

Now let's perform the benchmark, using the apache benchmark tool.
Let's load the server with 200 concurrent connections for 10 seconds.
```
$ ab -c200 -t10 http://localhost:8000/
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Finished 834 requests


Server Software:        
Server Hostname:        localhost
Server Port:            8000

Document Path:          /
Document Length:        32 bytes

Concurrency Level:      200
Time taken for tests:   10.811 seconds
Complete requests:      834
Failed requests:        0
Total transferred:      97049 bytes
HTML transferred:       29024 bytes
Requests per second:    77.14 [#/sec] (mean)
Time per request:       2592.585 [ms] (mean)
Time per request:       12.963 [ms] (mean, across all concurrent requests)
Transfer rate:          8.77 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0   41 198.2      2    1068
Processing:    40 2180 655.8   1959    3350
Waiting:       30 1674 565.1   1759    2649
Total:         40 2222 716.1   1960    3835

Percentage of the requests served within a certain time (ms)
  50%   1960
  66%   2280
  75%   2772
  80%   3023
  90%   3073
  95%   3352
  98%   3833
  99%   3834
 100%   3835 (longest request)
```

Now we have a benchmark established--let's scale the application.
Let's run the cluster process:
```
$ node cluster.js                                                                             
Forking for 4
Process 2010 listening on port 8000
Process 2011 listening on port 8000
Process 2013 listening on port 8000
Process 2012 listening on port 8000
Response handled by process 2010
Response handled by process 2010
Response handled by process 2011
Response handled by process 2011
Response handled by process 2012
Response handled by process 2010
Response handled by process 2011
Response handled by process 2013
Response handled by process 2012
Response handled by process 2010
Response handled by process 2011
```

Note how the requests are handled by different processes.

Now let's perform the same benchmark:
```
$ ab -c200 -t10 http://localhost:8000/
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Finished 1637 requests


Server Software:        
Server Hostname:        localhost
Server Port:            8000

Document Path:          /
Document Length:        32 bytes

Concurrency Level:      200
Time taken for tests:   10.006 seconds
Complete requests:      1637
Failed requests:        0
Total transferred:      175159 bytes
HTML transferred:       52384 bytes
Requests per second:    163.60 [#/sec] (mean)
Time per request:       1222.471 [ms] (mean)
Time per request:       6.112 [ms] (mean, across all concurrent requests)
Transfer rate:          17.10 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    3   8.6      0      41
Processing:    55 1142 228.7   1210    1266
Waiting:       14 1141 231.5   1210    1266
Total:         56 1145 220.3   1210    1267

Percentage of the requests served within a certain time (ms)
  50%   1210
  66%   1218
  75%   1223
  80%   1226
  90%   1234
  95%   1241
  98%   1247
  99%   1252
 100%   1267 (longest request)
```

Note the requests per second metric is more than double for the clustered approach

For the final clustered example:
start the server and take note of the Master PID:
```
$ node cluster-manage-crash.js                                                      
Forking for 4
Master PID: 14557
Process 14559 listening on port 8000
Process 14558 listening on port 8000
Process 14560 listening on port 8000
Process 14561 listening on port 8000
```

In another shell start the benchmark:
```
$ ab -c200 -t10 http://localhost:8000/
```

In yet another shell, send the SIGUSR2 signal to the process
```
$ kill -SIGUSR2 14557
``` 

Note that despite sending the signal and restarting all workers,
0 requests failed.
```
Benchmarking localhost (be patient)
Finished 1397 requests


Server Software:
Server Hostname:        localhost
Server Port:            8000

Document Path:          /
Document Length:        34 bytes

Concurrency Level:      200
Time taken for tests:   10.002 seconds
Complete requests:      1397
Failed requests:        0
Total transferred:      152273 bytes
HTML transferred:       47498 bytes
Requests per second:    139.67 [#/sec] (mean)
Time per request:       1431.911 [ms] (mean)
Time per request:       7.160 [ms] (mean, across all concurrent requests)
Transfer rate:          14.87 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    3   8.4      0      32
Processing:    37 1329 305.3   1375    1727
Waiting:       14 1327 309.1   1375    1726
Total:         38 1332 298.0   1376    1727

Percentage of the requests served within a certain time (ms)
  50%   1376
  66%   1396
  75%   1416
  80%   1476
  90%   1590
  95%   1680
  98%   1709
  99%   1714
 100%   1727 (longest request)
 ```