data = """
ATH: Athabasca
BAT: Batoche
CAN: Cannington
CNP: Canora-Pelly
CRV: Carrot River Valley
CUB: Cumberland
CUT: Cut Knife-Turtleford
CYP: Cypress Hills
DAR: Dakota-Arm River
EBM: Estevan-Big Muddy
HUW: Humboldt-Watrous
KEW: Kelvington-Wadena
KIB: Kindersley-Biggar
LAT: Last Mountain-Touchwood
LLD: Lloydminster
LUM: Lumsden-Morse
MAB: Martensville-Blairmore
MEA: Meadow Lake
MEL: Melfort
MES: Melville-Saltcoats
MJN: Moose Jaw North
MJW: Moose Jaw Wakamow
MOM: Moosomin-Montmartre
PAC: Prince Albert Carlton
PAN: Prince Albert Northcote
RCP: Regina Coronation Park
RDP: Regina Douglas Park
REC: Regina Elphinstone-Centre
RLK: Regina Lakeview
RMR: Regina Mount Royal
RNE: Regina Northeast
RPQ: Regina Pasqua
RRD: Regina Rochdale
RSA: Regina South Albert
RUN: Regina University
RWA: Regina Walsh Acres
RWP: Regina Wascana Plains
RZD: Rosetown-Delisle
SAR: Saskatchewan Rivers
SCE: Saskatoon Centre
SCM: Saskatoon Chief Mistawasis
SCW: Saskatoon Churchill-Wildwood
SEA: Saskatoon Eastview
SFA: Saskatoon Fairview
SME: Saskatoon Meewasin
SNU: Saskatoon Nutana
SRD: Saskatoon Riversdale
SSI: Saskatoon Silverspring
SSO: Saskatoon Southeast
SST: Saskatoon Stonebridge
SUS: Saskatoon University-Sutherland
SWE: Saskatoon Westview
SWI: Saskatoon Willowgrove
SWT: Swift Current
TBF: The Battlefords
WAR: Warman
WBG: Weyburn-Bengough
WCQ: White City-Qu'Appelle
WOR: Wood River
YRK: Yorkton
RZS: Rosthern-Shellbrook
"""
out = {}

for line in data.split("\n"):
    if line == "":
        continue
    else:
        party_info = line.split(":")
        out[party_info[0].strip()] = {"name": party_info[1].strip(), "parties": {}}
print(out)