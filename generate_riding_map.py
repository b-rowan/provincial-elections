import asyncio

import httpx

PROVINCE = "ON"
YEAR = 2025
URL = f"https://canopy.cbc.ca/live/elections/prov/{PROVINCE}{YEAR}/all/"

async def main():
    async with httpx.AsyncClient() as c:
        data = (await c.get(URL)).json()
    ridings = data["data"]["ridings"]

    riding_map = {}
    for riding in ridings:
        riding_map[riding["englishName"]] = str(riding["ridingNumber"])

    print(riding_map)

if __name__ == '__main__':
    asyncio.run(main())