#!/usr/bin/env python

import sys
import time
import Rpi.GPIO as io
import subprocess

io.setmode(io.BCM)
SHUTOFF_DELAY = 60
PIR_PIN = 7				# pin 26

def main():
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
			
			# if it's on and signal received, turn on
			if turned_off:
				turned_off = False
				turn_on()
			else:
				# if signal received and it's off and it's been longer than 60 seconds, turn on
				if not turned_off and time.time() > (last_motion_time + SHUTOFF_DELAY):
					turned_off = True
					turn_off()
			
			# delay a bit between each reading
			time.sleep(.1)
			

def turn_on():
	subprocess.call('sh /var/www/html/mirror/mirror/turn_on.sh', shell=True)

def turn_off():
	subprocess.call('sh /var/www/html/mirror/mirror/turn_of.sh', shell=True)
	

if __name__ == '__main__':
	try:
		main()
	except KeyboardInterrupt:
		io.cleanup()
			
			
			