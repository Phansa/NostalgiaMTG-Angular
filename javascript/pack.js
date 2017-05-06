function pack()
{
	//Loops through all cards in the JSON file for the set Amonkhet and prints their name
	for(var card in AllSets.AKH.cards)
	{
		console.log(AllSets.AKH.cards[card].name)
	}
}