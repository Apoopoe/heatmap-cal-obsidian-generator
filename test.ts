import { promises as fsPromises } from 'fs';
import { join } from 'path';


interface HabitConfig {
	name: string
	type: any
	color: string[]
	date: string
	location: string
}

async function asyncReadFile(filename: string) {
	let arr = [];
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
		return arr;
	}
}

function generateConfig() {
	let configs : string[][] = [];
	let currentConfig : string[] = [];
	let flag = false;
	const config = asyncReadFile('config.txt')
		.then((arr) => {
			arr.forEach(element => {
				// Checks we are at start of config. Flag incause 'name' is in other lines.
				if (element.substring(0,4).includes('Name') && flag === false) {
					flag = true;
				}
				currentConfig.push(element);

				// Checks we are at end of config. Flag in case 'name' is in other lines.
				if (element.substring(0,4).includes('Location') && flag === true) {
					flag = false;
					configs.push(currentConfig);
					currentConfig = [];
				}
				
			});
		})
		.catch((err) => {
			console.log(err);
		});
	
	return config;
}


function assingConfig(arr: string[]) {
	const config: HabitConfig = {
		name: arr[1],
		type: arr[3],
		color: arr[5].split(','),
		date: arr[7],
		location: arr[9],
	};

	return config;
}


function parse(input) {
	let configs: string[] = [];
	let [map, instructions] = input.split('\n\n');
	map = map.split('\n').map(line => line.

