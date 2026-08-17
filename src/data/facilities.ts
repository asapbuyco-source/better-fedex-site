export interface Facility {
  code: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  hub?: boolean;
}

export const FACILITIES: Facility[] = [
  // Alabama
  { code: 'BHM', city: 'Birmingham', state: 'AL', lat: 33.5186, lng: -86.8104 },
  { code: 'HSV', city: 'Huntsville', state: 'AL', lat: 34.7304, lng: -86.5861 },
  { code: 'MOB', city: 'Mobile', state: 'AL', lat: 30.6954, lng: -88.0399 },
  { code: 'MGM', city: 'Montgomery', state: 'AL', lat: 32.3792, lng: -86.3077 },
  { code: 'VGD', city: 'Valley Grande', state: 'AL', lat: 32.5091, lng: -87.0256 },
  // Alaska
  { code: 'ANC', city: 'Anchorage', state: 'AK', lat: 61.2181, lng: -149.9003 },
  { code: 'FAI', city: 'Fairbanks', state: 'AK', lat: 64.8378, lng: -147.7164 },
  { code: 'JNU', city: 'Juneau', state: 'AK', lat: 58.3019, lng: -134.4197 },
  // Arizona
  { code: 'PHX', city: 'Phoenix', state: 'AZ', lat: 33.4484, lng: -112.074 },
  { code: 'TUS', city: 'Tucson', state: 'AZ', lat: 32.2226, lng: -110.9747 },
  // Arkansas
  { code: 'LIT', city: 'Little Rock', state: 'AR', lat: 34.7465, lng: -92.2896 },
  { code: 'XNA', city: 'Fayetteville', state: 'AR', lat: 36.0822, lng: -94.1719 },
  // California
  { code: 'LAX', city: 'Los Angeles', state: 'CA', lat: 34.0522, lng: -118.2437, hub: true },
  { code: 'SFO', city: 'San Francisco', state: 'CA', lat: 37.7749, lng: -122.4194 },
  { code: 'SAN', city: 'San Diego', state: 'CA', lat: 32.7157, lng: -117.1611 },
  { code: 'OAK', city: 'Oakland', state: 'CA', lat: 37.8044, lng: -122.2712, hub: true },
  { code: 'SMF', city: 'Sacramento', state: 'CA', lat: 38.5816, lng: -121.4944 },
  { code: 'FAT', city: 'Fresno', state: 'CA', lat: 36.7378, lng: -119.7871 },
  { code: 'SJC', city: 'San Jose', state: 'CA', lat: 37.3382, lng: -121.8863 },
  // Colorado
  { code: 'DEN', city: 'Denver', state: 'CO', lat: 39.7392, lng: -104.9903 },
  { code: 'COS', city: 'Colorado Springs', state: 'CO', lat: 38.8339, lng: -104.8214 },
  // Connecticut
  { code: 'BDL', city: 'Hartford', state: 'CT', lat: 41.7658, lng: -72.6734 },
  { code: 'BDR', city: 'Bridgeport', state: 'CT', lat: 41.1865, lng: -73.1952 },
  // Delaware
  { code: 'ILG', city: 'Wilmington', state: 'DE', lat: 39.7459, lng: -75.5466 },
  // District of Columbia
  { code: 'DCA', city: 'Washington', state: 'DC', lat: 38.9072, lng: -77.0369 },
  // Florida
  { code: 'MIA', city: 'Miami', state: 'FL', lat: 25.7617, lng: -80.1918 },
  { code: 'MCO', city: 'Orlando', state: 'FL', lat: 28.5383, lng: -81.3792 },
  { code: 'TPA', city: 'Tampa', state: 'FL', lat: 27.9506, lng: -82.4572 },
  { code: 'JAX', city: 'Jacksonville', state: 'FL', lat: 30.3322, lng: -81.6557 },
  { code: 'FLL', city: 'Fort Lauderdale', state: 'FL', lat: 26.1224, lng: -80.1373 },
  { code: 'TLH', city: 'Tallahassee', state: 'FL', lat: 30.4383, lng: -84.2807 },
  // Georgia
  { code: 'ATL', city: 'Atlanta', state: 'GA', lat: 33.749, lng: -84.388, hub: true },
  { code: 'SAV', city: 'Savannah', state: 'GA', lat: 32.0809, lng: -81.0912 },
  // Hawaii
  { code: 'HNL', city: 'Honolulu', state: 'HI', lat: 21.3069, lng: -157.8583 },
  // Idaho
  { code: 'BOI', city: 'Boise', state: 'ID', lat: 43.615, lng: -116.2023 },
  // Illinois
  { code: 'ORD', city: 'Chicago', state: 'IL', lat: 41.8781, lng: -87.6298, hub: true },
  { code: 'SPI', city: 'Springfield', state: 'IL', lat: 39.7817, lng: -89.6501 },
  { code: 'PIA', city: 'Peoria', state: 'IL', lat: 40.6936, lng: -89.589 },
  // Indiana
  { code: 'IND', city: 'Indianapolis', state: 'IN', lat: 39.7684, lng: -86.1581, hub: true },
  { code: 'FWA', city: 'Fort Wayne', state: 'IN', lat: 41.0793, lng: -85.1394 },
  { code: 'EVV', city: 'Evansville', state: 'IN', lat: 37.9716, lng: -87.5711 },
  { code: 'SBN', city: 'South Bend', state: 'IN', lat: 41.6764, lng: -86.252 },
  // Iowa
  { code: 'DSM', city: 'Des Moines', state: 'IA', lat: 41.5868, lng: -93.625 },
  { code: 'CID', city: 'Cedar Rapids', state: 'IA', lat: 41.9779, lng: -91.6656 },
  // Kansas
  { code: 'ICT', city: 'Wichita', state: 'KS', lat: 37.6872, lng: -97.3301 },
  { code: 'TOP', city: 'Topeka', state: 'KS', lat: 39.0558, lng: -95.689 },
  // Kentucky
  { code: 'SDF', city: 'Louisville', state: 'KY', lat: 38.2527, lng: -85.7585 },
  { code: 'LEX', city: 'Lexington', state: 'KY', lat: 38.0406, lng: -84.5037 },
  // Louisiana
  { code: 'MSY', city: 'New Orleans', state: 'LA', lat: 29.9511, lng: -90.0715 },
  { code: 'BTR', city: 'Baton Rouge', state: 'LA', lat: 30.4515, lng: -91.1871 },
  { code: 'SHV', city: 'Shreveport', state: 'LA', lat: 32.5252, lng: -93.7502 },
  // Maine
  { code: 'PWM', city: 'Portland', state: 'ME', lat: 43.6591, lng: -70.2568 },
  { code: 'BGR', city: 'Bangor', state: 'ME', lat: 44.8016, lng: -68.7712 },
  // Maryland
  { code: 'BWI', city: 'Baltimore', state: 'MD', lat: 39.2904, lng: -76.6122 },
  // Massachusetts
  { code: 'BOS', city: 'Boston', state: 'MA', lat: 42.3601, lng: -71.0589 },
  { code: 'ORH', city: 'Worcester', state: 'MA', lat: 42.2626, lng: -71.8023 },
  // Michigan
  { code: 'DTW', city: 'Detroit', state: 'MI', lat: 42.3314, lng: -83.0458 },
  { code: 'GRR', city: 'Grand Rapids', state: 'MI', lat: 42.9634, lng: -85.6681 },
  { code: 'LAN', city: 'Lansing', state: 'MI', lat: 42.7325, lng: -84.5555 },
  // Minnesota
  { code: 'MSP', city: 'Minneapolis', state: 'MN', lat: 44.9778, lng: -93.265 },
  { code: 'RST', city: 'Rochester', state: 'MN', lat: 44.0234, lng: -92.4624 },
  { code: 'DLH', city: 'Duluth', state: 'MN', lat: 46.7867, lng: -92.1005 },
  // Mississippi
  { code: 'JAN', city: 'Jackson', state: 'MS', lat: 32.2988, lng: -90.1848 },
  { code: 'GPT', city: 'Gulfport', state: 'MS', lat: 30.3674, lng: -89.0928 },
  // Missouri
  { code: 'STL', city: 'St. Louis', state: 'MO', lat: 38.627, lng: -90.1994 },
  { code: 'KC', city: 'Kansas City', state: 'MO', lat: 39.0997, lng: -94.5786 },
  { code: 'SGF', city: 'Springfield', state: 'MO', lat: 37.2089, lng: -93.2923 },
  // Montana
  { code: 'BIL', city: 'Billings', state: 'MT', lat: 45.7833, lng: -108.5007 },
  { code: 'MSO', city: 'Missoula', state: 'MT', lat: 46.8721, lng: -113.994 },
  // Nebraska
  { code: 'OMA', city: 'Omaha', state: 'NE', lat: 41.2565, lng: -95.9345 },
  { code: 'LNK', city: 'Lincoln', state: 'NE', lat: 40.8136, lng: -96.7026 },
  // Nevada
  { code: 'LAS', city: 'Las Vegas', state: 'NV', lat: 36.1699, lng: -115.1398 },
  { code: 'RNO', city: 'Reno', state: 'NV', lat: 39.5296, lng: -119.8138 },
  // New Hampshire
  { code: 'MHT', city: 'Manchester', state: 'NH', lat: 42.9956, lng: -71.4548 },
  // New Jersey
  { code: 'EWR', city: 'Newark', state: 'NJ', lat: 40.7357, lng: -74.1724, hub: true },
  { code: 'ACY', city: 'Atlantic City', state: 'NJ', lat: 39.3643, lng: -74.4229 },
  // New Mexico
  { code: 'ABQ', city: 'Albuquerque', state: 'NM', lat: 35.0844, lng: -106.6504 },
  { code: 'SAF', city: 'Santa Fe', state: 'NM', lat: 35.687, lng: -105.9378 },
  // New York
  { code: 'NYC', city: 'New York', state: 'NY', lat: 40.7128, lng: -74.006 },
  { code: 'BUF', city: 'Buffalo', state: 'NY', lat: 42.8864, lng: -78.8784 },
  { code: 'ROC', city: 'Rochester', state: 'NY', lat: 43.1566, lng: -77.6088 },
  { code: 'SYR', city: 'Syracuse', state: 'NY', lat: 43.0481, lng: -76.1474 },
  { code: 'ALB', city: 'Albany', state: 'NY', lat: 42.6526, lng: -73.7562 },
  // North Carolina
  { code: 'CLT', city: 'Charlotte', state: 'NC', lat: 35.2271, lng: -80.8431 },
  { code: 'RDU', city: 'Raleigh', state: 'NC', lat: 35.7796, lng: -78.6382 },
  { code: 'GSO', city: 'Greensboro', state: 'NC', lat: 36.0726, lng: -79.792 },
  { code: 'AVL', city: 'Asheville', state: 'NC', lat: 35.5951, lng: -82.5515 },
  { code: 'ILM', city: 'Wilmington', state: 'NC', lat: 34.2257, lng: -77.9447 },
  // North Dakota
  { code: 'FAR', city: 'Fargo', state: 'ND', lat: 46.8772, lng: -96.7898 },
  { code: 'BIS', city: 'Bismarck', state: 'ND', lat: 46.8083, lng: -100.7837 },
  // Ohio
  { code: 'CLE', city: 'Cleveland', state: 'OH', lat: 41.4993, lng: -81.6944 },
  { code: 'CMH', city: 'Columbus', state: 'OH', lat: 39.9612, lng: -82.9988 },
  { code: 'CVG', city: 'Cincinnati', state: 'OH', lat: 39.1031, lng: -84.512 },
  { code: 'DAY', city: 'Dayton', state: 'OH', lat: 39.7589, lng: -84.1916 },
  // Oklahoma
  { code: 'OKC', city: 'Oklahoma City', state: 'OK', lat: 35.4676, lng: -97.5164 },
  { code: 'TUL', city: 'Tulsa', state: 'OK', lat: 36.154, lng: -95.9928 },
  // Oregon
  { code: 'PDX', city: 'Portland', state: 'OR', lat: 45.5152, lng: -122.6784 },
  { code: 'EUG', city: 'Eugene', state: 'OR', lat: 44.0521, lng: -123.0868 },
  // Pennsylvania
  { code: 'PHL', city: 'Philadelphia', state: 'PA', lat: 39.9526, lng: -75.1652 },
  { code: 'PIT', city: 'Pittsburgh', state: 'PA', lat: 40.4406, lng: -79.9959 },
  { code: 'MDT', city: 'Harrisburg', state: 'PA', lat: 40.2732, lng: -76.8867 },
  // Rhode Island
  { code: 'PVD', city: 'Providence', state: 'RI', lat: 41.824, lng: -71.4128 },
  // South Carolina
  { code: 'CHS', city: 'Charleston', state: 'SC', lat: 32.7765, lng: -79.9311 },
  { code: 'CAE', city: 'Columbia', state: 'SC', lat: 34.0007, lng: -81.0348 },
  { code: 'GSP', city: 'Greenville', state: 'SC', lat: 34.8526, lng: -82.394 },
  // South Dakota
  { code: 'FSD', city: 'Sioux Falls', state: 'SD', lat: 43.5446, lng: -96.7311 },
  { code: 'RAP', city: 'Rapid City', state: 'SD', lat: 44.0805, lng: -103.231 },
  // Tennessee
  { code: 'MEM', city: 'Memphis', state: 'TN', lat: 35.1495, lng: -90.049, hub: true },
  { code: 'BNA', city: 'Nashville', state: 'TN', lat: 36.1627, lng: -86.7816 },
  { code: 'TYS', city: 'Knoxville', state: 'TN', lat: 35.9606, lng: -83.9207 },
  { code: 'CHA', city: 'Chattanooga', state: 'TN', lat: 35.0456, lng: -85.3097 },
  // Texas
  { code: 'DFW', city: 'Dallas', state: 'TX', lat: 32.7767, lng: -96.797, hub: true },
  { code: 'HOU', city: 'Houston', state: 'TX', lat: 29.7604, lng: -95.3698 },
  { code: 'AUS', city: 'Austin', state: 'TX', lat: 30.2672, lng: -97.7431 },
  { code: 'SAT', city: 'San Antonio', state: 'TX', lat: 29.4241, lng: -98.4936 },
  { code: 'ELP', city: 'El Paso', state: 'TX', lat: 31.7619, lng: -106.485 },
  { code: 'MAF', city: 'Midland', state: 'TX', lat: 31.9425, lng: -102.2019 },
  { code: 'LBB', city: 'Lubbock', state: 'TX', lat: 33.5779, lng: -101.8552 },
  { code: 'AMA', city: 'Amarillo', state: 'TX', lat: 35.222, lng: -101.8313 },
  // Utah
  { code: 'SLC', city: 'Salt Lake City', state: 'UT', lat: 40.7608, lng: -111.891 },
  // Vermont
  { code: 'BTV', city: 'Burlington', state: 'VT', lat: 44.4759, lng: -73.2121 },
  // Virginia
  { code: 'RIC', city: 'Richmond', state: 'VA', lat: 37.5407, lng: -77.436 },
  { code: 'ORF', city: 'Norfolk', state: 'VA', lat: 36.8508, lng: -76.2859 },
  // Washington
  { code: 'SEA', city: 'Seattle', state: 'WA', lat: 47.6062, lng: -122.3321 },
  { code: 'GEG', city: 'Spokane', state: 'WA', lat: 47.6588, lng: -117.426 },
  // West Virginia
  { code: 'CRW', city: 'Charleston', state: 'WV', lat: 38.3498, lng: -81.6326 },
  // Wisconsin
  { code: 'MKE', city: 'Milwaukee', state: 'WI', lat: 43.0389, lng: -87.9065 },
  { code: 'MSN', city: 'Madison', state: 'WI', lat: 43.0731, lng: -89.4012 },
  { code: 'GRB', city: 'Green Bay', state: 'WI', lat: 44.5133, lng: -88.0133 },
  // Wyoming
  { code: 'CPR', city: 'Casper', state: 'WY', lat: 42.8666, lng: -106.3131 },
  { code: 'JAC', city: 'Jackson', state: 'WY', lat: 43.4799, lng: -110.7624 },
  { code: 'CYS', city: 'Cheyenne', state: 'WY', lat: 41.14, lng: -104.8202 },
  { code: 'LAR', city: 'Laramie', state: 'WY', lat: 41.3114, lng: -105.5911 },

  // --- More small cities ---
  { code: 'SME', city: 'Selma', state: 'AL', lat: 32.4074, lng: -87.0211 },
  { code: 'PTV', city: 'Prattville', state: 'AL', lat: 32.464, lng: -86.4597 },
  { code: 'TCL', city: 'Tuscaloosa', state: 'AL', lat: 33.2098, lng: -87.5692 },
  { code: 'DHN', city: 'Dothan', state: 'AL', lat: 31.2232, lng: -85.3905 },
  { code: 'AUO', city: 'Auburn', state: 'AL', lat: 32.6099, lng: -85.4808 },
  { code: 'GAD', city: 'Gadsden', state: 'AL', lat: 34.0143, lng: -86.0066 },
  { code: 'DCU', city: 'Decatur', state: 'AL', lat: 34.6059, lng: -86.9833 },
  { code: 'MSL', city: 'Florence', state: 'AL', lat: 34.7998, lng: -87.6773 },
  { code: 'FLG', city: 'Flagstaff', state: 'AZ', lat: 35.1983, lng: -111.6513 },
  { code: 'YUM', city: 'Yuma', state: 'AZ', lat: 32.6927, lng: -114.6277 },
  { code: 'JBR', city: 'Jonesboro', state: 'AR', lat: 35.8423, lng: -90.7043 },
  { code: 'FSM', city: 'Fort Smith', state: 'AR', lat: 35.3859, lng: -94.3985 },
  { code: 'BFL', city: 'Bakersfield', state: 'CA', lat: 35.3733, lng: -119.0187 },
  { code: 'MOD', city: 'Modesto', state: 'CA', lat: 37.6391, lng: -120.9969 },
  { code: 'STS', city: 'Santa Rosa', state: 'CA', lat: 38.4404, lng: -122.7141 },
  { code: 'PUB', city: 'Pueblo', state: 'CO', lat: 38.2544, lng: -104.6091 },
  { code: 'FNL', city: 'Fort Collins', state: 'CO', lat: 40.5853, lng: -105.0844 },
  { code: 'PNS', city: 'Pensacola', state: 'FL', lat: 30.4213, lng: -87.2169 },
  { code: 'GNV', city: 'Gainesville', state: 'FL', lat: 29.6516, lng: -82.3248 },
  { code: 'APF', city: 'Naples', state: 'FL', lat: 26.142, lng: -81.7948 },
  { code: 'OCF', city: 'Ocala', state: 'FL', lat: 29.1872, lng: -82.1401 },
  { code: 'MCN', city: 'Macon', state: 'GA', lat: 32.8407, lng: -83.6324 },
  { code: 'AHN', city: 'Athens', state: 'GA', lat: 33.9519, lng: -83.3576 },
  { code: 'ABY', city: 'Albany', state: 'GA', lat: 31.5785, lng: -84.1557 },
  { code: 'PIH', city: 'Pocatello', state: 'ID', lat: 42.8713, lng: -112.4455 },
  { code: 'COE', city: 'Coeur d\'Alene', state: 'ID', lat: 47.6777, lng: -116.7805 },
  { code: 'IOW', city: 'Iowa City', state: 'IA', lat: 41.6611, lng: -91.5302 },
  { code: 'ALO', city: 'Waterloo', state: 'IA', lat: 42.4928, lng: -92.3426 },
  { code: 'SLN', city: 'Salina', state: 'KS', lat: 38.8403, lng: -97.6114 },
  { code: 'LWC', city: 'Lawrence', state: 'KS', lat: 38.9717, lng: -95.2353 },
  { code: 'BWG', city: 'Bowling Green', state: 'KY', lat: 36.9685, lng: -86.4808 },
  { code: 'OWB', city: 'Owensboro', state: 'KY', lat: 37.7719, lng: -87.1112 },
  { code: 'AEX', city: 'Alexandria', state: 'LA', lat: 31.3113, lng: -92.4451 },
  { code: 'LCH', city: 'Lake Charles', state: 'LA', lat: 30.2266, lng: -93.2174 },
  { code: 'MLU', city: 'Monroe', state: 'LA', lat: 32.5093, lng: -92.1193 },
  { code: 'AUG', city: 'Augusta', state: 'ME', lat: 44.3106, lng: -69.7795 },
  { code: 'HGR', city: 'Hagerstown', state: 'MD', lat: 39.6418, lng: -77.72 },
  { code: 'ARB', city: 'Ann Arbor', state: 'MI', lat: 42.2808, lng: -83.743 },
  { code: 'TVC', city: 'Traverse City', state: 'MI', lat: 44.7631, lng: -85.6206 },
  { code: 'STC', city: 'St. Cloud', state: 'MN', lat: 45.5579, lng: -94.1632 },
  { code: 'HBG', city: 'Hattiesburg', state: 'MS', lat: 31.3271, lng: -89.2903 },
  { code: 'TUP', city: 'Tupelo', state: 'MS', lat: 34.2576, lng: -88.7034 },
  { code: 'MEI', city: 'Meridian', state: 'MS', lat: 32.3643, lng: -88.7037 },
  { code: 'COU', city: 'Columbia', state: 'MO', lat: 38.9517, lng: -92.3341 },
  { code: 'JLN', city: 'Joplin', state: 'MO', lat: 37.0842, lng: -94.5133 },
  { code: 'BZN', city: 'Bozeman', state: 'MT', lat: 45.677, lng: -111.0429 },
  { code: 'GTF', city: 'Great Falls', state: 'MT', lat: 47.4942, lng: -111.2833 },
  { code: 'GRI', city: 'Grand Island', state: 'NE', lat: 40.925, lng: -98.342 },
  { code: 'CSN', city: 'Carson City', state: 'NV', lat: 39.1638, lng: -119.7674 },
  { code: 'CON', city: 'Concord', state: 'NH', lat: 43.2081, lng: -71.5376 },
  { code: 'LRU', city: 'Las Cruces', state: 'NM', lat: 32.3199, lng: -106.7637 },
  { code: 'FMN', city: 'Farmington', state: 'NM', lat: 36.7281, lng: -108.2187 },
  { code: 'UCA', city: 'Utica', state: 'NY', lat: 43.1009, lng: -75.2327 },
  { code: 'BGM', city: 'Binghamton', state: 'NY', lat: 42.0987, lng: -75.918 },
  { code: 'FAY', city: 'Fayetteville', state: 'NC', lat: 35.0527, lng: -78.8784 },
  { code: 'PGV', city: 'Greenville', state: 'NC', lat: 35.6127, lng: -77.3664 },
  { code: 'GFK', city: 'Grand Forks', state: 'ND', lat: 47.9253, lng: -97.0329 },
  { code: 'CAK', city: 'Akron', state: 'OH', lat: 41.0814, lng: -81.519 },
  { code: 'YNG', city: 'Youngstown', state: 'OH', lat: 41.0998, lng: -80.6495 },
  { code: 'OUN', city: 'Norman', state: 'OK', lat: 35.2226, lng: -97.4395 },
  { code: 'LAW', city: 'Lawton', state: 'OK', lat: 34.6036, lng: -98.3959 },
  { code: 'SLE', city: 'Salem', state: 'OR', lat: 44.9429, lng: -123.0351 },
  { code: 'BDN', city: 'Bend', state: 'OR', lat: 44.0582, lng: -121.3153 },
  { code: 'ERI', city: 'Erie', state: 'PA', lat: 42.1292, lng: -80.0851 },
  { code: 'AVP', city: 'Scranton', state: 'PA', lat: 41.4089, lng: -75.6624 },
  { code: 'SPA', city: 'Spartanburg', state: 'SC', lat: 34.9496, lng: -81.932 },
  { code: 'MYR', city: 'Myrtle Beach', state: 'SC', lat: 33.6891, lng: -78.8867 },
  { code: 'ABR', city: 'Aberdeen', state: 'SD', lat: 45.4647, lng: -98.4865 },
  { code: 'MBT', city: 'Murfreesboro', state: 'TN', lat: 35.8456, lng: -86.3903 },
  { code: 'CKV', city: 'Clarksville', state: 'TN', lat: 36.5298, lng: -87.3595 },
  { code: 'MKL', city: 'Jackson', state: 'TN', lat: 35.6145, lng: -88.8139 },
  { code: 'TRI', city: 'Johnson City', state: 'TN', lat: 36.3134, lng: -82.3535 },
  { code: 'ACT', city: 'Waco', state: 'TX', lat: 31.5493, lng: -97.1467 },
  { code: 'TYR', city: 'Tyler', state: 'TX', lat: 32.3513, lng: -95.3011 },
  { code: 'ABI', city: 'Abilene', state: 'TX', lat: 32.4487, lng: -99.7331 },
  { code: 'CRP', city: 'Corpus Christi', state: 'TX', lat: 27.8006, lng: -97.3964 },
  { code: 'GRK', city: 'Killeen', state: 'TX', lat: 31.1171, lng: -97.7278 },
  { code: 'PVU', city: 'Provo', state: 'UT', lat: 40.2338, lng: -111.6585 },
  { code: 'OGD', city: 'Ogden', state: 'UT', lat: 41.223, lng: -111.9738 },
  { code: 'RUT', city: 'Rutland', state: 'VT', lat: 43.6106, lng: -72.9726 },
  { code: 'ROA', city: 'Roanoke', state: 'VA', lat: 37.271, lng: -79.9414 },
  { code: 'CHO', city: 'Charlottesville', state: 'VA', lat: 38.0293, lng: -78.4767 },
  { code: 'YKM', city: 'Yakima', state: 'WA', lat: 46.6021, lng: -120.5059 },
  { code: 'BLI', city: 'Bellingham', state: 'WA', lat: 48.7596, lng: -122.4882 },
  { code: 'MGW', city: 'Morgantown', state: 'WV', lat: 39.6295, lng: -79.9559 },
  { code: 'EAU', city: 'Eau Claire', state: 'WI', lat: 44.8113, lng: -91.4985 },
  { code: 'LSE', city: 'La Crosse', state: 'WI', lat: 43.8014, lng: -91.2396 },
];

export function findFacilityByLocation(location: string): Facility | null {
  const normalized = location.toUpperCase();
  // Prefer a city + state match (e.g. Portland ME vs Portland OR)
  const byState = FACILITIES.find(
    f => normalized.includes(f.city.toUpperCase()) && normalized.includes(f.state)
  );
  if (byState) return byState;
  return FACILITIES.find(f => normalized.includes(f.city.toUpperCase())) || null;
}

export function getFacilityByCode(code: string): Facility {
  return FACILITIES.find(f => f.code === code) || FACILITIES[0];
}

/** Facilities grouped by state, for grouped dropdowns. */
export function facilitiesByState(): Record<string, Facility[]> {
  const out: Record<string, Facility[]> = {};
  for (const f of FACILITIES) {
    (out[f.state] ||= []).push(f);
  }
  return out;
}

export function hashStringToCoords(seedStr: string): { lat: number; lng: number } {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  const lat = 30 + (seed % 150) / 10;
  const lng = -120 + ((seed >> 8) % 550) / 10;
  return { lat: Math.min(lat, 48), lng: Math.max(lng, -125) };
}
