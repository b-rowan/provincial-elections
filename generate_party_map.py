import asyncio

import httpx

PROVINCE = "ON"
YEAR = 2025
URL = f"https://canopy.cbc.ca/live/elections/prov/{PROVINCE}{YEAR}/all/"

async def main():
    async with httpx.AsyncClient() as c:
        data = (await c.get(URL)).json()
    parties = data["data"]["parties"]

    party_map = {}
    for party in parties:
        party_map[party["englishCode"]] = party["englishName"]

    print(party_map)

if __name__ == '__main__':
    asyncio.run(main())