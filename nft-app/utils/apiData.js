// GET
export const get = (url) => {
	return fetch(url)
		.then(r => r.json())
		.catch(err => console.error(err));
}

//NFTINIT API
export const getTrendingCollections = async () => {
	const data = await get(`https://api.nftinit.io/api/getTrendingCollections/?format=json&period=60`);
	return [...data];
}
export const getSlugDetailCollection = async (slug) => {
	const data = await get(`https://api.nftinit.io/api/assetsv3/?count=1&page=1&slug=${slug}&order_by=ranking&trait_count=true&trait_normalization=true&`);
	return [data.collection_details]
}
//Dapper API
export const getProfileCollection = async (address) => {
    const data = await get(`https://dappradar.com/apiv3/nft/items/${address}?version=2&offset=0&limit=24&sortBy=mainPrice&order=desc&protocol=ethereum&fiat=usd`);
    return [...data.data.nft_items];
}

export const getProfileStats = async () => {
	const data = await get(`https://dappradar.com/apiv3/wallet/holdings/0x732ff1a8698f407c8c2e7da6b8fb6005c71c3405?protocol=ethereum&fiat=USD`);
	return [data.data];
}
export const getProfileTokens= async () => {
	const data2 = await get(`https://dappradar.com/apiv3/wallet/overview/0x732ff1a8698f407c8c2e7da6b8fb6005c71c3405?protocol=ethereum&limit=4&fiat=USD`);
	return [data2.data.dominantToken];
}
export const getProfileTokensDetail= async () => {
	const data2 = await get(`https://dappradar.com/apiv3/wallet/overview/0x732ff1a8698f407c8c2e7da6b8fb6005c71c3405?protocol=ethereum&limit=4&fiat=USD`);
	return [...data2.data.tokens];
}


//rarity tools api
export const getNftCalendar = async () => {
	const data = await get(`https://collections.rarity.tools/upcoming2`);
	const timeElapsed = Date.now();
	const today = new Date(timeElapsed);
	const newdata = data.filter(item => Date.parse(item["Sale Date"]) > Date.parse(today))
	var temp=[ ]
	const newdata2= newdata.filter((item)=>
	{
		if(!temp.includes(item.Project)){
			temp.push(item.Project)
			return true;
		}
	})
	
	return [...newdata2];
}

