mtlib: clean
	bash ./runwebpack.sh
	zip -r ether.gurps4e.mtlib library/ events.json library.json README.md license.html

clean: 
	rm -f ether.gurps4e.mtlib
	rm -rf ./library/public/javascript/
