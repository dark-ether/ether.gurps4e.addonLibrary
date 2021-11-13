mtlib: clean
	zip -r ether.gurps4e.mtlib library/ events.json library.json
	git add * 
	touch .gitignore
	git add .gitignore
	git commit

clean: 
	rm ether.gurps4e.mtlib
