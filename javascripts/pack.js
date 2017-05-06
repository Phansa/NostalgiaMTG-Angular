//URL For Cards
//http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=425901&type=card


function pack()
{
	//Loops through all cards in the JSON file for the set Amonkhet and displays their image
	var timeout = 1000;
	for(var card in AllSets.AKH.cards)
	{
		//console.log(AllSets.AKH.cards[card].name);
		var image_link = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + AllSets.AKH.cards[card].multiverseid.toString() + "&type=card";
		doSetTimeout(image_link, timeout);
		timeout += 1000;
	}
}

function doSetTimeout(image_link_in, time) {
	setTimeout(function(){image_swap(image_link_in);}, time);
}

function image_swap(image_link_in)
{
	document.getElementById("slot1").src = image_link_in;
}