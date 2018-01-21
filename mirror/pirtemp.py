#!/usr/bin/env python

import sys
import time
import RPi.GPIO as io
import subprocess

io.setmode(io.BCM)
SHUTOFF_DELAY = 60
PIR_PIN = 7				# pin 26

io.setup(PIR_PIN, io.IN)
turned_off = False
last_motion_time = time.time()

while True:
	# signal received
	if io.input(PIR_PIN):
		# update last motion time
		last_motion_time = time.time()
		
		# write buffer to terminal
		sys.stdout.flush()
		
		# if it's off and signal received, turn on
		if turned_off:
			turned_off = False
			print "Turn on"
		else:
			# if signal received and it's on and it's been longer than 60 seconds, turn on
			if not turned_off and time.time() > (last_motion_time + SHUTOFF_DELAY):
				turned_off = True
				print "turn off"
		
		# delay a bit between each reading
		time.sleep(.1)
			
	
			