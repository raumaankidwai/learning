// LEARNING: Learning and Education Application for Remembering Nuances In a Non-specific Grouping

const fs = require("fs");

const data = fs.readFileSync(process.argv[2] + ".txt").toString().split("\n").map((e) => e.split("|"));

const question = data.shift()[0];

const inputs = data.map((e) => e[0]);
const answers = data.map((e) => e[1]);

const readline = require("readline");

const io = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: true
});

var i;

var im;
var correct = true;

var tr = 0;
var tw = 0;

function clear () {
	process.stdout.write("\033c");
}

function update () {
	i = Math.floor(Math.random() * inputs.length);
}

function end () {
	console.log("STATISTICS");
	console.log("-----");
	console.log(tr + " right answers");
	console.log(tw + " wrong answers");
	console.log((tr + tw) + " total");
	console.log((Math.round(1000 * tr / (tr + tw)) / 10) + "% success rate");
	
	return process.exit(0);
}

function prompt () {
	clear();
	
	if (!inputs.length) {
		console.log("Congratulations, you've finished all " + data.length + " questions!");
		console.log("-----");
		end();
	}
	
	correct && update();
	
	io.question((tr + tw + 1) + ". " + question.replace(/%%INPUT%%/g, inputs[i]) + "\n> ", function (line) {
		if (line.toLowerCase() == "exit") {
			clear();
			
			return end();
		}
		
		if (im = line.toLowerCase() == answers[i].toLowerCase()) {
			inputs.splice(i, 1);
			answers.splice(i, 1);
			
			console.log("Correct! Good job!");
		} else {
			console.log("Sorry! The correct answer was: \"" + answers[i] + "\"");
		}
		
		if (correct) {
			tr += im;
			tw += !im;
		}
		
		correct = im;
		
		setTimeout(() => {
			prompt();
		}, 1000);
	});
}

update()
prompt();
