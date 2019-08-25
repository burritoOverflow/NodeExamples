For the script to demonstrate how to purge old files, first run the create file script
```
$ node create-old-files.js
```
Note the creation dates of files 
```
$ ls -la files
total 80
drwxr-xr-x  12 robertschumann  staff  384 Aug 25 16:50 .
drwxr-xr-x  15 robertschumann  staff  480 Aug 25 16:50 ..
-rw-r--r--   1 robertschumann  staff    1 Aug 25 16:50 file0
-rw-r--r--   1 robertschumann  staff    1 Aug 24 16:50 file1
-rw-r--r--   1 robertschumann  staff    1 Aug 23 16:50 file2
-rw-r--r--   1 robertschumann  staff    1 Aug 22 16:50 file3
-rw-r--r--   1 robertschumann  staff    1 Aug 21 16:50 file4
-rw-r--r--   1 robertschumann  staff    1 Aug 20 16:50 file5
-rw-r--r--   1 robertschumann  staff    1 Aug 19 16:50 file6
-rw-r--r--   1 robertschumann  staff    1 Aug 18 16:50 file7
-rw-r--r--   1 robertschumann  staff    1 Aug 17 16:50 file8
-rw-r--r--   1 robertschumann  staff    1 Aug 16 16:50 file9
```
```
run the script to purge old files:
```
$ node delete-old-files.js
deleted /Users/robertschumann/Desktop/MiscExamples/NodeExamples/filesystem/files/file9
deleted /Users/robertschumann/Desktop/MiscExamples/NodeExamples/filesystem/files/file7
deleted /Users/robertschumann/Desktop/MiscExamples/NodeExamples/filesystem/files/file8
```
