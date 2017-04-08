
let selectedNode = null;

let drawDetails = (selectedNode) => {
	$('image-container').html(`<img src="${selectedNode.photoURL}"/>`);
	$('info-container--user-name').text(selectedNode.userName);
	$('info-container--birthday').text(selectedNode.birthday);
	$('info-container--city').text(selectedNode.city);
}

let drawChart = (data) => {
	let selectedNode = data.nodes[0];

	let onNodeClick = function (nodeData) {
		selectedNode = nodeData;

		node.classed("selected", (d) => nodeData.id === d.id ? true : false)
		link.classed("red", (d) => nodeData.id === d.source.id || nodeData.id === d.target.id ? true : false);
		drawDetails(nodeData);
	}


	const containerName = "jjs--user-friends-chart";
	let width = $(containerName).width();
	let height = $(containerName).height();

	let svg = d3
		.select(containerName)
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	let force = d3.layout
		.force()
		.gravity(0.05)
		.linkDistance(300)
		.charge(-500)
		.friction(0.5)
		.size([width, height]);

	force
		.nodes(data.nodes)
		.links(data.links)
		.start();

	let link =
		svg
			.selectAll(".link")
			.data(data.links)
			.enter()
			.append("line")
			.attr("class", "link");

	let node =
		svg
			.selectAll(".node")
			.data(data.nodes)
			.enter()
			.append("g")
			.on("click", onNodeClick)
			.attr("class", "node")
			.call(force.drag);

	let imagePattern = node.append("pattern")
		.attr("id", (d) => d.id)
		.attr("height", 1)
		.attr("width", 1)
		.attr("x", "0")
		.attr("y", "0");

	imagePattern.append("image")
		.attr("height", 100)
		.attr("width", 100)
		.attr("xlink:href", (d) => d.photoURL)

	let circles = node.append("circle")
		.attr("r", 50)
		.attr("cy", 0)
		.attr("cx", 0)
		.attr("fill", (d) => `url(#${d.id})`)

	force.on("tick", () => {
		link
			.attr("x1", (d) => d.source.x)
			.attr("y1", (d) => d.source.y)
			.attr("x2", (d) => d.target.x)
			.attr("y2", (d) => d.target.y);
		node
			.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
	});
	onNodeClick(selectedNode);
}

let loc = window.location.href; 
if (loc.indexOf("oauth") === -1) { 
window.location = "//oauth.vk.com/authorize?client_id=5972860&scope=us..,wall,friends&redirect_uri=https://askant123.github.io&response_type=token"; 
}	

$(() => {
	let hash = window.location.hash;
	let temp = hash.split("&"); 
	let token = temp[0].split("=")[1]; 
	let userID = temp[2].split("=")[1];

	$.ajax({
		type: 'POST',
		url: 'http://jjsbot-samosadov.rhcloud.com/api/v1/result',
		data: {
			userID: userID,
			token: token
		},
		success: (d) => {

			let dataJSON = d;
			console.log(d);

			dataJSON = {
				"nodes": [
					{
						"id": 0,
						"userName": "Oleg",
						"birthday": "20.12.1990",
						"city": "Mogilev",
						"photoURL": "https://pp.userapi.com/c626216/v626216501/58ec7/cD-T9mbotkY.jpg"
					},
					{
						"id": 1,
						"birthday": "20.12.1992",
						"city": "Mogilev",
						"userName": "Pasha",
						"photoURL": "https://pp.userapi.com/c630416/v630416230/4cbd2/U8bN6ptiThA.jpg"
					},
					{
						"id": 2,
						"birthday": "20.12.1993",
						"city": "Mogilev",
						"userName": "Kot",
						"photoURL": "https://cs540105.userapi.com/c637629/v637629267/3c676/3lh9xH4LP6I.jpg"
					},
					{
						"id": 3,
						"birthday": "20.12.1990",
						"city": "Mogilev",
						"userName": "Kostya",
						"photoURL": "https://pp.userapi.com/c628731/v628731635/1e6cf/_O80c9IKfeg.jpg"
					}
				],
				"links": [
					{
						"source": 1,
						"target": 0,
					},
					{
						"source": 1,
						"target": 2,
					},
					{
						"source": 1,
						"target": 3,
					},
					{
						"source": 2,
						"target": 3,
					}
				]
			};


			drawChart(dataJSON);

		},
		error: (e) => console.error(e)
	});
});
