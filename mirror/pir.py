#!/usr/bin/env python

import sys
import time
import RPi.GPIO as io
import subprocess

io.setmode(io.BCM)
SHUTOFF_DELAY = 60
PIR_PIN = 25

def main():
	io.setup(PIR_PIN, io.IN, pull_up_down=io.PUD_UP)
	turned_off = False
	last_button_press = time.time()
	
	while True:
		# signal received
		if not io.input(PIR_PIN):
			# upate time of last button press
			last_button_press = time.time()
			
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
				
			# after turning monitor on or off, wait 5 seconds before reading again
			time.sleep(5)	
		
		# signal is off		
		else:
			# shut off after 30 mins
			if turned_off == False and time.time() > (last_button_press + 1800):
				turned_off = True
				turn_off()
		
		# delay a bit between each reading
		time.sleep(.2)
		

def turn_on():
	subprocess.call('sh /var/www/html/mirror/mirror/turn_on.sh', shell=True)

def turn_off():
	subprocess.call('sh /var/www/html/mirror/mirror/turn_off.sh', shell=True)
	

if __name__ == '__main__':
	try:
		main()
	except KeyboardInterrupt:
		io.cleanup()
			
			
			