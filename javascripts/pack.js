//URL For Cards
//http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=425901&type=card
var preloaded_sets = new Map();
//var preloaded_sets = [];
var valid_set_codes = new Set();
var unsupported_sets = new Set();
unsupported_sets.add("CED");
unsupported_sets.add("CEI");
unsupported_sets.add("pRDC");
unsupported_sets.add("pMEI");
unsupported_sets.add("pLGM");
unsupported_sets.add("RQS");
unsupported_sets.add("pARL");
unsupported_sets.add("pCEL");
unsupported_sets.add("MGB");
unsupported_sets.add("ITP");
unsupported_sets.add("pPOD");
unsupported_sets.add("VAN");
unsupported_sets.add("pPRE");
unsupported_sets.add("pJGP");
unsupported_sets.add("pALP");
unsupported_sets.add("pGRU");
unsupported_sets.add("pWOR");
unsupported_sets.add("pWOS");
unsupported_sets.add("BRB");
unsupported_sets.add("pSUS");
unsupported_sets.add("pFNM");
unsupported_sets.add("pELP");
unsupported_sets.add("S00");
unsupported_sets.add("BTD");
unsupported_sets.add("pMPR");
unsupported_sets.add("DKM");
unsupported_sets.add("pREL");
unsupported_sets.add("p2HG");
unsupported_sets.add("ATH");
unsupported_sets.add("pGTW");
unsupported_sets.add("pCMP");
unsupported_sets.add("CST");
unsupported_sets.add("pHHO");
unsupported_sets.add("pPRO");
unsupported_sets.add("pGPX");
unsupported_sets.add("pMGD");
unsupported_sets.add("EVG");
unsupported_sets.add("pLPA");	
unsupported_sets.add("p15A");
unsupported_sets.add("pSUM");
unsupported_sets.add("DRB");
unsupported_sets.add("pWPN");
unsupported_sets.add("DD2");
unsupported_sets.add("DDC");
unsupported_sets.add("DDD");
unsupported_sets.add("DDE");
unsupported_sets.add("DDF");
unsupported_sets.add("DDG");
unsupported_sets.add("DDH");
unsupported_sets.add("DDI");
unsupported_sets.add("DDJ");
unsupported_sets.add("DDK");
unsupported_sets.add("DDL");
unsupported_sets.add("DDM");
unsupported_sets.add("DDN");
unsupported_sets.add("DDO");
unsupported_sets.add("DDP");
unsupported_sets.add("DDQ");
unsupported_sets.add("HOP");
unsupported_sets.add("V09");
unsupported_sets.add("V10");
unsupported_sets.add("V11");
unsupported_sets.add("V12");
unsupported_sets.add("V13");
unsupported_sets.add("V14");
unsupported_sets.add("V15");
unsupported_sets.add("V16");
unsupported_sets.add("H09");
unsupported_sets.add("DPA");
unsupported_sets.add("ARC");
unsupported_sets.add("PD2");
unsupported_sets.add("PD3");
unsupported_sets.add("MED");
unsupported_sets.add("ME2");
unsupported_sets.add("ME3");
unsupported_sets.add("ME4");
unsupported_sets.add("VMA");
unsupported_sets.add("TPR");
unsupported_sets.add("CMD");
unsupported_sets.add("PC2");
unsupported_sets.add("CM1");
unsupported_sets.add("pWCQ");
unsupported_sets.add("C13");
unsupported_sets.add("C14");
unsupported_sets.add("C15");
unsupported_sets.add("MD1");
unsupported_sets.add("CPK");
unsupported_sets.add("DD3_DVD");
unsupported_sets.add("DD3_EVG");
unsupported_sets.add("DD3_GVL");
unsupported_sets.add("DD3_JVC");
unsupported_sets.add("FRF_UGIN");
unsupported_sets.add("W16");
unsupported_sets.add("DDR");
unsupported_sets.add("DDS");

function loop()
{
	//Loops through all cards in the JSON file for the set Amonkhet and displays their image
	var timeout = 1000;
	var set_name = document.getElementById("SetName").value;
	for(var set in AllSets)
	{
		if(AllSets[set].code == set_name)
		{
			stop_loop = false;
			for(var card in AllSets[set].cards)
			{
				var image_link = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + 
				AllSets[set].cards[card].multiverseid.toString() + "&type=card";
				doSetTimeout(image_link, timeout);
				timeout += 1000;
			}
			break;
		}
	}
}
function preprocess_set_codes()
{
	for(var set in AllSets)
	{
		if(!(unsupported_sets.has(AllSets[set].code.toString())))
		{
			valid_set_codes.add(AllSets[set].code.toString());
		}
	}
}
var urls = [];

function process_pack(set_name)
{
	var PackContents = new Set();
	urls = [];
	for(var set in AllSets)
	{
		if(AllSets[set].code == set_name)
		{
			//console.log(AllSets[set].cards.length);
			//On Windows CON is not a valid folder name so this is a workaround
			if(set_name == "CON")
			{
				set_name == "CON_"
			}
			//Add current set to preloaded sets
			if(!(preloaded_sets.has(set_name)))
			{
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
				new_set.name = set_name;
				new_set.commons = commons;
				console.log("CREATING SET");
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
				if(!PackContents.has(cur_set.commons[index]))
				{
					console.log(cur_set.commons[index].name);
					PackContents.add(cur_set.commons[index]);
					urls.push("images/" + set_name + "/" + cur_set.commons[index].imageName + ".jpg");
				}
			}
			while(PackContents.size < 14)
			{
				index = Math.floor(Math.random() * cur_set.uncommons.length);
				if(!PackContents.has(cur_set.uncommons[index]))
				{
					console.log(cur_set.uncommons[index].name);
					PackContents.add(cur_set.uncommons[index]);
					urls.push("images/" + set_name + "/" + cur_set.uncommons[index].imageName + ".jpg");
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
					console.log(cur_set.mythics[index].name);
					PackContents.add(cur_set.mythics[index]);
					urls.push("images/" + set_name + "/" + cur_set.mythics[index].imageName + ".jpg");
				}
				else
				{
					index = Math.floor(Math.random() * cur_set.rares.length);
					console.log(cur_set.rares[index].name);
					PackContents.add(cur_set.rares[index]);
					urls.push("images/" + set_name + "/" + cur_set.rares[index].imageName + ".jpg");
				}
			}
			break;
		}
	}
	if(!document.getElementsByName("options")[2].checked)
	{
		for(i = 0; i < urls.length; ++i)
		{
			var name = "slot" + (urls.length - i).toString();
			document.getElementById(name).src = urls[i];
		}
	}
}
function process_click(index)
{
	if(document.getElementsByName("options")[2].checked)
	{
		var name = "slot" + (index).toString();
		document.getElementById(name).src = urls[urls.length - index];
	}
}
function open_pack()
{
	//Specify Set Name and check if valid
	var set_name = document.getElementById("SetName").value;
	if(valid_set_codes.has(set_name))
	{
		if(!document.getElementsByName("options")[0].checked)
		{
			for(i = 0; i < 15; ++i)
			{
				var name = "slot" + (15 - i).toString();
				document.getElementById(name).src = "images/MTG Card Back.jpg";
			}
			if(document.getElementsByName("options")[1].checked)
			{
				setTimeout(function(){process_pack(set_name);}, 500);
			}
			else
			{
				process_pack(set_name);
			}
		}
		else
		{
			process_pack(set_name);
		}
	}
	else
	{
		alert("Invalid or unsupported Set Code Detected!");
	}
}
function doSetTimeout(image_link_in, time) {
	if(!stop_loop)
	{
		setTimeout(function(){image_swap(image_link_in);}, time);
	}
}

function image_swap(image_link_in)
{
	document.getElementById("slot16").src = image_link_in;
}