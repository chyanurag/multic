const path = require('path')
const { existsSync, writeFile, unlink } = require('fs')
const { exec } = require('child_process')
const langs = ['c++', 'python', 'java', 'rust']
if(process.argv.length < 4){
	console.log(`Usage : node ${path.basename(process.argv[1])} <language> <filename>`)
	return;
}
const language = process.argv[2]
const filename = process.argv[3]
if(langs.indexOf(language) === -1){
	console.log('Valid languages are c++,java,rust,python')
	return;
}
if(!existsSync(path.join(__dirname, filename))){
	console.log('file does not exists')
	return
}
writeFile(path.join(__dirname, 'input'), '', (err) => {
	if(err) {
		console.log(err)
		return
	}
})
const execCpp = (filename) => {
	let outfile = path.parse(path.join(__dirname, filename))['name']
	exec(`g++ ${filename} -o ${outfile} && ./${outfile} < input`, (err, stdout, stderr) => {
		if(stderr){
			console.error(stderr)
		}
		if(err){
			console.error(err)
		}
		console.log(stdout)
	})
}
const execRust = (filename) => {
	let outfile = path.parse(path.join(__dirname, filename))['name']
	exec(`rustc ${filename} && ./${outfile} < input`, (err, stdout, stderr) => {
		if(stderr){
			console.error(stderr)
		}
		if(err){
			console.error(err)
		}
		console.log(stdout)
	})
}
const execPython = (filename) => {
	let outfile = path.parse(path.join(__dirname, filename))['name']
	exec(`python ${filename} < input`, (err, stdout, stderr) => {
		if(stderr){
			console.error(stderr)
		}
		if(err){
			console.error(err)
		}
		console.log(stdout)
	})
}
const execJava = (filename) => {
	let outfile = path.parse(path.join(__dirname, filename))['name']
	exec(`java ${filename} < input`, (err, stdout, stderr) => {
		if(stderr){
			console.error(stderr)
		}
		if(err){
			console.error(err)
		}
		console.log(stdout)
	})
}
const langExecs = [execCpp, execPython, execJava, execRust]
langExecs[langs.indexOf(language)](filename)
