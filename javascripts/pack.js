//URL For Cards
//http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=425901&type=card
var preloaded_sets = new Map();
//var preloaded_sets = [];
var valid_set_codes = new Set();
function loop()
{
	//Loops through all cards in the JSON file for the set Amonkhet and displays their image
	var timeout = 1000;
	for(var card in AllSets.AKH.cards)
	{
		//console.log(AllSets.AKH.cards[card].name);
		var image_link = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + 
		AllSets.AKH.cards[card].multiverseid.toString() + "&type=card";
		doSetTimeout(image_link, timeout);
		timeout += 1000;
	}
}
function preprocess_set_codes()
{
	for(var set in AllSets)
	{
		//console.log(AllSets[set].code);
		valid_set_codes.add(AllSets[set].code.toString());
	}
}
function process_pack(set_name)
{
	var PackContents = new Set();
	var urls = [];
	for(var set in AllSets)
	{
		if(AllSets[set].code == set_name)
		{
			console.log(AllSets[set].cards.length);

			//Add current to preloaded sets
			if(!(preloaded_sets.has(set_name)))
			{
				//preloaded_set_names.add(set_name);
				//preloaded_sets.push(set_name);
				var new_set = new Object();
				var commons = [];
				var uncommons = [];
				var rares = [];
				var mythic_rares = [];
				for(var card_index in AllSets[set].cards)
				{
					card = AllSets[set].cards[card_index];
					if(card.rarity == "Common")
					{
						commons.push(card);
					}
					else if(card.rarity == "Uncommon")
					{
						uncommons.push(card)
					}
					else if(card.rarity == "Rare")
					{
						rares.push(card);
					}
					else if(card.rarity == "Mythic Rare")
					{
						mythic_rares.push(card);
					}
				}
				new_set.name = "AKH";
				new_set.commons = commons;
				console.log("CREATING");
				new_set.uncommons = uncommons;
				new_set.rares = rares;
				new_set.mythics = mythic_rares;
				preloaded_sets.set(set_name, new_set);
			}
			var cur_set = preloaded_sets.get(set_name);
			//console.log(cur_set);
			//Adding the commons to the pack
			while(PackContents.size < 11)
			{
				index = Math.floor(Math.random() * cur_set.commons.length);
				console.log("COMMONS " + index.toString());
				if(!PackContents.has(cur_set.commons[index]))
				{
					PackContents.add(cur_set.commons[index]);
					urls.push("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + 
						cur_set.commons[index].multiverseid.toString() + "&type=card");
				}
			}
			while(PackContents.size < 14)
			{
				index = Math.floor(Math.random() * cur_set.uncommons.length);
				console.log("UNCOMMONS " + index.toString());
				if(!PackContents.has(cur_set.uncommons[index]))
				{
					PackContents.add(cur_set.uncommons[index]);
					urls.push("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + 
						cur_set.uncommons[index].multiverseid.toString() + "&type=card");
				}
			}
			//1 in 8 chance of getting a mythic
			var mythic_upgrade = Math.floor(Math.random() * 8);
			while(PackContents.size < 15)
			{
				//index = Math.floor(Math.random() * AllSets[set].cards.length);
				if(mythic_upgrade == 7)
				{	
					index = Math.floor(Math.random() * cur_set.mythics.length);
					console.log("MYTHIC RARES " + index.toString());
					PackContents.add(cur_set.mythics[index]);
					urls.push("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + 
					cur_set.mythics[index].multiverseid.toString() + "&type=card");
				}
				else
				{
					console.log("RARES " + index.toString());
					index = Math.floor(Math.random() * cur_set.rares.length);
					PackContents.add(cur_set.rares[index]);
					urls.push("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + 
					cur_set.rares[index].multiverseid.toString() + "&type=card");
				}
			}
			break;
		}
	}
	for(i = 0; i < urls.length; ++i)
	{
		var name = "slot" + (urls.length - i).toString();
		document.getElementById(name).src = urls[i];
	}
}
function open_pack()
{
	//Specify Set Name and check if valid
	var set_name = document.getElementById("SetName").value;
	console.log(set_name);
	if(valid_set_codes.has(set_name))
	{
		if(document.getElementsByName("options")[1].checked)
		{
			for(i = 0; i < 15; ++i)
			{
				var name = "slot" + (15 - i).toString();
				document.getElementById(name).src = "images/MTG Card Back.jpg";
			}
			setTimeout(function(){process_pack(set_name);}, 500);
		}
		else
		{
			process_pack(set_name);
		}
	}
	else
	{
		alert("Invalid Set Code Detected!");
	}
}
function doSetTimeout(image_link_in, time) {
	setTimeout(function(){image_swap(image_link_in);}, time);
}

function image_swap(image_link_in)
{
	document.getElementById("slot16").src = image_link_in;
}