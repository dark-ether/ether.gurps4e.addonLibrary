mtlib:
	git add * 
	touch .gitignore
	git add .gitignore
	git commit
	zip ether.gurps4e.mtlib library events.json library.json

clean: 
	rm ether.gurps4e.mtlib
