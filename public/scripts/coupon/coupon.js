// console.log("hello")
var enterKeyCountEdit = 0;
var cities = [
    "Achalpur",
    "Achhnera",
    "Adalaj",
    "Adilabad",
    "Adityapur",
    "Adoni",
    "Adoor",
    "Adra",
    "Adyar",
    "Afzalpur",
    "Agartala",
    "Agra",
    "Ahmedabad",
    "Ahmednagar",
    "Aizawl",
    "Ajmer",
    "Akola",
    "Akot",
    "Alappuzha",
    "Aligarh",
    "AlipurdUrban Agglomerationr",
    "Alirajpur",
    "Allahabad",
    "Alwar",
    "Amalapuram",
    "Amalner",
    "Ambejogai",
    "Ambikapur",
    "Amravati",
    "Amreli",
    "Amritsar",
    "Amroha",
    "Anakapalle",
    "Anand",
    "Anantapur",
    "Anantnag",
    "Anjangaon",
    "Anjar",
    "Ankleshwar",
    "Arakkonam",
    "Arambagh",
    "Araria",
    "Arrah",
    "Arsikere",
    "Aruppukkottai",
    "Arvi",
    "Arwal",
    "Asansol",
    "Asarganj",
    "Ashok Nagar",
    "Athni",
    "Attingal",
    "Aurangabad",
    "Aurangabad",
    "Azamgarh",
    "Bagaha",
    "Bageshwar",
    "Bahadurgarh",
    "Baharampur",
    "Bahraich",
    "Balaghat",
    "Balangir",
    "Baleshwar Town",
    "Ballari",
    "Balurghat",
    "Bankura",
    "Bapatla",
    "Baramula",
    "Barbil",
    "Bargarh",
    "Barh",
    "Baripada Town",
    "Barmer",
    "Barnala",
    "Barpeta",
    "Batala",
    "Bathinda",
    "Begusarai",
    "Belagavi",
    "Bellampalle",
    "Belonia",
    "Bengaluru",
    "Bettiah",
    "BhabUrban Agglomeration",
    "Bhadrachalam",
    "Bhadrak",
    "Bhagalpur",
    "Bhainsa",
    "Bharatpur",
    "Bharuch",
    "Bhatapara",
    "Bhavnagar",
    "Bhawanipatna",
    "Bheemunipatnam",
    "Bhilai Nagar",
    "Bhilwara",
    "Bhimavaram",
    "Bhiwandi",
    "Bhiwani",
    "Bhongir",
    "Bhopal",
    "Bhubaneswar",
    "Bhuj",
    "Bikaner",
    "Bilaspur",
    "Bobbili",
    "Bodhan",
    "Bokaro Steel City",
    "Bongaigaon City",
    "Brahmapur",
    "Buxar",
    "Byasanagar",
    "Chaibasa",
    "Chalakudy",
    "Chandausi",
    "Chandigarh",
    "Changanassery",
    "Charkhi Dadri",
    "Chatra",
    "Chennai",
    "Cherthala",
    "Chhapra",
    "Chhapra",
    "Chikkamagaluru",
    "Chilakaluripet",
    "Chirala",
    "Chirkunda",
    "Chirmiri",
    "Chittoor",
    "Chittur-Thathamangalam",
    "Coimbatore",
    "Cuttack",
    "Dalli-Rajhara",
    "Darbhanga",
    "Darjiling",
    "Davanagere",
    "Deesa",
    "Dehradun",
    "Dehri-on-Sone",
    "Delhi",
    "Deoghar",
    "Dhamtari",
    "Dhanbad",
    "Dharmanagar",
    "Dharmavaram",
    "Dhenkanal",
    "Dhoraji",
    "Dhubri",
    "Dhule",
    "Dhuri",
    "Dibrugarh",
    "Dimapur",
    "Diphu",
    "Dumka",
    "Dumraon",
    "Durg",
    "Eluru",
    "English Bazar",
    "Erode",
    "Etawah",
    "Faridabad",
    "Faridkot",
    "Farooqnagar",
    "Fatehabad",
    "Fatehpur Sikri",
    "Fazilka",
    "Firozabad",
    "Firozpur Cantt.",
    "Firozpur",
    "Forbesganj",
    "Gadwal",
    "Gandhinagar",
    "Gangarampur",
    "Ganjbasoda",
    "Gaya",
    "Giridih",
    "Goalpara",
    "Gobichettipalayam",
    "Gobindgarh",
    "Godhra",
    "Gohana",
    "Gokak",
    "Gooty",
    "Gopalganj",
    "Gudivada",
    "Gudur",
    "Gumia",
    "Guntakal",
    "Guntur",
    "Gurdaspur",
    "Gurgaon",
    "Guruvayoor",
    "Guwahati",
    "Gwalior",
    "Habra",
    "Hajipur",
    "Haldwani-cum-Kathgodam",
    "Hansi",
    "Hapur",
    "Hardoi ",
    "Hardwar",
    "Hazaribag",
    "Hindupur",
    "Hisar",
    "Hoshiarpur",
    "Hubli-Dharwad",
    "Hugli-Chinsurah",
    "Hyderabad",
    "Ichalkaranji",
    "Imphal",
    "Indore",
    "Itarsi",
    "Jabalpur",
    "Jagdalpur",
    "Jaggaiahpet",
    "Jagraon",
    "Jagtial",
    "Jaipur",
    "Jalandhar Cantt.",
    "Jalandhar",
    "Jalpaiguri",
    "Jamalpur",
    "Jammalamadugu",
    "Jammu",
    "Jamnagar",
    "Jamshedpur",
    "Jamui",
    "Jangaon",
    "Jatani",
    "Jehanabad",
    "Jhansi",
    "Jhargram",
    "Jharsuguda",
    "Jhumri Tilaiya",
    "Jind",
    "Jodhpur",
    "Jorhat",
    "Kadapa",
    "Kadi",
    "Kadiri",
    "Kagaznagar",
    "Kailasahar",
    "Kaithal",
    "Kakinada",
    "Kalimpong",
    "Kalpi",
    "Kalyan-Dombivali",
    "Kamareddy",
    "Kancheepuram",
    "Kandukur",
    "Kanhangad",
    "Kannur",
    "Kanpur",
    "Kapadvanj",
    "Kapurthala",
    "Karaikal",
    "Karimganj",
    "Karimnagar",
    "Karjat",
    "Karnal",
    "Karur",
    "Karwar",
    "Kasaragod",
    "Kashipur",
    "KathUrban Agglomeration",
    "Katihar",
    "Kavali",
    "Kayamkulam",
    "Kendrapara",
    "Kendujhar",
    "Keshod",
    "Khair",
    "Khambhat",
    "Khammam",
    "Khanna",
    "Kharagpur",
    "Kharar",
    "Khowai",
    "Kishanganj",
    "Kochi",
    "Kodungallur",
    "Kohima",
    "Kolar",
    "Kolkata",
    "Kollam",
    "Koratla",
    "Korba",
    "Kot Kapura",
    "Kota",
    "Kothagudem",
    "Kottayam",
    "Kovvur",
    "Koyilandy",
    "Kozhikode",
    "Kunnamkulam",
    "Kurnool",
    "Kyathampalle",
    "Lachhmangarh",
    "Ladnu",
    "Ladwa",
    "Lahar",
    "Laharpur",
    "Lakheri",
    "Lakhimpur",
    "Lakhisarai",
    "Lakshmeshwar",
    "Lal Gopalganj Nindaura",
    "Lalganj",
    "Lalganj",
    "Lalgudi",
    "Lalitpur",
    "Lalsot",
    "Lanka",
    "Lar",
    "Lathi",
    "Latur",
    "Lilong",
    "Limbdi",
    "Lingsugur",
    "Loha",
    "Lohardaga",
    "Lonar",
    "Lonavla",
    "Longowal",
    "Loni",
    "Losal",
    "Lucknow",
    "Ludhiana",
    "Lumding",
    "Lunawada",
    "Lunglei",
    "Macherla",
    "Machilipatnam",
    "Madanapalle",
    "Maddur",
    "Madhepura",
    "Madhubani",
    "Madhugiri",
    "Madhupur",
    "Madikeri",
    "Madurai",
    "Magadi",
    "Mahad",
    "Mahalingapura",
    "Maharajganj",
    "Maharajpur",
    "Mahasamund",
    "Mahbubnagar",
    "Mahe",
    "Mahemdabad",
    "Mahendragarh",
    "Mahesana",
    "Mahidpur",
    "Mahnar Bazar",
    "Mahuva",
    "Maihar",
    "Mainaguri",
    "Makhdumpur",
    "Makrana",
    "Malaj Khand",
    "Malappuram",
    "Malavalli",
    "Malda",
    "Malegaon",
    "Malerkotla",
    "Malkangiri",
    "Malkapur",
    "Malout",
    "Malpura",
    "Malur",
    "Manachanallur",
    "Manasa",
    "Manavadar",
    "Manawar",
    "Mancherial",
    "Mandalgarh",
    "Mandamarri",
    "Mandapeta",
    "Mandawa",
    "Mandi Dabwali",
    "Mandi",
    "Mandideep",
    "Mandla",
    "Mandsaur",
    "Mandvi",
    "Mandya",
    "Manendragarh",
    "Maner",
    "Mangaldoi",
    "Mangaluru",
    "Mangalvedhe",
    "Manglaur",
    "Mangrol",
    "Mangrol",
    "Mangrulpir",
    "Manihari",
    "Manjlegaon",
    "Mankachar",
    "Manmad",
    "Mansa",
    "Mansa",
    "Manuguru",
    "Manvi",
    "Manwath",
    "Mapusa",
    "Margao",
    "Margherita",
    "Marhaura",
    "Mariani",
    "Marigaon",
    "Markapur",
    "Marmagao",
    "Masaurhi",
    "Mathabhanga",
    "Mathura",
    "Mattannur",
    "Mauganj",
    "Mavelikkara",
    "Mavoor",
    "Mayang Imphal",
    "Medak",
    "Medininagar (Daltonganj)",
    "Medinipur",
    "Meerut",
    "Mehkar",
    "Memari",
    "Merta City",
    "Mhaswad",
    "Mhow Cantonment",
    "Mhowgaon",
    "Mihijam",
    "Mira-Bhayandar",
    "Mirganj",
    "Miryalaguda",
    "Modasa",
    "Modinagar",
    "Moga",
    "Mohali",
    "Mokameh",
    "Mokokchung",
    "Monoharpur",
    "Moradabad",
    "Morena",
    "Morinda, India",
    "Morshi",
    "Morvi",
    "Motihari",
    "Motipur",
    "Mount Abu",
    "Mudabidri",
    "Mudalagi",
    "Muddebihal",
    "Mudhol",
    "Mukerian",
    "Mukhed",
    "Muktsar",
    "Mul",
    "Mulbagal",
    "Multai",
    "Mumbai",
    "Mundargi",
    "Mundi",
    "Mungeli",
    "Munger",
    "Murliganj",
    "Murshidabad",
    "Murtijapur",
    "Murwara (Katni)",
    "Musabani",
    "Mussoorie",
    "Muvattupuzha",
    "Muzaffarpur",
    "Mysore",
    "Nabadwip",
    "Nabarangapur",
    "Nabha",
    "Nadbai",
    "Nadiad",
    "Nagaon",
    "Nagapattinam",
    "Nagar",
    "Nagari",
    "Nagarkurnool",
    "Nagaur",
    "Nagda",
    "Nagercoil",
    "Nagina",
    "Nagla",
    "Nagpur",
    "Nahan",
    "Naharlagun",
    "Naidupet",
    "Naihati",
    "Naila Janjgir",
    "Nainital",
    "Nainpur",
    "Najibabad",
    "Nakodar",
    "Nakur",
    "Nalbari",
    "Namagiripettai",
    "Namakkal",
    "Nanded-Waghala",
    "Nandgaon",
    "Nandivaram-Guduvancheri",
    "Nandura",
    "Nandurbar",
    "Nandyal",
    "Nangal",
    "Nanjangud",
    "Nanjikottai",
    "Nanpara",
    "Narasapuram",
    "Narasaraopet",
    "Naraura",
    "Narayanpet",
    "Nargund",
    "Narkatiaganj",
    "Narkhed",
    "Narnaul",
    "Narsinghgarh",
    "Narsinghgarh",
    "Narsipatnam",
    "Narwana",
    "Nashik",
    "Nasirabad",
    "Natham",
    "Nathdwara",
    "Naugachhia",
    "Naugawan Sadat",
    "Nautanwa",
    "Navalgund",
    "Navsari",
    "Nawabganj",
    "Nawada",
    "Nawanshahr",
    "Nawapur",
    "Nedumangad",
    "Neem-Ka-Thana",
    "Neemuch",
    "Nehtaur",
    "Nelamangala",
    "Nellikuppam",
    "Nellore",
    "Nepanagar",
    "New Delhi",
    "Neyveli (TS)",
    "Neyyattinkara",
    "Nidadavole",
    "Nilambur",
    "Nilanga",
    "Nimbahera",
    "Nirmal",
    "Niwai",
    "Niwari",
    "Nizamabad",
    "Nohar",
    "Noida",
    "Nokha",
    "Nokha",
    "Nongstoin",
    "Noorpur",
    "North Lakhimpur",
    "Nowgong",
    "Nowrozabad (Khodargama)",
    "Nuzvid",
    "O' Valley",
    "Obra",
    "Oddanchatram",
    "Ongole",
    "Orai",
    "Osmanabad",
    "Ottappalam",
    "Ozar",
    "P.N.Patti",
    "Pachora",
    "Pachore",
    "Pacode",
    "Padmanabhapuram",
    "Padra",
    "Padrauna",
    "Paithan",
    "Pakaur",
    "Palacole",
    "Palai",
    "Palakkad",
    "Palampur",
    "Palani",
    "Palanpur",
    "Palasa Kasibugga",
    "Palghar",
    "Pali",
    "Pali",
    "Palia Kalan",
    "Palitana",
    "Palladam",
    "Pallapatti",
    "Pallikonda",
    "Palwal",
    "Palwancha",
    "Panagar",
    "Panagudi",
    "Panaji",
    "Panamattom",
    "Panchkula",
    "Panchla",
    "Pandharkaoda",
    "Pandharpur",
    "Pandhurna",
    "PandUrban Agglomeration",
    "Panipat",
    "Panna",
    "Panniyannur",
    "Panruti",
    "Panvel",
    "Pappinisseri",
    "Paradip",
    "Paramakudi",
    "Parangipettai",
    "Parasi",
    "Paravoor",
    "Parbhani",
    "Pardi",
    "Parlakhemundi",
    "Parli",
    "Partur",
    "Parvathipuram",
    "Pasan",
    "Paschim Punropara",
    "Pasighat",
    "Patan",
    "Pathanamthitta",
    "Pathankot",
    "Pathardi",
    "Pathri",
    "Patiala",
    "Patna",
    "Patratu",
    "Pattamundai",
    "Patti",
    "Pattran",
    "Pattukkottai",
    "Patur",
    "Pauni",
    "Pauri",
    "Pavagada",
    "Pedana",
    "Peddapuram",
    "Pehowa",
    "Pen",
    "Perambalur",
    "Peravurani",
    "Peringathur",
    "Perinthalmanna",
    "Periyakulam",
    "Periyasemur",
    "Pernampattu",
    "Perumbavoor",
    "Petlad",
    "Phagwara",
    "Phalodi",
    "Phaltan",
    "Phillaur",
    "Phulabani",
    "Phulera",
    "Phulpur",
    "Phusro",
    "Pihani",
    "Pilani",
    "Pilibanga",
    "Pilibhit",
    "Pilkhuwa",
    "Pindwara",
    "Pinjore",
    "Pipar City",
    "Pipariya",
    "Piriyapatna",
    "Piro",
    "Pithampur",
    "Pithapuram",
    "Pithoragarh",
    "Pollachi",
    "Polur",
    "Pondicherry",
    "Ponnani",
    "Ponneri",
    "Ponnur",
    "Porbandar",
    "Porsa",
    "Port Blair",
    "Powayan",
    "Prantij",
    "Pratapgarh",
    "Pratapgarh",
    "Prithvipur",
    "Proddatur",
    "Pudukkottai",
    "Pudupattinam",
    "Pukhrayan",
    "Pulgaon",
    "Puliyankudi",
    "Punalur",
    "Punch",
    "Pune",
    "Punganur",
    "Punjaipugalur",
    "Puranpur",
    "Puri",
    "Purna",
    "Purnia",
    "PurqUrban Agglomerationzi",
    "Purulia",
    "Purwa",
    "Pusad",
    "Puthuppally",
    "Puttur",
    "Puttur",
    "Qadian",
    "Raayachuru",
    "Rabkavi Banhatti",
    "Radhanpur",
    "Rae Bareli",
    "Rafiganj",
    "Raghogarh-Vijaypur",
    "Raghunathganj",
    "Raghunathpur",
    "Rahatgarh",
    "Rahuri",
    "Raiganj",
    "Raigarh",
    "Raikot",
    "Raipur",
    "Rairangpur",
    "Raisen",
    "Raisinghnagar",
    "Rajagangapur",
    "Rajahmundry",
    "Rajakhera",
    "Rajaldesar",
    "Rajam",
    "Rajampet",
    "Rajapalayam",
    "Rajauri",
    "Rajgarh (Alwar)",
    "Rajgarh (Churu)",
    "Rajgarh",
    "Rajgir",
    "Rajkot",
    "Rajnandgaon",
    "Rajpipla",
    "Rajpura",
    "Rajsamand",
    "Rajula",
    "Rajura",
    "Ramachandrapuram",
    "Ramagundam",
    "Ramanagaram",
    "Ramanathapuram",
    "Ramdurg",
    "Rameshwaram",
    "Ramganj Mandi",
    "Ramgarh",
    "Ramnagar",
    "Ramnagar",
    "Ramngarh",
    "Rampur Maniharan",
    "Rampur",
    "Rampura Phul",
    "Rampurhat",
    "Ramtek",
    "Ranaghat",
    "Ranavav",
    "Ranchi",
    "Ranebennuru",
    "Rangia",
    "Rania",
    "Ranibennur",
    "Ranipet",
    "Rapar",
    "Rasipuram",
    "Rasra",
    "Ratangarh",
    "Rath",
    "Ratia",
    "Ratlam",
    "Ratnagiri",
    "Rau",
    "Raurkela",
    "Raver",
    "Rawatbhata",
    "Rawatsar",
    "Raxaul Bazar",
    "Rayachoti",
    "Rayadurg",
    "Rayagada",
    "Reengus",
    "Rehli",
    "Renigunta",
    "Renukoot",
    "Reoti",
    "Repalle",
    "Revelganj",
    "Rewa",
    "Rewari",
    "Rishikesh",
    "Risod",
    "Robertsganj",
    "Robertson Pet",
    "Rohtak",
    "Ron",
    "Roorkee",
    "Rosera",
    "Rudauli",
    "Rudrapur",
    "Rudrapur",
    "Rupnagar",
    "Sabalgarh",
    "Sadabad",
    "Sadalagi",
    "Sadasivpet",
    "Sadri",
    "Sadulpur",
    "Sadulshahar",
    "Safidon",
    "Safipur",
    "Sagar",
    "Sagara",
    "Sagwara",
    "Saharanpur",
    "Saharsa",
    "Sahaspur",
    "Sahaswan",
    "Sahawar",
    "Sahibganj",
    "Sahjanwa",
    "Saidpur",
    "Saiha",
    "Sailu",
    "Sainthia",
    "Sakaleshapura",
    "Sakti",
    "Salaya",
    "Salem",
    "Salur",
    "Samalkha",
    "Samalkot",
    "Samana",
    "Samastipur",
    "Sambalpur",
    "Sambhal",
    "Sambhar",
    "Samdhan",
    "Samthar",
    "Sanand",
    "Sanawad",
    "Sanchore",
    "Sandi",
    "Sandila",
    "Sanduru",
    "Sangamner",
    "Sangareddy",
    "Sangaria",
    "Sangli",
    "Sangole",
    "Sangrur",
    "Sankarankovil",
    "Sankari",
    "Sankeshwara",
    "Santipur",
    "Sarangpur",
    "Sardarshahar",
    "Sardhana",
    "Sarni",
    "Sarsod",
    "Sasaram",
    "Sasvad",
    "Satana",
    "Satara",
    "Sathyamangalam",
    "Satna",
    "Sattenapalle",
    "Sattur",
    "Saunda",
    "Saundatti-Yellamma",
    "Sausar",
    "Savanur",
    "Savarkundla",
    "Savner",
    "Sawai Madhopur",
    "Sawantwadi",
    "Sedam",
    "Sehore",
    "Sendhwa",
    "Seohara",
    "Seoni",
    "Seoni-Malwa",
    "Shahabad",
    "Shahabad, Hardoi",
    "Shahabad, Rampur",
    "Shahade",
    "Shahbad",
    "Shahdol",
    "Shahganj",
    "Shahjahanpur",
    "Shahpur",
    "Shahpura",
    "Shahpura",
    "Shajapur",
    "Shamgarh",
    "Shamli",
    "Shamsabad, Agra",
    "Shamsabad, Farrukhabad",
    "Shegaon",
    "Sheikhpura",
    "Shendurjana",
    "Shenkottai",
    "Sheoganj",
    "Sheohar",
    "Sheopur",
    "Sherghati",
    "Sherkot",
    "Shiggaon",
    "Shikaripur",
    "Shikarpur, Bulandshahr",
    "Shikohabad",
    "Shillong",
    "Shimla",
    "Shirdi",
    "Shirpur-Warwade",
    "Shirur",
    "Shishgarh",
    "Shivamogga",
    "Shivpuri",
    "Sholavandan",
    "Sholingur",
    "Shoranur",
    "Shrigonda",
    "Shrirampur",
    "Shrirangapattana",
    "Shujalpur",
    "Siana",
    "Sibsagar",
    "Siddipet",
    "Sidhi",
    "Sidhpur",
    "Sidlaghatta",
    "Sihor",
    "Sihora",
    "Sikanderpur",
    "Sikandra Rao",
    "Sikandrabad",
    "Sikar",
    "Silao",
    "Silapathar",
    "Silchar",
    "Siliguri",
    "Sillod",
    "Silvassa",
    "Simdega",
    "Sindagi",
    "Sindhagi",
    "Sindhnur",
    "Singrauli",
    "Sinnar",
    "Sira",
    "Sircilla",
    "Sirhind Fatehgarh Sahib",
    "Sirkali",
    "Sirohi",
    "Sironj",
    "Sirsa",
    "Sirsaganj",
    "Sirsi",
    "Sirsi",
    "Siruguppa",
    "Sitamarhi",
    "Sitapur",
    "Sitarganj",
    "Sivaganga",
    "Sivagiri",
    "Sivakasi",
    "Siwan",
    "Sohagpur",
    "Sohna",
    "Sojat",
    "Solan",
    "Solapur",
    "Sonamukhi",
    "Sonepur",
    "Songadh",
    "Sonipat",
    "Sopore",
    "Soro",
    "Soron",
    "Soyagaon",
    "Sri Madhopur",
    "Srikakulam",
    "Srikalahasti",
    "Srinagar",
    "Srinagar",
    "Srinivaspur",
    "Srirampore",
    "Srisailam Project (Right Flank Colony) Township",
    "Srivilliputhur",
    "Sugauli",
    "Sujangarh",
    "Sujanpur",
    "Sullurpeta",
    "Sultanganj",
    "Sultanpur",
    "Sumerpur",
    "Sumerpur",
    "Sunabeda",
    "Sunam",
    "Sundargarh",
    "Sundarnagar",
    "Supaul",
    "Surandai",
    "Surapura",
    "Surat",
    "Suratgarh",
    "SUrban Agglomerationr",
    "Suri",
    "Suriyampalayam",
    "Suryapet",
    "Tadepalligudem",
    "Tadpatri",
    "Takhatgarh",
    "Taki",
    "Talaja",
    "Talcher",
    "Talegaon Dabhade",
    "Talikota",
    "Taliparamba",
    "Talode",
    "Talwara",
    "Tamluk",
    "Tanda",
    "Tandur",
    "Tanuku",
    "Tarakeswar",
    "Tarana",
    "Taranagar",
    "Taraori",
    "Tarbha",
    "Tarikere",
    "Tarn Taran",
    "Tasgaon",
    "Tehri",
    "Tekkalakote",
    "Tenali",
    "Tenkasi",
    "Tenu dam-cum-Kathhara",
    "Terdal",
    "Tezpur",
    "Thakurdwara",
    "Thammampatti",
    "Thana Bhawan",
    "Thane",
    "Thanesar",
    "Thangadh",
    "Thanjavur",
    "Tharad",
    "Tharamangalam",
    "Tharangambadi",
    "Theni Allinagaram",
    "Thirumangalam",
    "Thirupuvanam",
    "Thiruthuraipoondi",
    "Thiruvalla",
    "Thiruvallur",
    "Thiruvananthapuram",
    "Thiruvarur",
    "Thodupuzha",
    "Thoubal",
    "Thrissur",
    "Thuraiyur",
    "Tikamgarh",
    "Tilda Newra",
    "Tilhar",
    "Tindivanam",
    "Tinsukia",
    "Tiptur",
    "Tirora",
    "Tiruchendur",
    "Tiruchengode",
    "Tiruchirappalli",
    "Tirukalukundram",
    "Tirukkoyilur",
    "Tirunelveli",
    "Tirupathur",
    "Tirupathur",
    "Tirupati",
    "Tiruppur",
    "Tirur",
    "Tiruttani",
    "Tiruvannamalai",
    "Tiruvethipuram",
    "Tiruvuru",
    "Tirwaganj",
    "Titlagarh",
    "Tittakudi",
    "Todabhim",
    "Todaraisingh",
    "Tohana",
    "Tonk",
    "Tuensang",
    "Tuljapur",
    "Tulsipur",
    "Tumkur",
    "Tumsar",
    "Tundla",
    "Tuni",
    "Tura",
    "Uchgaon",
    "Udaipur",
    "Udaipur",
    "Udaipurwati",
    "Udgir",
    "Udhagamandalam",
    "Udhampur",
    "Udumalaipettai",
    "Udupi",
    "Ujhani",
    "Ujjain",
    "Umarga",
    "Umaria",
    "Umarkhed",
    "Umbergaon",
    "Umred",
    "Umreth",
    "Una",
    "Unjha",
    "Unnamalaikadai",
    "Unnao",
    "Upleta",
    "Uran Islampur",
    "Uran",
    "Uravakonda",
    "Urmar Tanda",
    "Usilampatti",
    "Uthamapalayam",
    "Uthiramerur",
    "Utraula",
    "Vadakkuvalliyur",
    "Vadalur",
    "Vadgaon Kasba",
    "Vadipatti",
    "Vadnagar",
    "Vadodara",
    "Vaijapur",
    "Vaikom",
    "Valparai",
    "Valsad",
    "Vandavasi",
    "Vaniyambadi",
    "Vapi",
    "Vapi",
    "Varanasi",
    "Varkala",
    "Vasai-Virar",
    "Vatakara",
    "Vedaranyam",
    "Vellakoil",
    "Vellore",
    "Venkatagiri",
    "Veraval",
    "Vidisha",
    "Vijainagar, Ajmer",
    "Vijapur",
    "Vijayapura",
    "Vijayawada",
    "Vijaypur",
    "Vikarabad",
    "Vikramasingapuram",
    "Viluppuram",
    "Vinukonda",
    "Viramgam",
    "Virudhachalam",
    "Virudhunagar",
    "Visakhapatnam",
    "Visnagar",
    "Viswanatham",
    "Vita",
    "Vizianagaram",
    "Vrindavan",
    "Vyara",
    "Wadgaon Road",
    "Wadhwan",
    "Wadi",
    "Wai",
    "Wanaparthy",
    "Wani",
    "Wankaner",
    "Wara Seoni",
    "Warangal",
    "Wardha",
    "Warhapur",
    "Warisaliganj",
    "Warora",
    "Warud",
    "Washim",
    "Wokha",
    "Yadgir",
    "Yamunanagar",
    "Yanam",
    "Yavatmal",
    "Yawal",
    "Yellandu",
    "Yemmiganur",
    "Yerraguntla",
    "Yevla",
    "Zaidpur",
    "Zamania",
    "Zira",
    "Zirakpur",
    "Zunheboto",
];

const reset_form = () => {
    $("#addCouponForm")[0].reset();
};
const loadFristItem_cat = () => {
    setTimeout(() => {
        let ele = document.getElementById("fristelement").click();
    }, 200);
};

const handleAddCouponSubmit = () => {
    event.preventDefault();
    var appl = $("#aplc_on").val();
   let Cuisines= $("#cuisine_ids").val();
    let cats=$("#cat_ids").val();
   let City= $("#cities").val();
    let chef= $("#chef_ids").val();
    let dishes= $("#dishes_ids").val();
    if(appl==2){
        if(City.length>0 || chef.length>0 ||Cuisines.length>0|| cats.length>0||dishes.length>0){

        }
        else{
            alertServiceFunction("Error", 'Please Enter any one of the below criteria.', "error");
            return
        }
    }
    let formData = new FormData(document.getElementById('addCouponForm'));
    $("#add_coupon_submit_div").html(
        `<img height="30" width="30"  src="images/spinner.gif" alt="">`
    );

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + "coupon/add",
        type: "POST",
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
            $("#add_category_submit_div").html(
                `<img height="50" width="50"  src="images/spinner.gif" alt="">`
            );
        },
        success: function (data) {
            // console.log(data)

            if (data.status == "success") {
                alertServiceFunction("Success", data.msg, "success");
                // resetForm()
                // CuisineclearFilters()
                // CatogeryclearFilters()
                clearFilters();
                $("#addCoupon_close_modal").click();
                $("#addCouponForm")[0].reset();
        $("#cuisine_ids").chosen("destroy");
        $("#cat_ids").chosen("destroy");
        $("#cities").chosen("destroy");
        $("#chef_ids").chosen("destroy");
        $("#dishes_ids").chosen("destroy");

        $("#cuisine_ids").chosen();
        $("#cat_ids").chosen();
        $("#cities").chosen();
        $("#chef_ids").chosen();
        $("#dishes_ids").chosen();
        $("#appl_div").css("display","none");
        $("#count").html('0');
                // resetForm()
            } else {
                alertServiceFunction("Error", data.msg, "error");
                $('#add_coupon_submit_div').html(`
                <button type="submit" class="btn btn-success flex-center btn-sm">Submit</button>
                <button type="button" class="btn btn-secondary flex-center btn-sm"
                    data-dismiss="modal">Close</button>
                `);
            }
                $('#add_coupon_submit_div').html(`
                <button type="submit" class="btn btn-success flex-center btn-sm">Submit</button>
                <button type="button" class="btn btn-secondary flex-center btn-sm"
                    data-dismiss="modal">Close</button>
                `); 
        },
        error: function (err) {
            alertServiceFunction("Error", "Failed to Add  Coupon.", "error");
            $('#add_coupon_submit_div').html(`
            <button type="submit" class="btn btn-success flex-center btn-sm">Submit</button>
            <button type="button" class="btn btn-secondary flex-center btn-sm"
                data-dismiss="modal">Close</button>`);
        },
    });
};

// console.log(cities)

function nospaces(t) {
    t.value = t.value.toUpperCase();
    if (t.value.match(/\s/g)) {
        t.value = t.value.replace(/\s/g, "");
    }
}

const handleLoadDetailsCoupon = (ele, id) => {
    // console.log(id)
    if (ele !== null) {
        let allcuisnes = document.getElementsByClassName("remve_Active_color");

        for (let index = 0; index < allcuisnes.length; index++) {
            const element = allcuisnes[index];
            element.style.backgroundImage = "none";
        }
        ele.style.backgroundImage =
            "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)";
    }

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        method: "post",
        url: API_URL + "coupon/single-data",

        dataType: "html",
        data: { id: id },
        beforeSend: function () {
            $("#coupon_detail_container")
                .empty()
                .html(
                    `<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"><br /><p>Please Wait Details...</p></div></div>`
                );
        },
        success: function (data) {
            // console.log(data)

            $("#coupon_detail_container").empty().html(data);
        },
    });
};

const HandleDiscountType = () => {
    let maximumDisc=document.getElementById("max_disc_val")
    var type = $("#disc_type").val();

    if(type == 1){
        $('#max_disc_val').val('');
    }
    // if(type == 2){
    //     document.getElementById('max_disc_val').required=true;
    //     document.getElementById('max_disc_val').readOnly = false; 
    // }


    if (type == 1) {
        $("#DicountValue").empty()
            .html(`       <label for="disc_val" class="col-form-label">Discount Value <span
        style="color:red;">*</span> </label>
<input name="disc_val" id="disc_val" placeholder="|" onInput="checkLength_dis_val();"
    maxlength="4" type="text" class="form-control newmeric myInput"
    required>`);
    maximumDisc.required=false;
    document.getElementById('max_disc_val').readOnly = true; 

    document.getElementById("max_lable").innerHTML=`Maximum Discount Value`
    }
    if (type == 2) {
        $("#DicountValue").empty().html(` 
        <label for="disc_per_val" class="col-form-label">Discount Percentage Value <span
            style="color:red;">*</span> </label>
    <input name="disc_per_val" id="disc_per_val" placeholder="|" max="100" min="1" maxlength="3"
        type="number" class="form-control dis-ty myInput" onKeyPress="return check(event,value)" onInput="checkLength()"
        required>`);
        maximumDisc.required=true;
        document.getElementById('max_disc_val').readOnly = false; 

        document.getElementById("max_lable").innerHTML=`Maximum Discount Value <span style="color:red;">*</span>`
    }
};

function check(e,value){
    //Check Charater
    var unicode=e.charCode? e.charCode : e.keyCode;
    if (value.indexOf(".") != -1)if( unicode == 46 )return false;
    if (unicode!=8)if((unicode<48||unicode>57)&&unicode!=46)return false;
  }
  function checkLength(){
    var fieldVal = document.getElementById('disc_per_val').value;
    //Suppose u want 3 number of character
    if(fieldVal <= 100 && fieldVal >=1){
      return true;
    }
    else
    {
      var str = document.getElementById('disc_per_val').value;
      str = str.substring(0, str.length - 1);
      document.getElementById('disc_per_val').value = str;
    }
  }

  /////////////////////////////////onInput="checkLength_max_dis_vl()
  function checkLength_max_dis_val(){
    var fieldVal = document.getElementById('max_disc_val').value;
    //Suppose u want 3 number of character
    if(fieldVal <= 9999 && fieldVal >=1){
      return true;
    }
    else
    {
      var str = document.getElementById('max_disc_val').value;
      str = str.substring(0, str.length - 1);
      document.getElementById('max_disc_val').value = str;
    }
  }

  function checkLength_min_ord_val(){
    var fieldVal = document.getElementById('min_ord_val').value;
    //Suppose u want 3 number of character
    if(fieldVal <= 9999 && fieldVal >=1){
      return true;
    }
    else
    {
      var str = document.getElementById('min_ord_val').value;
      str = str.substring(0, str.length - 1);
      document.getElementById('min_ord_val').value = str;
    }
  }

  function checkLength_dis_val(){
    var fieldVal = document.getElementById('disc_val').value;
    //Suppose u want 3 number of character
    if(fieldVal <= 9999 && fieldVal >=1){
      return true;
    }
    else
    {
      var str = document.getElementById('disc_val').value;
      str = str.substring(0, str.length - 1);
      document.getElementById('disc_val').value = str;
    }
  }

  //////////////////////////////////
// $(".discount_ty").numeric({
//     allowDecSep: false,  //
//     maxDigits: 3,
//     max:100,
//     min:1,
//     allowNumeric : true  // Allow digits 0-9
// });
const HandleUser = () => {
    let users = [];

    var user = $("#multi_user").val();
    if (user == 0) {
        $("#select_user_lable").html(`Select User
        <span    style="color:red;">*</span> `);
        document.getElementById("single_user").disabled = false;
        document.getElementById("single_user").required = true;
    }
    if (user == 1) {
        $("#select_user_lable").html(`Select User`);
        // $("#select_user_div").remove()
        document.getElementById("single_user").disabled = true;
        document.getElementById("single_user").required = false;
        $("#single_user").val("");
    }
};

const HandleApplicableOn = () => {
    var appl = $("#aplc_on").val();
    if (appl == 1) {
        document.getElementById("appl_div").style.display = "none";
        $("#cuisine_ids").val("");
        $("#cat_ids").val("");
        $("#cities").val("");
        $("#chef_ids").val("");
        $("#dishes_ids").val("");
        // $("#single_user").val("")
    }
    if (appl == 2) {
        document.getElementById("appl_div").style.display = "flex";
    }
};

// fristelement

loadFristItem_cat();

const HandleGenrateCode = (length) => {
    $("#coupon_code").val(
        Math.round(
            Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)
        )
            .toString(36)
            .slice(1)
            .toLocaleUpperCase()
    );
};

const clearFilters = () => {
    $(".dropdown-menu").removeClass("show");
    var coupon_code = $("#filter_coupon_code").val("");
    var coupon_title = $("#filter_title").val("");
    var aplc_on = $("#filter_aplc_on").val("");
    var is_active = $("#filter_is_active").val("");
    var exp_date = $("#filter_exp_date").val("");
    var start_date = $("#filter_start_date").val("");
    var disc_type = $("#filter_disc_type").val("");
    var show_user = $("#filter_show_user").val("");

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + "coupon/clear-filters",
        method: "post",
        dataType: "html",

        success: function (data) {
            // console.log(data)
            if (data !== null && data !== "") {
                document.getElementById("cat_list").innerHTML = data;
                loadFristItem_cat();
                page = 0;
                $("#list_end").html(
                    `<button type="button" onclick="load_more(${page})" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`
                );
            }
        },
        error: function (err) {
            alertServiceFunction("Error", "Failed to Clear  Filters.", "error");
        },
    });
};

let page = 0;
$("#overflow-container-Cuisine").scroll(function () {
    //detect page scroll
    var objDiv = document.getElementById("overflow-container-Cuisine");
    console.log(
        $(this).scrollTop() + $(this).innerHeight(),
        $(this)[0].scrollHeight
    );
    if (
        Math.ceil($(this).scrollTop() + $(this).innerHeight()) >=
        $(this)[0].scrollHeight
    ) {
        //if user scrolled from top to bottom of the page

        load_more(page); //load content
    }
});

function load_more(page1) {
    page = page1 + 1;

    var coupon_code = $("#filter_coupon_code").val();
    var coupon_title = $("#filter_title").val();
    var aplc_on = $("#filter_aplc_on").val();
    var is_active = $("#filter_is_active").val();
    var exp_date = $("#filter_exp_date").val();
    var start_date = $("#filter_start_date").val();
    var disc_type = $("#filter_disc_type").val();
    var show_user = $("#filter_show_user").val();

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + "coupon/search?page=" + page,
        method: "post",
        dataType: "html",
        data: {
            coupon_code,
            is_active,
            coupon_title,
            aplc_on,
            exp_date,
            start_date,
            disc_type,
            show_user,
        },
    })
        .done(function (data) {
            if (data.length == 0) {
                $("#list_end").empty().html("No more records!");
                return;
            }

            $("#cat_list").append(data); //append data into #results element
            // console.log('data.length');
            $("#list_end")
                .empty()
                .html(
                    `<button type="button" onclick="load_more(${
                        page1
                    })" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`
                );
        })
        .fail(function (jqXHR, ajaxOptions, thrownError) {
            alert("No response from server");
        });
}

const HandleSearch = () => {
    $(".dropdown-menu").removeClass("show");
    var coupon_code = $("#filter_coupon_code").val();
    var coupon_title = $("#filter_title").val();
    var aplc_on = $("#filter_aplc_on").val();
    var is_active = $("#filter_is_active").val();
    var exp_date = $("#filter_exp_date").val();
    var start_date = $("#filter_start_date").val();
    var disc_type = $("#filter_disc_type").val();
    var show_user = $("#filter_show_user").val();

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + "coupon/search",
        method: "post",
        dataType: "html",
        data: {
            coupon_code,
            is_active,
            coupon_title,
            aplc_on,
            exp_date,
            start_date,
            disc_type,
            show_user,
        },
        beforeSend: function () {
            $("#list_end").empty();
            document.getElementById(
                "cat_list"
            ).innerHTML = `<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"></div></div>`;
        },
        success: function (data) {
            // console.log(data)
            $("#overflow-container-Cuisine").animate(
                {
                    scrollTop: 0,
                },
                500
            );
            if (data.length == 0) {
                $("#list_end").empty().html(`
                    <div class="text-center" style="margin-top:100px;"><img style="width:200px; height:200px;" src="${API_URL}images/no_user.png">
                        <h6 style="color:#262728;"><b>There is no such Coupon!</b></h6>
                      </div>`);
                $("#coupon_detail_container").empty().html(`
                    <div class="text-center" style="margin-top:100px;">
                    <h4 style="color:#d92550; padding-top:130px;"><b>Coupon Details Not Found!</b></h4>                 
                       </div>`);
                $("#cat_list").empty();
                return;
            }
            loadFristItem_cat();
            $("#cat_list").html(data);
            page = 1;
            $("#list_end").html(
                `<button type="button" onclick="load_more(1)" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`
            );
        },
        error: function (err) {
            alertServiceFunction("Error", "Failed to Search Cuisine.", "error");
        },
    });
};

const handleDeleteDeish = (coupon_id, status) => {
    var action;
    if (status == "1") {
        action = "Active";
    } else if (status == "2") {
        action = "Pause";
    } else {
        action = "In-Active";
    }

    console.log(status, action);

    swal({
        title: "Are You Sure ?",
        text: "You Want to " + action + "  " + "This Coupon",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
    }).then(function (isConfirm) {
        if (isConfirm) {
            if (coupon_id) {
                $.ajax({
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                            "content"
                        ),
                    },
                    url: API_URL + "coupon/change-status",
                    method: "post",
                    dataType: "json",
                    data: { coupon_id, status },
                    method: "post",

                    success: function (data) {
                        // console.log(data)
                        if (data.status == "success") {
                            alertServiceFunction(
                                "Success",
                                data.msg,
                                "success"
                            );
                            // CatogeryclearFilters()
                            handleCatogeryList(coupon_id);
                            reset_form();
                            handleLoadDetailsCoupon(null, coupon_id);
                            // document.getElementById('cuisine_detail_container').innerHTML=`<h6 style="text-align: center;"> Please Select Category</h6>`
                        } else {
                            alertServiceFunction("Error", data.msg, "error");
                        }
                    },
                    error: function (err) {
                        alertServiceFunction(
                            "Error",
                            "Failed to Delete  Cuisine.",
                            "error"
                        );
                    },
                });
            }
        } else {
            alertServiceFunction(
                "Cancelled",
                "Category status preserved",
                "warning"
            );
        }
    });
};

const handleCatogeryList = (id) => {
    let singleList = document.getElementById(id);
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + "coupon/list",
        method: "post",
        dataType: "json",
        data: { id: id },
        success: function (data) {
            // console.log(data.data)
            if (data.data.is_active == 1) {
                singleList.innerHTML = `<span>
                <b>Coupon Code:</b>
                ${data.data.coupon_code} (${data.data.coupon_id})
           </span>
           <span>
                Status: Active   <span style="color:#25db25 ;"> <i class="fa fa-circle" aria-hidden="true" style="font-size:15px; color:#25db25"></i></span>
            </span>`;
            }
            if(data.data.is_active==0){
                singleList.innerHTML = `<span>
                <b>Coupon Code:</b>
                     ${data.data.coupon_code}  (${data.data.coupon_id})
                </span>
                <span>
                    Status: In-Active   <span style="color:red ;"> <i class="fa fa-circle" aria-hidden="true" style="font-size:15px; color:red"></i></span>
            </span>`;
            }
            if(data.data.is_active==2){
                singleList.innerHTML = `<span>
                <b>Coupon Coddfdfe:</b>
                ${data.data.coupon_code}  (${data.data.coupon_id})
           </span>
           <span>
                Status: Pause   <span style="color:yellow ;"> <i class="fa fa-circle" aria-hidden="true" style="font-size:15px; color:yellow"></i></span>
            </span>`;
            }
        },
    });
};

const get_edit_coupon = (coupon_id) => {
    console.log(coupon_id);
    let modal = document.getElementById("modal_body_category");
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + "coupon/edit",
        method: "post",
        dataType: "html",
        data: { id: coupon_id },
        success: function (data) {
            // console.log(data)
            modal.innerHTML = data;
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = "0" + dd;
            }

            if (mm < 10) {
                mm = "0" + mm;
            }

            today = yyyy + "-" + mm + "-" + dd;
            document.getElementById("start_date").setAttribute("min", today);
            document.getElementById("exp_date").setAttribute("min", today);
            // $("#cuisine_idEdit").chosen({no_results_text: "Oops, No Cuisine Found!"})
        },
    });
};

const handleEditCouponSubmit = (coupon_id) => {
    event.preventDefault();
    let formData=new FormData(document.getElementById('EditCouponForm'));
    formData.append('coupon_id',coupon_id)
    if(coupon_id){
        $("#edit_coupon_submit_div").html(
            `<img height="30" width="30"  src="images/spinner.gif" alt="">`
        );
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            url: API_URL + "coupon/submit",
            type: "POST",
            data: formData,
            dataType: "json",
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                // console.log(data)
                if (data.status == "success") {
                    alertServiceFunction("Success", data.msg, "success");

                    handleCatogeryList(coupon_id);

                    handleLoadDetailsCoupon(null, coupon_id);
                    $("#EditCouponModalCloseButton").click();
                } else {
                    alertServiceFunction("Error", data.msg, "error");
                    $('#edit_coupon_submit_div').html(`
                    <button type="submit" class="btn btn-success flex-center btn-sm">Submit</button>
                    <button type="button" class="btn btn-secondary flex-center btn-sm"
                        data-dismiss="modal">Close</button>
                    `)
                }             
            },
            error: function (err) {
                alertServiceFunction(
                    "Error","Failed to Edit Coupon.","error"
                );

                $('#edit_coupon_submit_div').html(`
                <button type="submit" class="btn btn-success flex-center btn-sm">Submit</button>
                <button type="button" class="btn btn-secondary flex-center btn-sm"
                    data-dismiss="modal">Close</button> `)
            },
        });
    }
};

function countDesc(e, _this) {
    // $('#count2').text(_this.value.length);
    if (e.keyCode == 8) enterKeyCountEdit = 0;
};
function blockEnter(e) {
    if (e.keyCode == 13) enterKeyCountEdit++;
    else enterKeyCountEdit = 0;
    if (enterKeyCountEdit == 2) {
        e.preventDefault();
        enterKeyCountEdit--;
    }
};