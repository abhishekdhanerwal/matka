(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$ionicLoading', '$state' ,'principal' , 'logger' , '$localStorage', '$ionicHistory' , 'validationHelperFactory', 'USER_ROLE' , 'ionicDatePicker' ];
    /* @ngInject */
    function SignupController($ionicLoading, $state, principal, logger , $localStorage , $ionicHistory , validationHelperFactory , USER_ROLE , ionicDatePicker) {
        var vm = this;
        vm.user = {};
        vm.progress = false;

        activate();

        function activate() {
            vm.stateList = [
                    {
                        name: "Andaman and Nicobar Islands",
                        city: ["Port Blair*"]
                    },{

                        name: "Andhra Pradesh",
                        city : ["Adoni", "Amalapuram", "Anakapalle", "Anantapur", "Bapatla", "Bheemunipatnam", "Bhimavaram", "Bobbili", "Chilakaluripet", "Chirala", "Chittoor", "Dharmavaram", "Eluru", "Gooty", "Gudivada", "Gudur", "Guntakal", "Guntur", "Hindupur", "Jaggaiahpet", "Jammalamadugu", "Kadapa", "Kadiri", "Kakinada", "Kandukur", "Kavali", "Kovvur", "Kurnool", "Macherla", "Machilipatnam", "Madanapalle", "Mandapeta", "Markapur", "Nagari", "Naidupet", "Nandyal", "Narasapuram", "Narasaraopet", "Narsipatnam", "Nellore", "Nidadavole", "Nuzvid", "Ongole", "Palacole", "Palasa Kasibugga", "Parvathipuram", "Pedana", "Peddapuram", "Pithapuram", "Ponnur", "Proddatur", "Punganur", "Puttur", "Rajahmundry", "Rajam", "Rajampet", "Ramachandrapuram", "Rayachoti", "Rayadurg", "Renigunta", "Repalle", "Salur", "Samalkot", "Sattenapalle", "Srikakulam", "Srikalahasti", "Srisailam Project (Right Flank Colony) Township", "Sullurpeta", "Tadepalligudem", "Tadpatri", "Tanuku", "Tenali", "Tirupati", "Tiruvuru", "Tuni", "Uravakonda", "Venkatagiri", "Vijayawada", "Vinukonda", "Visakhapatnam", "Vizianagaram", "Yemmiganur", "Yerraguntla"],
                    },{

                        name: "Arunachal Pradesh",
                        city : ["Naharlagun", "Pasighat"],
                    },{
                    name: "Assam",
                    city:["Barpeta", "Bongaigaon City", "Dhubri", "Dibrugarh", "Diphu", "Goalpara", "Guwahati", "Jorhat", "Karimganj", "Lanka", "Lumding", "Mangaldoi", "Mankachar", "Margherita", "Mariani", "Marigaon", "Nagaon", "Nalbari", "North Lakhimpur", "Rangia", "Sibsagar", "Silapathar", "Silchar", "Tezpur", "Tinsukia"],

                },{
                    name: "Bihar",
                    city:["Araria", "Arrah", "Arwal", "Asarganj", "Aurangabad", "Bagaha", "Barh", "Begusarai", "Bettiah", "Bhabua", "Bhagalpur", "Buxar", "Chhapra", "Darbhanga", "Dehri-on-Sone", "Dumraon", "Forbesganj", "Gaya", "Gopalganj", "Hajipur", "Jamalpur", "Jamui", "Jehanabad", "Katihar", "Kishanganj", "Lakhisarai", "Lalganj", "Madhepura", "Madhubani", "Maharajganj", "Mahnar Bazar", "Makhdumpur", "Maner", "Manihari", "Marhaura", "Masaurhi", "Mirganj", "Mokameh", "Motihari", "Motipur", "Munger", "Murliganj", "Muzaffarpur", "Narkatiaganj", "Naugachhia", "Nawada", "Nokha", "Patna*", "Piro", "Purnia", "Rafiganj", "Rajgir", "Ramnagar", "Raxaul Bazar", "Revelganj", "Rosera", "Saharsa", "Samastipur", "Sasaram", "Sheikhpura", "Sheohar", "Sherghati", "Silao", "Sitamarhi", "Siwan", "Sonepur", "Sugauli", "Sultanganj", "Supaul", "Warisaliganj"],

                },{
                    name: "Chandigarh",
                    city:["Chandigarh*"],

                },{
                    name:"Chhattisgarh",
                    city:["Ambikapur", "Bhatapara", "Bhilai Nagar", "Bilaspur", "Chirmiri", "Dalli-Rajhara", "Dhamtari", "Durg", "Jagdalpur", "Korba", "Mahasamund", "Manendragarh", "Mungeli", "Naila Janjgir", "Raigarh", "Raipur*", "Rajnandgaon", "Sakti", "Tilda Newra"],

                },{
                    name:"Dadra and Nagar Haveli",
                    city:["Silvassa*"],

                },{
                    name:"Delhi",
                    city:["Delhi", "New Delhi*"],

                },{
                    name:"Goa",
                    city:["Mapusa", "Margao", "Marmagao", "Panaji*"],

                },{
                    name:"Gujarat",
                    city:["Adalaj", "Ahmedabad", "Amreli", "Anand", "Anjar", "Ankleshwar", "Bharuch", "Bhavnagar", "Bhuj", "Chhapra", "Deesa", "Dhoraji", "Godhra", "Jamnagar", "Kadi", "Kapadvanj", "Keshod", "Khambhat", "Lathi", "Limbdi", "Lunawada", "Mahesana", "Mahuva", "Manavadar", "Mandvi", "Mangrol", "Mansa", "Mahemdabad", "Modasa", "Morvi", "Nadiad", "Navsari", "Padra", "Palanpur", "Palitana", "Pardi", "Patan", "Petlad", "Porbandar", "Radhanpur", "Rajkot", "Rajpipla", "Rajula", "Ranavav", "Rapar", "Salaya", "Sanand", "Savarkundla", "Sidhpur", "Sihor", "Songadh", "Surat", "Talaja", "Thangadh", "Tharad", "Umbergaon", "Umreth", "Una", "Unjha", "Upleta", "Vadnagar", "Vadodara", "Valsad", "Vapi", "Vapi", "Veraval", "Vijapur", "Viramgam", "Visnagar", "Vyara", "Wadhwan", "Wankaner"],

                },{
                    name:"Haryana",
                    city:["Bahadurgarh", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gohana", "Gurgaon", "Hansi", "Hisar", "Jind", "Kaithal", "Karnal", "Ladwa", "Mahendragarh", "Mandi Dabwali", "Narnaul", "Narwana", "Palwal", "Panchkula", "Panipat", "Pehowa", "Pinjore", "Rania", "Ratia", "Rewari", "Rohtak", "Safidon", "Samalkha", "Sarsod", "Shahbad", "Sirsa", "Sohna", "Sonipat", "Taraori", "Thanesar", "Tohana", "Yamunanagar"],

                },{
                    name:"Himachal Pradesh",
                    city:["Mandi", "Nahan", "Palampur", "Shimla*", "Solan", "Sundarnagar"],

                },{
                    name: "Jammu and Kashmir",
                    city:["Anantnag", "Baramula", "Jammu", "Kathua", "Punch", "Rajauri", "Sopore", "Srinagar*", "Udhampur"],

                },{
                   name:"Jharkhand",
                    city:["Adityapur", "Bokaro Steel City", "Chaibasa", "Chatra", "Chirkunda", "Medininagar (Daltonganj)", "Deoghar", "Dhanbad", "Dumka", "Giridih", "Gumia", "Hazaribag", "Jamshedpur", "Jhumri Tilaiya", "Lohardaga", "Madhupur", "Mihijam", "Musabani", "Pakaur", "Patratu", "Phusro", "Ramgarh", "Ranchi*", "Sahibganj", "Saunda", "Simdega", "Tenu dam-cum-Kathhara"],

                },{
                    name:"Karnataka",
                    city:["Adyar", "Afzalpur", "Arsikere", "Athni", "Bengaluru", "Belagavi", "Ballari", "Chikkamagaluru", "Davanagere", "Gokak", "Hubli-Dharwad", "Karwar", "Kolar", "Lakshmeshwar", "Lingsugur", "Maddur", "Madhugiri", "Madikeri", "Magadi", "Mahalingapura", "Malavalli", "Malur", "Mandya", "Mangaluru", "Manvi", "Mudalagi", "Mudabidri", "Muddebihal", "Mudhol", "Mulbagal", "Mundargi", "Nanjangud", "Nargund", "Navalgund", "Nelamangala", "Pavagada", "Piriyapatna", "Puttur", "Rabkavi Banhatti", "Raayachuru", "Ranebennuru", "Ramanagaram", "Ramdurg", "Ranibennur", "Robertson Pet", "Ron", "Sadalagi", "Sagara", "Sakaleshapura", "Sindagi", "Sanduru", "Sankeshwara", "Saundatti-Yellamma", "Savanur", "Sedam", "Shahabad", "Shahpur", "Shiggaon", "Shikaripur", "Shivamogga", "Surapura", "Shrirangapattana", "Sidlaghatta", "Sindhagi", "Sindhnur", "Sira", "Sirsi", "Siruguppa", "Srinivaspur", "Tarikere", "Tekkalakote", "Terdal", "Talikota", "Tiptur", "Tumkur", "Udupi", "Vijayapura", "Wadi", "Yadgir"],

                },{
                    name:"Karnatka",
                    city:["Mysore"],

                },{
                    name:"Kerala",
                    city:["Adoor", "Alappuzha", "Attingal", "Chalakudy", "Changanassery", "Cherthala", "Chittur-Thathamangalam", "Guruvayoor", "Kanhangad", "Kannur", "Kasaragod", "Kayamkulam", "Kochi", "Kodungallur", "Kollam", "Kottayam", "Kozhikode", "Kunnamkulam", "Malappuram", "Mattannur", "Mavelikkara", "Mavoor", "Muvattupuzha", "Nedumangad", "Neyyattinkara", "Nilambur", "Ottappalam", "Palai", "Palakkad", "Panamattom", "Panniyannur", "Pappinisseri", "Paravoor", "Pathanamthitta", "Peringathur", "Perinthalmanna", "Perumbavoor", "Ponnani", "Punalur", "Puthuppally", "Koyilandy", "Shoranur", "Taliparamba", "Thiruvalla", "Thiruvananthapuram", "Thodupuzha", "Thrissur", "Tirur", "Vaikom", "Varkala", "Vatakara"],

                },{
                    name:"Madhya Pradesh",
                    city:["Alirajpur", "Ashok Nagar", "Balaghat", "Bhopal", "Ganjbasoda", "Gwalior", "Indore", "Itarsi", "Jabalpur", "Lahar", "Maharajpur", "Mahidpur", "Maihar", "Malaj Khand", "Manasa", "Manawar", "Mandideep", "Mandla", "Mandsaur", "Mauganj", "Mhow Cantonment", "Mhowgaon", "Morena", "Multai", "Mundi", "Murwara (Katni)", "Nagda", "Nainpur", "Narsinghgarh", "Narsinghgarh", "Neemuch", "Nepanagar", "Niwari", "Nowgong", "Nowrozabad (Khodargama)", "Pachore", "Pali", "Panagar", "Pandhurna", "Panna", "Pasan", "Pipariya", "Pithampur", "Porsa", "Prithvipur", "Raghogarh-Vijaypur", "Rahatgarh", "Raisen", "Rajgarh", "Ratlam", "Rau", "Rehli", "Rewa", "Sabalgarh", "Sagar", "Sanawad", "Sarangpur", "Sarni", "Satna", "Sausar", "Sehore", "Sendhwa", "Seoni", "Seoni-Malwa", "Shahdol", "Shajapur", "Shamgarh", "Sheopur", "Shivpuri", "Shujalpur", "Sidhi", "Sihora", "Singrauli", "Sironj", "Sohagpur", "Tarana", "Tikamgarh", "Ujjain", "Umaria", "Vidisha", "Vijaypur", "Wara Seoni"],

                },{
                    name: "Maharashtra",
                    city:["[[]]", "Ahmednagar", "Akola", "Akot", "Amalner", "Ambejogai", "Amravati", "Anjangaon", "Arvi", "Aurangabad", "Bhiwandi", "Dhule", "Kalyan-Dombivali", "Ichalkaranji", "Kalyan-Dombivali", "Karjat", "Latur", "Loha", "Lonar", "Lonavla", "Mahad", "Malegaon", "Malkapur", "Mangalvedhe", "Mangrulpir", "Manjlegaon", "Manmad", "Manwath", "Mehkar", "Mhaswad", "Mira-Bhayandar", "Morshi", "Mukhed", "Mul", "Greater Mumbai*", "Murtijapur", "Nagpur", "Nanded-Waghala", "Nandgaon", "Nandura", "Nandurbar", "Narkhed", "Nashik", "Navi Mumbai", "Nawapur", "Nilanga", "Osmanabad", "Ozar", "Pachora", "Paithan", "Palghar", "Pandharkaoda", "Pandharpur", "Panvel", "Parbhani", "Parli", "Partur", "Pathardi", "Pathri", "Patur", "Pauni", "Pen", "Phaltan", "Pulgaon", "Pune", "Purna", "Pusad", "Rahuri", "Rajura", "Ramtek", "Ratnagiri", "Raver", "Risod", "Sailu", "Sangamner", "Sangli", "Sangole", "Sasvad", "Satana", "Satara", "Savner", "Sawantwadi", "Shahade", "Shegaon", "Shendurjana", "Shirdi", "Shirpur-Warwade", "Shirur", "Shrigonda", "Shrirampur", "Sillod", "Sinnar", "Solapur", "Soyagaon", "Talegaon Dabhade", "Talode", "Tasgaon", "Thane", "Tirora", "Tuljapur", "Tumsar", "Uchgaon", "Udgir", "Umarga", "Umarkhed", "Umred", "Uran", "Uran Islampur", "Vadgaon Kasba", "Vaijapur", "Vasai-Virar", "Vita", "Wadgaon Road", "Wai", "Wani", "Wardha", "Warora", "Warud", "Washim", "Yavatmal", "Yawal", "Yevla"],

                },{
                    name:"Manipur",
                    city:["Imphal*", "Lilong", "Mayang Imphal", "Thoubal"],

                },{
                    name: "Meghalaya",
                    city:["Nongstoin", "Shillong*", "Tura"],

                },{
                    name:"Mizoram",
                    city:["Aizawl", "Lunglei", "Saiha"],

                },{
                    name:"Nagaland",
                    city:["Dimapur", "Kohima*", "Mokokchung", "Tuensang", "Wokha", "Zunheboto"],

                },{
                    name: "Odisha",
                    city:["Balangir", "Baleshwar Town", "Barbil", "Bargarh", "Baripada Town", "Bhadrak", "Bhawanipatna", "Bhubaneswar*", "Brahmapur", "Byasanagar", "Cuttack", "Dhenkanal", "Jatani", "Jharsuguda", "Kendrapara", "Kendujhar", "Malkangiri", "Nabarangapur", "Paradip", "Parlakhemundi", "Pattamundai", "Phulabani", "Puri", "Rairangpur", "Rajagangapur", "Raurkela", "Rayagada", "Sambalpur", "Soro", "Sunabeda", "Sundargarh", "Talcher", "Tarbha", "Titlagarh"],

                },{
                    name:"Puducherry" ,
                    city:["Karaikal", "Mahe", "Pondicherry*", "Yanam"],

                },{
                    name:"Punjab",
                    city:["Amritsar", "Barnala", "Batala", "Bathinda", "Dhuri", "Faridkot", "Fazilka", "Firozpur", "Firozpur Cantt.", "Gobindgarh", "Gurdaspur", "Hoshiarpur", "Jagraon", "Jalandhar Cantt.", "Jalandhar", "Kapurthala", "Khanna", "Kharar", "Kot Kapura", "Longowal", "Ludhiana", "Malerkotla", "Malout", "Mansa", "Moga", "Mohali", "Morinda, India", "Mukerian", "Muktsar", "Nabha", "Nakodar", "Nangal", "Nawanshahr", "Pathankot", "Patiala", "Pattran", "Patti", "Phagwara", "Phillaur", "Qadian", "Raikot", "Rajpura", "Rampura Phul", "Rupnagar", "Samana", "Sangrur", "Sirhind Fatehgarh Sahib", "Sujanpur", "Sunam", "Talwara", "Tarn Taran", "Urmar Tanda", "Zira", "Zirakpur"],

                },{
                    name:"Rajasthan",
                    city:["Ajmer", "Alwar", "Bikaner", "Bharatpur", "Bhilwara", "Jaipur*", "Jodhpur", "Lachhmangarh", "Ladnu", "Lakheri", "Lalsot", "Losal", "Makrana", "Malpura", "Mandalgarh", "Mandawa", "Mangrol", "Merta City", "Mount Abu", "Nadbai", "Nagar", "Nagaur", "Nasirabad", "Nathdwara", "Neem-Ka-Thana", "Nimbahera", "Nohar", "Nokha", "Pali", "Phalodi", "Phulera", "Pilani", "Pilibanga", "Pindwara", "Pipar City", "Prantij", "Pratapgarh", "Raisinghnagar", "Rajakhera", "Rajaldesar", "Rajgarh (Alwar)", "Rajgarh (Churu)", "Rajsamand", "Ramganj Mandi", "Ramngarh", "Ratangarh", "Rawatbhata", "Rawatsar", "Reengus", "Sadri", "Sadulshahar", "Sadulpur", "Sagwara", "Sambhar", "Sanchore", "Sangaria", "Sardarshahar", "Sawai Madhopur", "Shahpura", "Shahpura", "Sheoganj", "Sikar", "Sirohi", "Sojat", "Sri Madhopur", "Sujangarh", "Sumerpur", "Suratgarh", "Taranagar", "Todabhim", "Todaraisingh", "Tonk", "Udaipur", "Udaipurwati", "Vijainagar, Ajmer"],

                },{
                    name:"Tamil Nadu",
                    city:["Arakkonam", "Aruppukkottai", "Chennai*", "Coimbatore", "Erode", "Gobichettipalayam", "Kancheepuram", "Karur", "Lalgudi", "Madurai", "Manachanallur", "Nagapattinam", "Nagercoil", "Namagiripettai", "Namakkal", "Nandivaram-Guduvancheri", "Nanjikottai", "Natham", "Nellikuppam", "Neyveli (TS)", "O' Valley", "Oddanchatram", "P.N.Patti", "Pacode", "Padmanabhapuram", "Palani", "Palladam", "Pallapatti", "Pallikonda", "Panagudi", "Panruti", "Paramakudi", "Parangipettai", "Pattukkottai", "Perambalur", "Peravurani", "Periyakulam", "Periyasemur", "Pernampattu", "Pollachi", "Polur", "Ponneri", "Pudukkottai", "Pudupattinam", "Puliyankudi", "Punjaipugalur", "Ranipet", "Rajapalayam", "Ramanathapuram", "Rameshwaram", "Rasipuram", "Salem", "Sankarankoil", "Sankari", "Sathyamangalam", "Sattur", "Shenkottai", "Sholavandan", "Sholingur", "Sirkali", "Sivaganga", "Sivagiri", "Sivakasi", "Srivilliputhur", "Surandai", "Suriyampalayam", "Tenkasi", "Thammampatti", "Thanjavur", "Tharamangalam", "Tharangambadi", "Theni Allinagaram", "Thirumangalam", "Thirupuvanam", "Thiruthuraipoondi", "Thiruvallur", "Thiruvarur", "Thuraiyur", "Tindivanam", "Tiruchendur", "Tiruchengode", "Tiruchirappalli", "Tirukalukundram", "Tirukkoyilur", "Tirunelveli", "Tirupathur", "Tirupathur", "Tiruppur", "Tiruttani", "Tiruvannamalai", "Tiruvethipuram", "Tittakudi", "Udhagamandalam", "Udumalaipettai", "Unnamalaikadai", "Usilampatti", "Uthamapalayam", "Uthiramerur", "Vadakkuvalliyur", "Vadalur", "Vadipatti", "Valparai", "Vandavasi", "Vaniyambadi", "Vedaranyam", "Vellakoil", "Vellore", "Vikramasingapuram", "Viluppuram", "Virudhachalam", "Virudhunagar", "Viswanatham"],

                },{
                    name:"Telangana",
                    city:["Adilabad", "Bellampalle", "Bhadrachalam", "Bhainsa", "Bhongir", "Bodhan", "Farooqnagar", "Gadwal", "Hyderabad*", "Jagtial", "Jangaon", "Kagaznagar", "Kamareddy", "Karimnagar", "Khammam", "Koratla", "Kothagudem", "Kyathampalle", "Mahbubnagar", "Mancherial", "Mandamarri", "Manuguru", "Medak", "Miryalaguda", "Nagarkurnool", "Narayanpet", "Nirmal", "Nizamabad", "Palwancha", "Ramagundam", "Sadasivpet", "Sangareddy", "Siddipet", "Sircilla", "Suryapet", "Tandur", "Vikarabad", "Wanaparthy", "Warangal", "Yellandu"],

                },{
                    name:"Tripura",
                    city:["Agartala*", "Belonia", "Dharmanagar", "Kailasahar", "Khowai", "Pratapgarh", "Udaipur"],

                },{
                    name: "Uttar Pradesh",
                    city:["Achhnera", "Agra", "Aligarh", "Allahabad", "Amroha", "Azamgarh", "Bahraich", "Chandausi", "Etawah", "Firozabad", "Fatehpur Sikri", "Hapur", "Hardoi *", "Jhansi", "Kalpi", "Kanpur", "Khair", "Laharpur", "Lakhimpur", "Lal Gopalganj Nindaura", "Lalitpur", "Lalganj", "Lar", "Loni", "Lucknow*", "Mathura", "Meerut", "Modinagar", "Moradabad", "Nagina", "Najibabad", "Nakur", "Nanpara", "Naraura", "Naugawan Sadat", "Nautanwa", "Nawabganj", "Nehtaur", "Niwai", "Noida", "Noorpur", "Obra", "Orai", "Padrauna", "Palia Kalan", "Parasi", "Phulpur", "Pihani", "Pilibhit", "Pilkhuwa", "Powayan", "Pukhrayan", "Puranpur", "Purquazi", "Purwa", "Rae Bareli", "Rampur", "Rampur Maniharan", "Rampur Maniharan", "Rasra", "Rath", "Renukoot", "Reoti", "Robertsganj", "Rudauli", "Rudrapur", "Sadabad", "Safipur", "Saharanpur", "Sahaspur", "Sahaswan", "Sahawar", "Sahjanwa", "Saidpur", "Sambhal", "Samdhan", "Samthar", "Sandi", "Sandila", "Sardhana", "Seohara", "Shahabad, Hardoi", "Shahabad, Rampur", "Shahganj", "Shahjahanpur", "Shamli", "Shamsabad, Agra", "Shamsabad, Farrukhabad", "Sherkot", "Shikarpur, Bulandshahr", "Shikohabad", "Shishgarh", "Siana", "Sikanderpur", "Sikandra Rao", "Sikandrabad", "Sirsaganj", "Sirsi", "Sitapur", "Soron", "Suar", "Sultanpur", "Sumerpur", "Tanda", "Thakurdwara", "Thana Bhawan", "Tilhar", "Tirwaganj", "Tulsipur", "Tundla", "Ujhani", "Unnao", "Utraula", "Varanasi", "Vrindavan", "Warhapur", "Zaidpur", "Zamania"],

                },{
                    name:"Uttarakhand",
                    city:["Bageshwar", "Dehradun", "Haldwani-cum-Kathgodam", "Hardwar", "Kashipur", "Manglaur", "Mussoorie", "Nagla", "Nainital", "Pauri", "Pithoragarh", "Ramnagar", "Rishikesh", "Roorkee", "Rudrapur", "Sitarganj", "Srinagar", "Tehri"],

                },{
                    name:"West Bengal",
                    city:["Adra", "Alipurduar", "Arambagh", "Asansol", "Baharampur", "Balurghat", "Bankura", "Darjiling", "English Bazar", "Gangarampur", "Habra", "Hugli-Chinsurah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kharagpur", "Kolkata", "Mainaguri", "Malda", "Mathabhanga", "Medinipur", "Memari", "Monoharpur", "Murshidabad", "Nabadwip", "Naihati", "Panchla", "Pandua", "Paschim Punropara", "Purulia", "Raghunathpur", "Raghunathganj", "Raiganj", "Rampurhat", "Ranaghat", "Sainthia", "Santipur", "Siliguri", "Sonamukhi", "Srirampore", "Suri", "Taki", "Tamluk", "Tarakeswar"]

                }
                ]

        }

        vm.signup = function () {

            $ionicLoading.show({
                template: '<div class="spinner"><ion-spinner icon="lines" class="spinner-royal"></ion-spinner></div>'
            });
            console.log(vm.Form.$invalid)
            if (vm.Form.$invalid) {
                $ionicLoading.hide();
                validationHelperFactory.manageValidationFailed(vm.Form);
                return;
            }
            else {
                var dob = vm.dateOfBirth.split('-');
                vm.user.dateOfBirth = new Date(dob[2],dob[1]-1,dob[0]);
                var ageDifMs = Date.now() - vm.user.dateOfBirth.getTime();
                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                if(ageDate.getUTCFullYear() - 1970 < 18){
                    $ionicLoading.hide();
                    logger.error('You are not 18+');
                }
                else {
                    vm.newUser = angular.copy(vm.user);
                    // vm.newUser.password = 'secret';
                    vm.newUser.role = USER_ROLE.ROLE_CONSUMER;
                    vm.newUser.state = angular.copy(vm.user.state.name);
                    vm.newUser.password = vm.newPassword;
                    console.log(vm.user)
                    console.log(vm.newUser)
                    vm.progress = true;

                            principal.signup(vm.newUser).then(function (response) {
                                // vm.progress = false;
                                console.log(response)
                                $state.go('app.playboard');
                                logger.info('Profile created', 'default');

                            },
                                function (err) {
                                    $ionicLoading.hide();
                                    console.log(err)
                                });
                    vm.progress = false;
                }
            }
        };
        $ionicHistory.nextViewOptions({
            disableBack: true
        });

            var ipObj1 = {
                callback: function (val) {  //Mandatory
                    console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                    vm.dateOfBirth = new Date(val).getDate() +'-' + (new Date(val).getMonth()+1) + '-'+ new Date(val).getFullYear();
                },

                from: new Date(1950, 1, 1), //Optional
                to: new Date(), //Optional
                inputDate: new Date(),      //Optional
                mondayFirst: true,          //Optional
                // disableWeekdays: [0],       //Optional
                closeOnSelect: false,       //Optional
                templateType: 'popup'       //Optional
            };

            vm.openDatePicker = function(){
                ionicDatePicker.openDatePicker(ipObj1);
            };

    }
})();