let selectedNode = null;

let openUser = (id) => {
	window.open(`https://vk.com/id${id}`);
}

let drawDetails = (selectedNode) => {
	$('image-container').html(`<img src="${selectedNode.photoURL}" onclick="openUser(${selectedNode.link})"/>`);
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
		.linkDistance(450)
		.charge(-2500)
		.friction(.9)
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


$(() => {

	// let hash = window.location.hash;
	// let temp = hash.split("&");
	// let token = temp[0].split("=")[1];
	// let userID = temp[2].split("=")[1];

	// $.ajax({
	// 	type: 'POST',
	// 	url: 'http://jjsbot-samosadov.rhcloud.com/api/v1/result',
	// 	data: {
	// 		userID: "113333501",
	// 		token: "33e213d51ceef6b57a9a23ce971b3caca7000005fad2169664eb7019b4978820e740c99df204e84a3358f"
	// 	},
	// 	success: (d) => {

	// 		let dataJSON = d;
	// 		console.log(d);

	// 		dataJSON = {
	// 			"nodes": [
	// 				{
	// 					"id": 0,
	// 					"userName": "Oleg",
	// 					"birthday": "20.12.1990",
	// 					"city": "Mogilev",
	// 					"photoURL": "https://pp.userapi.com/c626216/v626216501/58ec7/cD-T9mbotkY.jpg"
	// 				},
	// 				{
	// 					"id": 1,
	// 					"birthday": "20.12.1992",
	// 					"city": "Mogilev",
	// 					"userName": "Pasha",
	// 					"photoURL": "https://pp.userapi.com/c630416/v630416230/4cbd2/U8bN6ptiThA.jpg"
	// 				},
	// 				{
	// 					"id": 2,
	// 					"birthday": "20.12.1993",
	// 					"city": "Mogilev",
	// 					"userName": "Kot",
	// 					"photoURL": "https://cs540105.userapi.com/c637628/v637628825/4093b/cdDgiq6i0oU.jpg"
	// 				},
	// 				{
	// 					"id": 3,
	// 					"birthday": "20.12.1990",
	// 					"city": "Mogilev",
	// 					"userName": "Kostya",
	// 					"photoURL": "https://pp.userapi.com/c628731/v628731635/1e6cf/_O80c9IKfeg.jpg"
	// 				},
	// 				{
	// 					"id": 4,
	// 					"birthday": "20.12.1990",
	// 					"city": "Mogilev",
	// 					"userName": "Kostya",
	// 					"photoURL": "https://pp.userapi.com/c639231/v639231412/14b3a/KNZfLEK-7pc.jpg"
	// 				},
	// 				{
	// 					"id": 5,
	// 					"birthday": "20.12.1990",
	// 					"city": "Mogilev",
	// 					"userName": "Kostya",
	// 					"photoURL": "https://pp.userapi.com/c543101/v543101190/2e63d/NwFGt2OMNTw.jpg"
	// 				},
	// 				{
	// 					"id": 6,
	// 					"birthday": "20.12.1990",
	// 					"city": "Mogilev",
	// 					"userName": "Kostya",
	// 					"photoURL": "https://pp.userapi.com/c837132/v837132424/32c61/aCZuNR17Alg.jpg"
	// 				}
	// 			],
	// 			"links": [
	// 				{
	// 					"source": 1,
	// 					"target": 0,
	// 				},
	// 				{
	// 					"source": 1,
	// 					"target": 2,
	// 				},
	// 				{
	// 					"source": 1,
	// 					"target": 3,
	// 				},
	// 				{
	// 					"source": 2,
	// 					"target": 3,
	// 				},
	// 				{
	// 					"source": 2,
	// 					"target": 4,
	// 				},
	// 				{
	// 					"source": 3,
	// 					"target": 5,
	// 				},
	// 				{
	// 					"source": 4,
	// 					"target": 6,
	// 				}
	// 			]
	// 		};

	// 		drawChart(dataJSON);

	// 	},
	// 	error: (e) => console.error(e)
	// });

	dataJSON = {
		"nodes": [
			{
				"id": 0,
				"link": "48416512",
				"userName": "Артём Самосадов",
				"birthday": "5.7.1994",
				"city": "Могилёв",
				"photoURL": "https://pp.userapi.com/c629105/v629105512/a192/0D9R6MB1UAU.jpg"
			},
			{
				"id": 1,
				"link": "332246",
				"birthday": "5.7.1994",
				"city": "Москва",
				"userName": "Эдгар Куликов",
				"photoURL": "https://pp.userapi.com/c631525/v631525246/4b6bf/vI4B9zO_Upc.jpg"
			},
			{
				"id": 2,
				"link": "1880151",
				"birthday": "25.12.1996",
				"city": "Mogilev",
				"userName": "Павел Шакин",
				"photoURL": "https://pp.userapi.com/c638219/v638219151/29034/zUiwh6UqD38.jpg"
			},
			{
				"id": 3,
				"link": "3174835",
				"birthday": "14.1.1988",
				"city": "Могилёв",
				"userName": "Владимир Шевчик",
				"photoURL": "https://pp.userapi.com/c604317/v604317835/16c4e/n5_50Fl2D1Q.jpg"
			},
			{
				"id": 4,
				"link": "3688213",
				"birthday": "20.12.1990",
				"city": "Москва",
				"userName": "Сергей Максимов",
				"photoURL": "https://pp.userapi.com/c620417/v620417213/92f5/kiLKuDSZKQM.jpg"
			},
			{
				"id": 5,
				"link": "5105012",
				"birthday": "20.12.1990",
				"city": "Витебск",
				"userName": "Александр Черепок",
				"photoURL": "https://pp.userapi.com/c837527/v837527012/32305/UNkzKWllfgE.jpg"
			},
			{
				"id": 6,
				"link": "3872178",
				"birthday": "20.12.1990",
				"city": "Москва",
				"userName": "Алексей Чеботарёв",
				"photoURL": "https://pp.userapi.com/c837228/v837228178/c20a/rsgPIxuqoJ4.jpg"
			},
			{
				"id": 7,
				"link": "636962",
				"birthday": "2.5.1991",
				"city": "Санкт-Петербург",
				"userName": "Витя Поздняков",
				"photoURL": "https://pp.userapi.com/c638822/v638822962/280fe/dqBLyS0SE1s.jpg"
			},
			{
				"id": 8,
				"link": "636962",
				"birthday": "17.2.1991",
				"city": "Санкт-Петербург",
				"userName": "Вячеслав Кавленас",
				"photoURL": "https://pp.userapi.com/c638631/v638631863/2f236/B24Y7NDFJCw.jpg"
			}
			,
			{
				"id": 9,
				"link": "372021",
				"birthday": "17.2.1991",
				"city": "Минск",
				"userName": "Владимир Сущевич",
				"photoURL": "https://pp.userapi.com/c615816/v615816663/66f8/YG0TxDuuU-s.jpg"
			}
			,
			{
				"id": 10,
				"link": "278219",
				"birthday": "4.3.1988",
				"city": "Москва",
				"userName": "Марина Торубарова",
				"photoURL": "https://pp.userapi.com/c630721/v630721219/2647/wyD2LFixiIU.jpg"
			}
			,
			{
				"id": 11,
				"link": "216539",
				"birthday": "4.3.1988",
				"city": "Минск",
				"userName": "Олег Шакиров",
				"photoURL": "https://pp.userapi.com/c630423/v630423539/518ad/DiAcEC2hwlc.jpg"
			}
			,
			{
				"id": 12,
				"link": "154075",
				"birthday": "3.7.1988",
				"city": "Минск",
				"userName": "Женя Романовский",
				"photoURL": "https://pp.userapi.com/c605226/v605226075/940f/8rOJF9A2U1U.jpg"
			}
			,
			{
				"id": 13,
				"link": "120385",
				"birthday": "8.1.1988",
				"city": "Минск",
				"userName": "Олег Альхимович",
				"photoURL": "https://pp.userapi.com/c633318/v633318385/4502e/JbnXczlu44g.jpg"
			},
			{
				"id": 14,
				"link": "84735",
				"birthday": "8.1.1988",
				"city": "Минск",
				"userName": "Алеся Денисюк",
				"photoURL": "https://pp.userapi.com/c604330/v604330735/38684/Dygkx-4y5Og.jpg"
			},
			{
				"id": 15,
				"link": "51438",
				"birthday": "5.1.1986",
				"city": "Минск",
				"userName": "Юра Филиппов",
				"photoURL": "https://pp.userapi.com/c836438/v836438438/d09b/QiS4yFloF3o.jpg"
			},
			{
				"id": 16,
				"link": "6564",
				"birthday": "16.2.1985",
				"city": "Минск",
				"userName": "Сергей Мисенко",
				"photoURL": "https://pp.userapi.com/c309431/v309431564/c0a9/ZePrI8D5nWo.jpg"
			},
			{
				"id": 17,
				"link": "503",
				"birthday": "16.2.1985",
				"city": "Санкт-Петербург",
				"userName": "Александр Амбалов",
				"photoURL": "https://pp.userapi.com/c836237/v836237503/2fea/0Va2_dqImig.jpg"
			},
			{
				"id": 18,
				"link": "503",
				"birthday": "16.2.1985",
				"city": "Москва",
				"userName": "Дарья Байкова",
				"photoURL": "https://pp.userapi.com/c638318/v638318203/17f1f/WepuVMP7-3g.jpg"
			},
			{
				"id": 19,
				"link": "1495848",
				"birthday": "16.2.1985",
				"city": "Москва",
				"userName": "Паша Зуенков",
				"photoURL": "https://pp.userapi.com/c406818/u1495848/d_247ae051.jpg"
			},
			{
				"id": 20,
				"link": "1467180",
				"birthday": "16.2.1985",
				"city": "Москва",
				"userName": "Настя Пахомова",
				"photoURL": "https://pp.userapi.com/c619417/v619417180/adb7/K4NjHvjJ7EY.jpg"
			}
		],
		"links": [
			{
				"source": 0,
				"target": 1,
			},
			{
				"source": 0,
				"target": 2,
			},
			{
				"source": 0,
				"target": 3,
			},
			{
				"source": 0,
				"target": 4,
			},
			{
				"source": 3,
				"target": 2,
			},
			{
				"source": 4,
				"target": 3,
			},
			{
				"source": 2,
				"target": 4,
			},
			{
				"source": 0,
				"target": 1,
			},
			{
				"source": 0,
				"target": 2,
			},
			{
				"source": 0,
				"target": 3,
			},
			{
				"source": 0,
				"target": 5,
			},
			{
				"source": 0,
				"target": 6,
			},
			{
				"source": 0,
				"target": 7,
			},
			{
				"source": 0,
				"target": 8,
			},
			{
				"source": 0,
				"target": 9,
			},
			{
				"source": 0,
				"target": 10,
			},
			{
				"source": 0,
				"target": 11,
			},
			{
				"source": 0,
				"target": 12,
			},
			{
				"source": 0,
				"target": 13,
			},
			{
				"source": 0,
				"target": 14,
			},
			{
				"source": 0,
				"target": 15,
			},
			{
				"source": 0,
				"target": 16,
			},
			{
				"source": 0,
				"target": 17,
			},
			{
				"source": 3,
				"target": 18,
			},
			{
				"source": 5,
				"target": 19,
			},
			{
				"source": 7,
				"target": 20,
			},
			{
				"source": 9,
				"target": 13,
			},
			{
				"source": 12,
				"target": 6,
			},
			{
				"source": 10,
				"target": 18,
			},
			{
				"source": 3,
				"target": 16,
			},
			{
				"source": 1,
				"target": 15,
			},
			{
				"source": 8,
				"target": 14,
			},
			{
				"source": 7,
				"target": 20,
			},
			{
				"source": 15,
				"target": 18,
			
				},
			{
				"source": 7,
				"target": 18,
			},
			{
				"source": 5,
				"target": 16,
			},
			{
				"source": 7,
				"target": 11,
			},
			{
				"source": 18,
				"target": 15,
			},
			{
				"source": 5,
				"target": 6,
			},
			{
				"source": 9,
				"target": 11,
			},
			{
				"source": 2,
				"target": 5,
			},
			{
				"source": 5,
				"target": 11,
			},
			{
				"source": 9,
				"target": 8,
			},
			{
				"source": 5,
				"target": 20,
			},
			{
				"source": 2,
				"target": 14,
			},
			{
				"source": 9,
				"target": 10,
			},
			{
				"source": 19,
				"target": 5,
			},
			{
				"source": 8,
				"target": 14,
			},
			{
				"source": 7,
				"target": 11,
			},
			{
				"source": 1,
				"target": 11,
			},
			{
				"source": 3,
				"target": 12,
			},
			{
				"source": 4,
				"target": 19,
			},
			{
				"source": 1,
				"target": 13,
			}
		]
	}


	drawChart(dataJSON);

});
