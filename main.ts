import { promises as fsPromises } from 'fs';
import * as Generator from 'yeoman-generator'; 
import { join } from 'path';



async function asyncReadFile(filename: string) {
	try {
		const contents = await fsPromises.readFile(
			join(__dirname, filename),
			'utf-8',
		);

		const arr = contents
			.split(/[__\n]+/);

		console.log(arr);

		arr.forEach((line) => {
			console.log(line);
		});

		return arr;
	} catch(err) {
		console.log(err);
		return 'Something went wrong';
	}
}

class BasicGenerator extends Generator {
	writing() {
		this.fs.copyTpl(
			this.templatePath('heatmap_template.md'),
			this.destinationPath('test.md'),
			{ Name: 'Wow' }
		);
	}
}
//async function generateGraph(config: string[]) {
	// wrap whole thing in ``` dataview --- ```
	// Name		--> dv.span("NAME")
	// Colors	--> calendarData: colors: COLORS
	// Datename	--> for loop: calendarData: date: DATENAME && content (for hover preview)
	// Location	--> for loop: calendarData: inensity: LOCATION
//	try {
		
//	}
//}


asyncReadFile('./test.md');
