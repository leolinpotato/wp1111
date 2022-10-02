var leave = document.getElementsByClassName("leave")
var side_bar = document.getElementsByClassName("side_bar")
var main_bar = document.getElementsByClassName("main_bar")[0]
var without_main = false
var num = 6
var block_template = document.getElementsByClassName("block")[1].innerHTML

// init
for (let i = 0; i < leave.length; i++) {
	leave[i].addEventListener("click", function() {leave_call(this.parentElement.parentElement)})
}
for (let i = 0; i < side_bar.length; i++) {
	side_bar[i].addEventListener("click", function() {pin(this.parentElement.parentElement)})
}
document.getElementsByClassName("add")[0].addEventListener("click", function() {add_participant()})
current_time()

num = prompt("How many participants? [1-15]", 6)
if (num > 6) {
	for (let i = 7; i <= num; i++) {
		let name = "user" + String(i)
		create_block(name, "screenshot/shang-chi.png", false)
	}
}
else if (num < 6) {
	let parentNode = document.getElementById("side")
	let blocks = parentNode.getElementsByClassName("block")
	for (let i = 6; i > num; i--)
		parentNode.removeChild(blocks[i - 2])
}
main_bar.addEventListener("click", function() {unpin()})
update()

// leave call
function leave_call(node) {
	num--
	if (node.classList.contains("main")) {
		var first_side_block = document.getElementById("side").getElementsByClassName("block")[num - 1]
		node.getElementsByClassName("main_name")[0].innerText = first_side_block.getElementsByClassName("side_name")[0].innerText
		node.getElementsByClassName("main_icon")[0].src = first_side_block.getElementsByClassName("side_icon")[0].src
		if (first_side_block.getElementsByClassName("block_inside")[0].classList.contains("me"))
			node.getElementsByClassName("block")[0].classList.add("me")
		first_side_block.remove()
		unpin()
	}
	else {
		var block = node
		block.remove()
	}
	update()
}

// add participant
function add_participant() {
	var newName = prompt("What's your name?", "")
	var newImg = prompt("What's your icon?", "")
	if (num == 1) {
		document.getElementById("side").style.display = "flex"
		document.getElementsByClassName("main")[0].classList.remove("full_screen")
	}
	create_block(newName, newImg, false)
	num++
	update()
}

// switch
function switch_block(node) {
	var main_struct = document.getElementsByClassName("main")[0].getElementsByClassName("block")[0]

	var side_icon = node.getElementsByClassName("side_icon")[0].src
	node.getElementsByClassName("side_icon")[0].src = main_struct.getElementsByClassName("main_icon")[0].src
	main_struct.getElementsByClassName("main_icon")[0].src = side_icon

	var side_name = node.getElementsByClassName("side_name")[0].innerText
	node.getElementsByClassName("side_name")[0].innerText = main_struct.getElementsByClassName("main_name")[0].innerText
	main_struct.getElementsByClassName("main_name")[0].innerText = side_name
	if (node.classList.contains("me")) {
		node.classList.remove("me")
		main_struct.classList.add("me")
	}
	else if (main_struct.classList.contains("me")) {
		main_struct.classList.remove("me")
		node.classList.add("me")
	}
}

// replace main
function pin(node) {
	if (document.getElementsByClassName("main")[0].classList.contains("hidden") || num == 1) {  // nothing being pinned
		document.getElementsByClassName("main")[0].classList.remove("hidden")
		document.getElementById("side").classList.remove("full_screen")
		var blocks = document.getElementById("side").getElementsByClassName("block");
		update()
		switch_block(node)
		node.parentElement.remove()
	}
	else {
		switch_block(node)
	}
}

// create side block
function create_block(name, img, me) {
	var newNode = document.createElement("div")
	newNode.innerHTML = block_template
	newNode.className = "block layout"
	newNode.getElementsByClassName("side_name")[0].innerText = name
	newNode.getElementsByClassName("side_icon")[0].src = img
	document.getElementById("side").appendChild(newNode)
	newNode.getElementsByClassName("leave")[0].addEventListener("click", function() {leave_call(this.parentElement.parentElement)})
	newNode.getElementsByClassName("side_bar")[0].addEventListener("click", function() {pin(this.parentElement.parentElement)})
	if (me) 
		newNode.getElementsByClassName("block_inside")[0].classList.add("me")
}

// unpin
function unpin() {
	document.getElementsByClassName("main")[0].classList.add("hidden")
	document.getElementById("side").classList.add("full_screen")
	var name = document.getElementsByClassName("main_name")[0].innerText
	var img = document.getElementsByClassName("main_icon")[0].src
	create_block(name, img, document.getElementsByClassName("main")[0].getElementsByClassName("block")[0].classList.contains("me"))
	update()
}

// set width height
function setWH(blocks, w, h) {
	for (let i = 0; i < blocks.length; i++) {
		blocks[i].style.width = w
		blocks[i].style.height = h
	}
}

// current time
function current_time() {
	now = new Date()
	h = now.getHours()
	m = now.getMinutes()
	if (h < 12)
		document.getElementById("time").innerText = h + ":" + m + " AM"
	else if (h == 12)
		document.getElementById("time").innerText = h + ":" + m + " PM"
	else
		document.getElementById("time").innerText = (h - 12) + ":" + m + " PM"
	setTimeout('current_time()', 1000)
}

// update screen
function update() {
	document.getElementsByClassName("num")[0].innerText = String(num)
	if (num == 1) {
		if (document.getElementById("side").classList.contains("full_screen"))
			pin(document.getElementById("side").getElementsByClassName("block_inside")[0])
		document.getElementById("side").style.display = "none"
		document.getElementsByClassName("main")[0].classList.add("full_screen")
	}
	else {
		let blocks = document.getElementById("side").getElementsByClassName("block")
		if (document.getElementById("side").classList.contains("full_screen")) {
			for (let i = 0; i < num; i++)
				blocks[i].style.padding = "0.5%"
			if (num == 2) 
				setWH(blocks, "50%", "60%")
			else if (num == 3) 
				setWH(blocks, "33%", "60%")
			else if (num == 4)
				setWH(blocks, "50%", "50%")
			else if (num == 5) {
				let offset1 = Array.from(blocks).slice(0, 3)
				let offset2 = Array.from(blocks).slice(3, 5)
				setWH(offset1, "33%", "50%")
				setWH(offset2, "40%", "50%")
			}
			else if (num == 6)
				setWH(blocks, "33%", "50%")
			else if (num == 7) {
				let offset1 = Array.from(blocks).slice(0, 4)
				let offset2 = Array.from(blocks).slice(4, 7)
				setWH(offset1, "25%", "50%")
				setWH(offset2, "30%	", "50%")
			}
			else if (num == 8)
				setWH(blocks, "25%", "50%")
			else if (num == 9) 
				setWH(blocks, "33%", "33%")
			else if (num == 10) {
				let offset1 = Array.from(blocks).slice(0, 4)
				let offset2 = Array.from(blocks).slice(4, 10)
				setWH(offset1, "25%", "33%")
				setWH(offset2, "30%", "33%")
			}
			else if (num == 11 || num == 12) 
				setWH(blocks, "25%", "33%")
			else if (num == 13) {
				let offset1 = Array.from(blocks).slice(0, 5)
				let offset2 = Array.from(blocks).slice(5, 13)
				setWH(offset1, "20%", "33%")
				setWH(offset2, "23%", "33%")
			}
			else 
				setWH(blocks, "20%", "33%")
		}
		else {
			for (let i = 0; i < num - 1; i++)
				blocks[i].style.padding = "1%"
			if (num == 2 || num == 3)
				setWH(blocks, "100%", "50%")
			else if (num == 4)
				setWH(blocks, "100%", "33%")
			else if (num <= 9)
				setWH(blocks, "50%", "25%")
			else if (num == 10 || num == 11)
				setWH(blocks, "50%", "20%")
			else if (num == 12 || num == 13)
				setWH(blocks, "50%", "16%")
			else if (num >= 14)
				setWH(blocks, "50%", "14%")
		}
	}
}