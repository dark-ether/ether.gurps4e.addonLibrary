mtlib: clean
	bash ./runwebpack.sh
	zip -r ether.gurps4e.mtlib library/ events.json library.json

clean: 
	rm ether.gurps4e.mtlib
