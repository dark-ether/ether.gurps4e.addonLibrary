mtlib: clean
	bash ./runwebpack.sh
	zip -r ether.gurps4e.mtlib library/ events.json library.json README.md license.html mts_properties.json

clean: 
	rm -f ether.gurps4e.mtlib
