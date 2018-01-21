#!/usr/bin/env python

import sys
import time
import RPi.GPIO as io
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
			# upate time of last motion
			last_motion_time = time.time()
			
			# write buffer to terminal
			sys.stdout.flush()
			
			# if it's off, turn on
			if turned_off:
				turned_off = False
				turn_on()
				
			else:
				# if it's on, turn off
				turned_off = True
				turn_off()

			# after turning monitor on or off, wait 7 seconds before reading again (output lasts 5)
			time.sleep(7)	
		
		# signal is off		
		else:
			# shut off after 30 mins
			if turned_off == False and time.time() > (last_motion_time + 1800):
				turned_off = True
				turn_off()
		
		# delay a bit between each reading
		time.sleep(.1)
		

def turn_on():
	subprocess.call('sh /var/www/html/mirror/mirror/turn_on.sh', shell=True)

def turn_off():
	subprocess.call('sh /var/www/html/mirror/mirror/turn_off.sh', shell=True)
	

if __name__ == '__main__':
	try:
		main()
	except KeyboardInterrupt:
		io.cleanup()
			
			
			