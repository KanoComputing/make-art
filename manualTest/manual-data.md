# Manual test QtWebengine with EGLFS

### launchbrowserduration:
```
01 => 10s
02 => 8.33s
03 => 7.37s
04 => 7.52s
05 => 7.43
06 => 7.46
07 => 7.52s
08 => 7.52s
09 => 7.35s
10 => 7.44
11 => 7.33
12 => 7.50
13 => 7.74
14 => 7.42
15 => 7.57
16 => 7.83
17 => 7.61
18 => 7.54
19 => 7.59
20 => 7.50
```

### GoToChallenges

```
01 => 10.89
02 => 6.37
03 => 6.87
04 => 4.98
05 => 5.43
06 => 5.57
07 => 5.61
08 => 5.96
09 => 5.98
10 => 5.50
11 => 5.06
12 => 4.67
13 => 5.96
14 => 4.83
15 => 5.44
16 => 5.98
17 => 5.27
18 => 5.93
19 => 5.33
20 => 4.93
```

### CanvasHasChange

```
01 => 2826370,000 - 2859692,000 = -33322000 nanosecond
02 => 3946032,000 - 4012676,000 = -66644000
03 => 4825127,000- 4891793,000,000 = -66666000
04 => 5522563,000 - 5586129,000 = -63566000
05 => 6378210,000 - 6441530,000 = -63320000
06 => 7152879,000 - 7216201,000 = -63322000
07 => 7918506,000 - 7951828,000 = -33322000
08 => 8683216,000 - 8716539,000 = -33323000
09 => 9458304,000 - 9491627,000 = -33323000
10 => 10189979,000 - 10223302,000 = -33323000
```

# Manual test Chromium

launchbrowserduration:
```
01. 9
02. 8.37
03. 8.55
04. 8.53
05. 8.76
06. 8.62
07. 8.83
08. 8.89
09. 8.52
10. 8.97
11. 8.46
12. 8.71
13. 8.48
14. 8.51
15. 8.47
16. 8.66
17. 8.52
18. 8.88
19. 8.53
20. 8.43
```
### GoToChallenges
```
01 => 
02 => 
03 => 
04 => 
05 => 
06 => 
07 => 
08 => 
09 => 
10 => 
11 => 
12 => 
13 => 
14 => 
15 => 
16 => 
17 => 
18 => 
19 => 
20 => 
```

### CanvasHasChange

```
01 => 
02 => 
03 => 
04 => 
05 => 
06 => 
07 => 
08 => 
09 => 
10 => 
11 => 
12 => 
13 => 
14 => 
15 => 
16 => 
17 => 
18 => 
19 => 
20 => 
```



## Automatic test Chromium webdriver

### browserLaunchDuration: 

```
2 s 134480783 ns
```

### goToPlayGroundDuration

```
2 s 194058218 ns
```
### CanvasHasChange
```
01 => 0, 12210418
02 => 0, 18321561
03 => 0, 16118387
04 => 0, 17875629 
05 => 0, 23729641 
06 => 0, 18472078 
07 => 0, 23620431
08 => 0, 18318663 
09 => 0, 39861510 
10 => 0, 24483753 
11 => 0, 29217604 
12 => 0, 24551396 
13 => 0, 37265257 
14 => 0, 24666785 
15 => 0, 22079989
16 => 0, 52368567 
17 => 0, 26746321 
18 => 0, 33609643 
19 => 0, 39965066 
20 => 0, 32766363
```





# Local host automatic Chromium Benchmark
```pl
endtime browserLaunchDuration => 0 s 839523101 ns
endtime goToPlayGroundDuration => 0 s 901625566 ns

endtime canvasHasChange => 0 s 8740951 ns
endtime canvasHasChange => 0 s 10102999 ns
endtime canvasHasChange => 0 s 12083423 ns
endtime canvasHasChange => 0 s 15343646 ns
endtime canvasHasChange => 0 s 17220913 ns
endtime canvasHasChange => 0 s 17052053 ns
endtime canvasHasChange => 0 s 17219008 ns
endtime canvasHasChange => 0 s 15594107 ns
endtime canvasHasChange => 0 s 22694187 ns
endtime canvasHasChange => 0 s 24236588 ns
endtime canvasHasChange => 0 s 27054740 ns
endtime canvasHasChange => 0 s 22885171 ns
endtime canvasHasChange => 0 s 25629604 ns
endtime canvasHasChange => 0 s 18260233 ns
endtime canvasHasChange => 0 s 19506002 ns
endtime canvasHasChange => 0 s 21422695 ns
endtime canvasHasChange => 0 s 19369417 ns
endtime canvasHasChange => 0 s 22879638 ns
endtime canvasHasChange => 0 s 22658812 ns
endtime canvasHasChange => 0 s 23332849 ns
endtime canvasHasChange => 0 s 23760031 ns

dataCanvasperformance=> [ [ 0, 8740951 ],
  [ 0, 10102999 ],
  [ 0, 12083423 ],
  [ 0, 15343646 ],
  [ 0, 17220913 ],
  [ 0, 17052053 ],
  [ 0, 17219008 ],
  [ 0, 15594107 ],
  [ 0, 22694187 ],
  [ 0, 24236588 ],
  [ 0, 27054740 ],
  [ 0, 22885171 ],
  [ 0, 25629604 ],
  [ 0, 18260233 ],
  [ 0, 19506002 ],
  [ 0, 21422695 ],
  [ 0, 19369417 ],
  [ 0, 22879638 ],
  [ 0, 22658812 ],
  [ 0, 23332849 ],
  [ 0, 23760031 ] ]
  
challengeCommandsArray.length=> 21

sumData => 8740951 mean => 416235.7619047619
```
# KanoKit automatic Chromium Benchmark
```pl

endtime browserLaunchDuration => 14 s 257763625 ns

endtime goToPlayGroundDuration => 14 s 585122066 ns

endtime canvasHasChange => 0 s 58083319 ns
endtime canvasHasChange => 0 s 66103639 ns
endtime canvasHasChange => 0 s 69827970 ns
endtime canvasHasChange => 0 s 99728707 ns
endtime canvasHasChange => 0 s 86853861 ns
endtime canvasHasChange => 0 s 90541629 ns
endtime canvasHasChange => 0 s 98004248 ns
endtime canvasHasChange => 0 s 103025752 ns
endtime canvasHasChange => 0 s 103068720 ns
endtime canvasHasChange => 0 s 162800873 ns
endtime canvasHasChange => 0 s 128705030 ns
endtime canvasHasChange => 0 s 113144068 ns
endtime canvasHasChange => 0 s 137460758 ns
endtime canvasHasChange => 0 s 125057312 ns
endtime canvasHasChange => 0 s 123560039 ns
endtime canvasHasChange => 0 s 135689165 ns
endtime canvasHasChange => 0 s 118932958 ns
endtime canvasHasChange => 0 s 132725815 ns
endtime canvasHasChange => 0 s 126789323 ns
endtime canvasHasChange => 0 s 129480021 ns
endtime canvasHasChange => 0 s 126134070 ns


dataCanvasperformance=> [ [ 0, 58083319 ],
  [ 0, 66103639 ],
  [ 0, 69827970 ],
  [ 0, 99728707 ],
  [ 0, 86853861 ],
  [ 0, 90541629 ],
  [ 0, 98004248 ],
  [ 0, 103025752 ],
  [ 0, 103068720 ],
  [ 0, 162800873 ],
  [ 0, 128705030 ],
  [ 0, 113144068 ],
  [ 0, 137460758 ],
  [ 0, 125057312 ],
  [ 0, 123560039 ],
  [ 0, 135689165 ],
  [ 0, 118932958 ],
  [ 0, 132725815 ],
  [ 0, 126789323 ],
  [ 0, 129480021 ],
  [ 0, 126134070 ] ]

challengeCommandsArray.length=> 21

sumData => 58083319 mean => 2765872.3333333335
```